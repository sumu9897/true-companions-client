import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOut = () => {
  return (
    <>
      <Helmet>
        <title>Checkout — BandhanBD</title>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');

        .co-root {
          min-height: 100vh;
          background: #f7f2ea;
          display: flex; align-items: center; justify-content: center;
          padding: 5rem 1.5rem 3rem;
          position: relative; overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Subtle grid */
        .co-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(212,131,58,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,131,58,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* Radial centre glow */
        .co-root::after {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(255,252,246,0.7) 0%, transparent 65%);
          pointer-events: none;
        }

        .co-inner {
          width: 100%; max-width: 460px;
          position: relative; z-index: 1;
        }

        /* Back link */
        .co-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; color: #9a8270;
          text-decoration: none; margin-bottom: 1.5rem;
          transition: color 0.2s;
        }

        .co-back:hover { color: #c07030; }

        .co-back-arrow {
          width: 22px; height: 22px;
          border: 1px solid rgba(196,168,128,0.4);
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .co-back:hover .co-back-arrow {
          border-color: #c07030; background: rgba(212,131,58,0.06);
        }
      `}</style>

      <div className="co-root">
        <div className="co-inner">
          {/* Back link */}
          <Link to={-1} className="co-back">
            <span className="co-back-arrow">←</span>
            Back to Profile
          </Link>

          {/* The form — Elements wrapper must be the direct parent */}
          <Elements
            stripe={stripePromise}
            options={{
              // Stripe appearance customisation
              appearance: {
                theme: "flat",
                variables: {
                  colorPrimary: "#d4833a",
                  colorBackground: "#ffffff",
                  colorText: "#18100a",
                  colorDanger: "#c0392b",
                  fontFamily: "'DM Sans', sans-serif",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default CheckOut;