import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { SiStripe } from "react-icons/si";

const PRICE_USD = 5;

const CheckoutForm = () => {
  const { biodataId: mongoId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [cardFocused, setCardFocused] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [cardReady, setCardReady] = useState(false);

  // Fetch biodata to display name + sequential biodataId (not MongoDB _id)
  const { data: biodata } = useQuery({
    queryKey: ["checkout-biodata", mongoId],
    enabled: !!mongoId,
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await axiosPublic.get(`/biodatas/${mongoId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    },
  });

  // Create Stripe PaymentIntent
  useEffect(() => {
    if (!mongoId) return;
    axiosSecure
      .post("/payment/create-intent")
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() =>
        setCardError("Failed to initialize payment. Please refresh and try again.")
      );
  }, [axiosSecure, mongoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret || processing || succeeded) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setCardError("");

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        await axiosSecure.post("/payments", {
          email: user.email,
          amount: PRICE_USD,
          transactionId: paymentIntent.id,
          biodataId: biodata?.biodataId || mongoId,
          date: new Date().toISOString(),
        });

        await axiosSecure.post("/contact-requests", {
          biodataId: biodata?.biodataId || mongoId,
          stripePaymentId: paymentIntent.id,
        });

        setSucceeded(true);
        Swal.fire({
          title: "Payment Successful!",
          html: `<p style="color:#6a5848;font-size:0.9rem">Your request is pending admin approval.<br><span style="color:#baa890;font-size:0.78rem">Transaction: ${paymentIntent.id.slice(0, 24)}…</span></p>`,
          icon: "success",
          background: "#fffcf6",
          color: "#18100a",
          iconColor: "#d4833a",
          confirmButtonColor: "#18100a",
          confirmButtonText: "View My Requests →",
        }).then(() => navigate("/dashboard/contact-request"));
      } catch {
        setCardError(
          "Payment received but failed to save. Please contact support with your transaction ID."
        );
      }
    }

    setProcessing(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .ck { font-family: 'DM Sans', sans-serif; }

        .ck-card {
          background: #fffcf6;
          border: 1px solid rgba(196,168,128,0.3);
          border-radius: 16px;
          box-shadow: 0 8px 48px rgba(180,140,80,0.1), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
          /* CRITICAL: Do NOT add overflow:hidden — it clips the Stripe iframe */
        }

        .ck-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #18100a 0%, #d4833a 50%, #18100a 100%);
          border-radius: 16px 16px 0 0;
          pointer-events: none;
        }

        .ck-top { padding: 2.2rem 2.2rem 0; }

        .ck-eyebrow {
          font-size: 0.65rem; font-weight: 500; letter-spacing: 0.18em;
          text-transform: uppercase; color: #c07030; margin-bottom: 0.8rem;
        }

        .ck-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: #18100a;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.3rem;
        }

        .ck-sub { font-size: 0.82rem; color: #9a8270; font-weight: 300; }

        .ck-profile {
          margin: 1.5rem 2.2rem 0; padding: 1rem 1.2rem;
          background: #f5ede0; border: 1px solid rgba(196,168,128,0.3);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }

        .ck-profile-left { display: flex; flex-direction: column; gap: 3px; }
        .ck-profile-lbl { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9a8270; }
        .ck-profile-name { font-size: 0.92rem; font-weight: 500; color: #18100a; }
        .ck-profile-id { font-size: 0.75rem; color: #c07030; font-weight: 500; }

        .ck-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: #18100a;
          line-height: 1; text-align: right; flex-shrink: 0;
        }

        .ck-price small {
          display: block; font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 400; color: #9a8270;
          letter-spacing: 0.06em; margin-top: 2px;
        }

        .ck-divider { height: 1px; background: rgba(196,168,128,0.2); margin: 1.5rem 2.2rem 0; }

        .ck-form { padding: 1.5rem 2.2rem 2.2rem; }

        .ck-lbl {
          display: block; font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #7a6248; margin-bottom: 0.6rem;
        }

        /*
         * THE FIX for non-interactive Stripe CardElement:
         *
         * Root cause: The previous version used onFocus/onBlur on the wrapper <div>.
         * iframe focus events do NOT bubble to parent DOM elements in browsers.
         * So the wrapper's onFocus/onBlur never fired, but more critically, adding
         * class-based styles via querySelector from those handlers caused React
         * to lose the element reference and sometimes prevented the iframe from
         * receiving pointer events correctly.
         *
         * Fix: Use ONLY Stripe's own onFocus/onBlur callbacks on <CardElement>.
         * These are reliable cross-browser events provided by the Stripe SDK.
         * Visual state is stored in React state and applied via inline styles —
         * no DOM manipulation, no class toggling, no ref needed.
         *
         * Also: the wrapper div must have no overflow property set at all
         * (default is 'visible') and no pointer-events override.
         */
        .ck-stripe-host {
          padding: 13px 16px;
          background: #ffffff;
          border-radius: 8px;
          transition: border 0.2s ease, box-shadow 0.2s ease;
          min-height: 48px;
          /* overflow: default (visible) — never set to hidden */
          /* pointer-events: default (auto) — never override */
          cursor: text;
        }

        .ck-error {
          margin-top: 0.9rem; padding: 10px 14px;
          background: #fff5f5; border: 1px solid rgba(192,57,43,0.2);
          border-radius: 8px; font-size: 0.82rem; color: #c0392b;
          display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;
        }

        .ck-submit {
          width: 100%; margin-top: 1.4rem; padding: 14px;
          background: #18100a; color: #fffcf6; border: none;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
        }

        .ck-submit:hover:not(:disabled) {
          background: #d4833a; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.3);
        }

        .ck-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
        .ck-submit.done { background: #2e6e30; }
        .ck-submit.done:hover:not(:disabled) { background: #2e6e30; transform: none; box-shadow: none; }

        .ck-spin {
          width: 15px; height: 15px; flex-shrink: 0;
          border: 2px solid rgba(255,252,246,0.25);
          border-top-color: #fffcf6; border-radius: 50%;
          animation: ckspin 0.7s linear infinite;
        }

        @keyframes ckspin { to { transform: rotate(360deg); } }

        .ck-trust {
          display: flex; align-items: center; justify-content: center;
          gap: 1.4rem; flex-wrap: wrap; margin-top: 1.1rem;
        }

        .ck-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.7rem; color: #baa890;
        }

        .ck-hint {
          margin-top: 1.2rem; padding: 10px 14px;
          background: rgba(0,0,0,0.02);
          border: 1px dashed rgba(196,168,128,0.35);
          border-radius: 8px; font-size: 0.75rem;
          color: #9a8270; line-height: 1.65;
        }

        .ck-hint strong { color: #3d2310; font-weight: 500; }
      `}</style>

      <form className="ck-card ck" onSubmit={handleSubmit}>

        <div className="ck-top">
          <p className="ck-eyebrow">Secure Payment</p>
          <h2 className="ck-title">Checkout</h2>
          <p className="ck-sub">One-time payment · No subscription</p>
        </div>

        <div className="ck-profile">
          <div className="ck-profile-left">
            <span className="ck-profile-lbl">Unlocking contact info for</span>
            <span className="ck-profile-name">{biodata?.name || "Loading…"}</span>
            {biodata?.biodataId && (
              <span className="ck-profile-id">Biodata #{biodata.biodataId}</span>
            )}
          </div>
          <div className="ck-price">
            $5<small>USD</small>
          </div>
        </div>

        <div className="ck-divider" />

        <div className="ck-form">
          <label className="ck-lbl">Card Details</label>

          {/* Wrapper: plain div, no overflow, no pointer-events, no onFocus/onBlur */}
          <div
            className="ck-stripe-host"
            style={{
              border: cardError
                ? "1.5px solid #c0392b"
                : cardFocused
                ? "1.5px solid #d4833a"
                : "1.5px solid rgba(196,168,128,0.4)",
              boxShadow: cardError
                ? "0 0 0 3px rgba(192,57,43,0.08)"
                : cardFocused
                ? "0 0 0 3px rgba(212,131,58,0.12)"
                : "none",
            }}
          >
            <CardElement
              onReady={() => setCardReady(true)}
              onFocus={() => setCardFocused(true)}   /* ✅ Stripe SDK event — reliable */
              onBlur={() => setCardFocused(false)}   /* ✅ Stripe SDK event — reliable */
              onChange={(e) => setCardError(e.error ? e.error.message : "")}
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "15px",
                    color: "#18100a",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "400",
                    letterSpacing: "0.02em",
                    "::placeholder": { color: "#c8b49a" },
                    iconColor: "#c07030",
                  },
                  invalid: { color: "#c0392b", iconColor: "#c0392b" },
                },
              }}
            />
          </div>

          {cardError && (
            <div className="ck-error">
              <span style={{ flexShrink: 0 }}>⚠</span>
              {cardError}
            </div>
          )}

          <button
            type="submit"
            className={`ck-submit${succeeded ? " done" : ""}`}
            disabled={!stripe || !clientSecret || processing || succeeded || !cardReady}
          >
            {succeeded ? (
              <><FaCheckCircle size={14} /> Payment Complete</>
            ) : processing ? (
              <><span className="ck-spin" /> Processing…</>
            ) : (
              <><FaLock size={12} /> Pay $5.00 Securely</>
            )}
          </button>

          <div className="ck-trust">
            <span className="ck-trust-item"><FaLock size={10} /> SSL Encrypted</span>
            <span className="ck-trust-item"><FaShieldAlt size={10} /> 3D Secure</span>
            <span className="ck-trust-item"><SiStripe size={12} /> Powered by Stripe</span>
          </div>

          <div className="ck-hint">
            <strong>Test mode</strong> — Use card <strong>4242 4242 4242 4242</strong>,
            any future expiry (e.g. 12/34), any 3-digit CVC.
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;