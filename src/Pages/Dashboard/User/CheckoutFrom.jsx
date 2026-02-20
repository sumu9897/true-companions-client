import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaLock, FaCreditCard } from "react-icons/fa";

const PRICE_USD = 5;

const CheckoutForm = () => {
  const { biodataId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Create payment intent on mount
  useEffect(() => {
    axiosSecure
      .post("/payment/create-intent")
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => setError("Failed to initialize payment. Please refresh and try again."));
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret || processing || succeeded) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");

    // Confirm payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        // 1. Save payment record
        await axiosSecure.post("/payments", {
          email: user.email,
          amount: PRICE_USD,
          transactionId: paymentIntent.id,
          biodataId,
          date: new Date().toISOString(),
        });

        // 2. Create contact request (pending admin approval)
        await axiosSecure.post("/contact-requests", {
          biodataId,
          stripePaymentId: paymentIntent.id,
        });

        setSucceeded(true);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          html: `
            <p class="text-gray-600">Your contact request has been submitted for admin approval.</p>
            <p class="text-sm text-gray-400 mt-2">Transaction ID: <code>${paymentIntent.id}</code></p>
          `,
          confirmButtonColor: "#4f46e5",
          confirmButtonText: "View My Requests",
        }).then(() => navigate("/dashboard/contact-request"));
      } catch {
        setError("Payment succeeded but failed to save. Contact support with your transaction ID.");
      }
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <FaCreditCard className="text-indigo-600" />
        </div>
        <div>
          <h2 className="font-bold text-gray-900">Secure Checkout</h2>
          <p className="text-sm text-gray-500">Contact information access — ${PRICE_USD}.00 USD</p>
        </div>
      </div>

      {/* What you get */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-indigo-800 font-medium">
          After payment and admin approval, the contact email and mobile number for Biodata #{biodataId} will be revealed.
        </p>
      </div>

      {/* Card Element */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Details</label>
        <div className="p-3.5 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-transparent">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  color: "#1f2937",
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": { color: "#9ca3af" },
                },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing || succeeded}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FaLock size={14} />
        {succeeded
          ? "Payment Complete"
          : processing
          ? "Processing…"
          : `Pay $${PRICE_USD}.00 Securely`}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
        <FaLock size={10} /> Secured by Stripe · Test card: 4242 4242 4242 4242
      </p>
    </form>
  );
};

export default CheckoutForm;