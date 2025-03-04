// src/routers/momoRoutes.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


router.post('/initiate-momo-payment', async (req, res) => {
  const { provider, amount, phoneNumber, callbackUrl } = req.body;

  try {
    let apiUrl, headers, payload;

    if (provider === 'MTN') {
      // Set up the API endpoint, headers, and payload for MTN Mobile Money
      apiUrl = process.env.MTN_API_URL; // e.g., "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay"
      headers = {
        "Authorization": `Bearer ${process.env.MTN_ACCESS_TOKEN}`, // You may need to generate this token
        "X-Target-Environment": process.env.MTN_TARGET_ENVIRONMENT || "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.MTN_SUBSCRIPTION_KEY
      };
      payload = {
        amount: amount.toString(), // as a string if required
        currency: "EUR", // or your local currency code
        externalId: "123456", // some unique id for your transaction
        payer: { partyIdType: "MSISDN", partyId: phoneNumber },
        payerMessage: "Payment for property booking",
        payeeNote: "Thank you for your payment"
      };
    } else if (provider === 'Vodacom' || provider === 'M-Pesa') {
      // Example for Vodacom/M-Pesa (this example uses Safaricom M-Pesa STK Push)
      apiUrl = process.env.MPESA_API_URL; // e.g., "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      headers = {
        "Authorization": `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      };
      payload = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: process.env.MPESA_PASSWORD, // Typically a base64 encoded string of ShortCode, Passkey, and Timestamp
        Timestamp: new Date().toISOString().replace(/[-:.TZ]/g, ""), // Format as required
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber, // The phone number making the payment
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl || process.env.MPESA_CALLBACK_URL,
        AccountReference: "PropertyBooking",
        TransactionDesc: "Payment for property booking"
      };
    } else {
      return res.status(400).json({ error: "Invalid payment provider" });
    }

    // Make the API request to the mobile money provider
    const response = await axios.post(apiUrl, payload, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error initiating MoMo payment:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
