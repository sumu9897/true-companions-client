import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { data } from "react-router-dom";


const CheckoutFrom = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const [transactionId, setTransactionId] = useState('');
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const totalPrice = 50;
    useEffect( ()=>{
        const res = axiosSecure.post('/create-payment-intent',{price: totalPrice})
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)

        if(card === null){
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('payment error', error);
            setError(error.message)
            
        }else{
            console.log('payment method', paymentMethod)
            setError('')
        }

        // confirm payment
         const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: card,
                billing_details:{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
         })

         if(confirmError){
            console.log('confirm error')
         }else{
            console.log('payment intent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                //now save the payment in the database
                const payment ={
                    email: user.email,
                    print: totalPrice,
                    transactionId: paymentIntent.id,
                    data: new Date(),
                    status: 'panding'
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log('payment save', res);
            }
         }
    }
  return (
    <form onSubmit={handleSubmit}>
        <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-md btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Payment
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-600">Your Transaction id: {transactionId}</p>
      }

    </form>
  )
}

export default CheckoutFrom