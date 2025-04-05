"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _stripe = _interopRequireDefault(require("stripe"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const router = _express.default.Router();
const stripe = new _stripe.default(process.env.STRIPE_SECRET_KEY);

// Nodemailer transporter
const transporter = _nodemailer.default.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
router.post('/create-payment-intent', async (req, res) => {
  try {
    const {
      amount,
      propertyId,
      email,
      paymentMethodId
    } = req.body;
    if (!amount || !propertyId || !email || !paymentMethodId) {
      return res.status(400).json({
        error: 'Invalid request data'
      });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      receipt_email: email,
      return_url: `${process.env.CLIENT_URL}/payment-success`
    });
    if (paymentIntent.status === 'succeeded') {
      console.log('✅ Payment Successful:', paymentIntent);

      // Send email confirmation
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Payment Successful',
        text: `Dear Customer, your payment of $${amount / 100} was successful. Transaction ID: ${paymentIntent.id}. Thank you!`
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('❌ Email Error:', err);
        } else {
          console.log('📧 Email Sent:', info.response);
        }
      });
      return res.json({
        message: 'Payment successful',
        transactionId: paymentIntent.id
      });
    }
    res.status(400).json({
      error: 'Payment not successful'
    });
  } catch (error) {
    console.error('❌ Stripe error:', error);
    res.status(500).json({
      error: 'Payment processing failed'
    });
  }
});
var _default = exports.default = router;