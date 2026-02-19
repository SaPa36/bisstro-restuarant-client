import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);
        setError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
            setProcessing(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Process the payment intent here
            setProcessing(false);
        }
    };

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

                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold uppercase tracking-widest transition-all transform active:scale-95 shadow-lg
                        ${processing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-200'
                        }`}
                >
                    {processing ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                        </span>
                    ) : (
                        "Pay Now"
                    )}
                </button>

                <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                    🔒 SSL Encrypted & Secure Payments
                </p>
            </form>
        </div>
    );
};

export default CheckoutForm;