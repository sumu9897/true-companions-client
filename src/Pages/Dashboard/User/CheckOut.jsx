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
    const fetchClientSecret = async () => {
      try {
        const emailFromStorage = localStorage.getItem("user-email");
        if (emailFromStorage) {
          setUserEmail(emailFromStorage);
        }

        const { data } = await axiosSecure.post("/create-payment-intent", { price: 50 });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        toast.error("Failed to initialize payment. Please try again.");
      }
    };

    fetchClientSecret();
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment setup is incomplete. Please try again later.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details are missing. Please check and try again.");
      return;
    }

    setLoading(true);

    try {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: userEmail || "anonymous",
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          email: userEmail,
          transactionId: paymentIntent.id,
          biodataId,
          status: "paid",
        };

        await axiosSecure.post("/contactRequest", paymentData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        toast.success("Payment successful! Your request has been submitted.");
        navigate("/dashboard/mycontactrequests");
      } else {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error(error.message || "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Checkout - Request Contact Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="biodataId" value={biodataId} readOnly className="hidden" />

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
          disabled={loading || !stripe || !clientSecret}
        >
          {loading ? "Processing..." : "Submit Request"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
