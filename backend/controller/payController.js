const mongoose = require("mongoose");
const Payment = require("../models/paymodle");
const User = mongoose.model("User");
const path = require("path");

// Create a new payment
const addPayment = async (req, res) => {
    try {
        const { userId, branch, amount, reason, status, description } = req.body;
        const slip = req.file ? `/slips/${req.file.filename}` : null;
        console.log(slip);

        // Check if userId exists in the database
        const userExists = await User.findOne({ userId: userId });

        if (!userExists) {
            return res.status(400).json({ message: "Invalid user ID. User not found." });
        }

        const newPayment = new Payment({
            userId,
            branch,
            amount,
            reason,
            status,
            description,
            slip,
        });

        await newPayment.save();
        res.status(201).json({ message: "Payment recorded successfully", payment: newPayment });
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
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment updated", payment: updatedPayment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPayment, getPayments, getPaymentById, updatePayment, deletePayment };