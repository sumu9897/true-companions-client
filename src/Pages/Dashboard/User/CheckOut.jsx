import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link, useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";




const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const elementsOptions = {

  fonts: [
    {
      cssSrc:
        "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400&display=swap",
    },
  ],
};

const CheckOut = () => {
  const { biodataId } = useParams();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .co-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f7f2ea;
          padding: 2rem 1.5rem 5rem;
        }

        .co-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #9a8270; text-decoration: none;
          padding: 7px 14px; border-radius: 6px;
          border: 1px solid rgba(196,168,128,0.28);
          background: #fffcf6; margin-bottom: 2rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .co-back:hover { border-color: #d4833a; color: #c07030; }

        .co-wrap { max-width: 520px; margin: 0 auto; }
      `}</style>

      <div className="co-root">
        <Link to={`/biodata/${biodataId}`} className="co-back">
          ← Back to Profile
        </Link>

        <div className="co-wrap">
          <Elements stripe={stripePromise} options={elementsOptions}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      

    </>
  );
};

export default CheckOut;