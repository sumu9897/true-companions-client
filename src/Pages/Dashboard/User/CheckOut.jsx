import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckOut = () => {
  const { biodataId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("user-email");
    if (emailFromStorage) {
      setUserEmail(emailFromStorage); // Set the user's email from localStorage
    }

    // Request the client secret for the payment
    axiosSecure
      .post("/create-payment-intent", { price: 50 }) 
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log("Client Secret:", res.data.clientSecret); // Debugging log
      })
      .catch((err) => {
        console.error("Error fetching client secret:", err);
      });
  }, [axiosSecure]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Stripe initialized:", stripe);
    console.log("Elements initialized:", elements);
    console.log("Client Secret:", clientSecret);

    // Ensure Stripe and Elements are ready
    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe or Elements not initialized correctly.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      console.error("Card element is not available.");
      return; // Ensure the card element is properly loaded
    }

    setLoading(true);

    // Confirm the payment using the clientSecret
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: userEmail || "anonymous", // Ensure email is passed here
          },
        },
      }
    );

    if (confirmError) {
      console.error("Payment confirmation error:", confirmError);
      toast.error("Payment failed. Please try again.");
      setLoading(false); // Re-enable button if there is an error
    } else if (paymentIntent.status === "succeeded") {
      // Save the payment to the database
      const paymentData = {
        email: userEmail,
        transactionId: paymentIntent.id,
        biodataId, // This is the biodataId you're passing from the URL
        status: "paid", // Payment status
      };

      try {
        await axiosSecure.post(
          "/contactRequest",
          paymentData,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        toast.success("Payment successful! Your request has been submitted.");
        navigate("/dashboard/mycontactrequests");
      } catch (error) {
        console.error("Error saving payment:", error);
        toast.error("Payment save failed. Please try again.");
      }
    } else {
      toast.error("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Checkout - Request Contact Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="hidden"
          name="biodataId"
          value={biodataId}
          readOnly
          className="hidden"
        />
        <div>
          <label className="block text-lg font-medium text-gray-700">Your Email</label>
          <input
            type="email"
            name="selfEmail"
            value={userEmail}
            readOnly
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Card Details</label>
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
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          disabled={loading || !stripe || !clientSecret} // Disable button when loading or Stripe not initialized
        >
          {loading ? "Processing..." : "Submit Request"} {/* Change text based on loading */}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
