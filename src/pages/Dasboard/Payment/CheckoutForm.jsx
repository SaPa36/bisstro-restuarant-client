import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";



const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    //const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [cardComplete, setCardComplete] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
                console.error('Error creating payment intent:', err);
            });
    }, [totalPrice, axiosSecure]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        //setProcessing(true);
        setError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
            //setProcessing(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Process the payment intent here
            setError('');
            //setProcessing(false);
        }
    };

    //add a new commit to test the commit functionality of git

    return (
        <div className="w-full max-w-md mt-25 mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        💳
                    </span>
                    Secure Payment
                </h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                        Card Details
                    </label>
                    <div className="p-4 border-2 border-gray-100 rounded-xl focus-within:border-indigo-500 transition-all bg-gray-50">
                        <CardElement
                            onChange={(event) => {
                                setCardComplete(event.complete);
                                if (event.error) {
                                    setError(event.error.message);
                                } else {
                                    setError('');
                                }
                            }}
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#1f2937',
                                        fontFamily: '"Inter", sans-serif',
                                        '::placeholder': { color: '#9ca3af' },
                                    },
                                    invalid: { color: '#ef4444' },
                                },
                            }}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-100 italic">{error}</p>}

                <button className="btn btn-sm btn-primary my-4 w-full p-2
                border-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white" type="submit" disabled={!stripe || !clientSecret || !cardComplete}>
                    Pay
                </button>


                <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                    🔒 SSL Encrypted & Secure Payments
                </p>
            </form>
        </div>
    );
};

export default CheckoutForm;