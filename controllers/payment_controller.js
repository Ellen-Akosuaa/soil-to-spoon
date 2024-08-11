import paystack from "../config/paystack.js";


// Initialize a payment
export const initializePayment = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const response = await paystack.transaction.initialize({
      amount: amount * 100, // Amount in GHS
      email,
      callback_url: 'http://localhost:7000/api/v1/payments/verify-payment',
    });

    res.json({ authorization_url: response.data.authorization_url });
  } catch (error) {
    console.error('Error initializing payment:', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
};

// Verify a payment
export const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await paystack.transaction.verify({ reference });

    if (response.data.status === 'success') {
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};
