const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

router.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;