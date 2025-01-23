import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "../../../Components/CheckoutFrom";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)


const CheckOut = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutFrom></CheckoutFrom>
      </Elements>
      
    </div>
  )
}

export default CheckOut
