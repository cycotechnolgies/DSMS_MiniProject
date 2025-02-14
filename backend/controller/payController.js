const Payment = require("../models/paymodle");
const path = require("path");

// Create a new payment
const addPayment = async (req, res) => {
    try {
    const { userId, branch, amount, reason, status, description } = req.body;
    const slip = req.file ? `/images/payments/${req.file.filename}` : null; // Save file path
    const newPayment = new Payment(
        {
            userId,
            branch,
            amount,
            reason,
            status,
            description,
            slip,
        }
    );
    await newPayment.save();
    res.status(201).json({ message: "Payment recorded successfully", Payment: newPayment });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};

// Get all payments
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single payment by payId
const getPaymentByPayId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ payId: req.params.payId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { addPayment, getPayments, getPaymentByPayId };