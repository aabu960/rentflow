// In your backend (e.g., routes/paymentRoutes.js)
import express from 'express';
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51QwOMwJpW6OfCXQSs7Zty9nLHhMBFHrM3J1lQwZoDaPiJvunX1sMTIFnFyroLM692j6LlcMJSxolHuUVVRmZUfaf00ht78XSjU");
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, propertyId } = req.body;
    // Optionally: validate the propertyId, amount, and check user permissions.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents if using USD (adjust if using a different currency)
      currency: 'usd',
      metadata: { propertyId },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
