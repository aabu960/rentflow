import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ property, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card details not entered");

      // Create payment method
      const { paymentMethod, error: paymentError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          address: { line1: customerInfo.address },
        },
      });

      if (paymentError) throw new Error(paymentError.message);

      // Send payment request to the backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        amount: property.price * 100,
        propertyId: property._id,
        email: customerInfo.email,
        paymentMethodId: paymentMethod.id,
      });

      const { transactionId } = data;
      alert(`Payment Successful! Transaction ID: ${transactionId}`);
      onPaymentSuccess();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Billing Information</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={customerInfo.name}
        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={customerInfo.email}
        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Billing Address"
        value={customerInfo.address}
        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <CardElement className="p-4 border rounded" />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={processing}
        className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
      >
        {processing ? "Processing..." : `Pay $${property.price}`}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property for payment:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (!property) return <div className="text-center text-lg text-red-500">Property not found.</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Payment for {property.title}</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm property={property} onPaymentSuccess={() => navigate(-1)} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
