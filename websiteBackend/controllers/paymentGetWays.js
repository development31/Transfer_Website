const booking = require('../models/BookingModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/OrderModal")
const Transaction = require('../models/TransactionModel');

const payment = async (req, res) => {
  const { amount, email, token } = req.body;
  if (!token || !email || !amount) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  try {
    const customer = await stripe.customers.create({ email: email });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(amount) * 100,
      currency: 'usd',
      customer: customer.id,
      payment_method_data: {
        type: 'card',
        card: { token: token.id },
      },
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      const book = await booking.findOne({ email });
      if (book) {
        book.paymentStatus = 'success';
        await book.save();
        // Create a new transaction record
        const newTransaction = new Transaction({
          userId: book._id,
          email: email,
          amount: amount,
          status: 'succeeded',
          transactionId: paymentIntent.id,
          paymentMethod: 'card',
        });

        await newTransaction.save();
      }
    }
    res.status(200).send(paymentIntent);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


//get all

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({}, 'email transactionId amount').populate('userId', 'name email');
    //console.log('Fetched Transactions:', transactions);
    return res.status(200).json({ message: 'All Transactions', transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};






module.exports = { payment, getAllTransactions } 