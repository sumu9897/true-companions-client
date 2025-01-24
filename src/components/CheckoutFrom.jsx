import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const totalPrice = 50; // Total payment amount

  // Fetch client secret when component mounts
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Error fetching client secret:", err);
        setError("Failed to initialize payment. Please try again.");
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isPaymentCompleted) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card details are missing. Please try again.");
      return;
    }

    try {
      setError("");
      // Create payment method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentError) {
        setError(paymentError.message);
        return;
      }

      // Confirm the payment
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
        setError(confirmError.message);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setIsPaymentCompleted(true);

        // Save payment to the database
        const paymentData = {
          email: user.email,
          amount: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
          status: "completed",
        };

        await axiosSecure.post("/payments", paymentData);

        // SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("An error occurred during payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        className="p-2 border rounded-md mb-4"
      />

      <button
        className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md ${
          isPaymentCompleted ? "bg-gray-400 cursor-not-allowed" : "hover:bg-indigo-700"
        }`}
        type="submit"
        disabled={!stripe || !clientSecret || isPaymentCompleted}
      >
        {isPaymentCompleted ? "Payment Completed" : "Pay Now"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {transactionId && (
        <p className="text-green-600 mt-2">
          Your Transaction ID: <strong>{transactionId}</strong>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
