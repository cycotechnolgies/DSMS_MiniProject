const mongoose = require("mongoose");
const Payment = require("../models/paymodle");
const User = mongoose.model("User");
const path = require("path");
const fs = require("fs");


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

//update payment
const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment updated", payment: updatedPayment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to delete slip file
const deleteSlipFile = (filePath) => {
    const fullPath = path.join(__dirname, "..", "public",filePath);
    console.log("Full path:", fullPath);
    if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("Slip file deleted:", filePath);
            }
        });
    }
};

//delete payment
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Remove the slip file if it exists
        if (payment.slip) {
            deleteSlipFile(payment.slip);
        }

        await Payment.findByIdAndDelete(id);
        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        console.error("Error deleting payment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getDailyPayments = async (req, res) => {
  try {
    const dailyPayments = await Payment.aggregate([
      {
        $set: { status: { $trim: { input: "$status" } } } // Trim spaces in "status"
      },
      {
        $match: { status: "Paid" } // Only include successful payments
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          totalAmount: { $sum: "$amount" } // Sum all paid amounts per day
        }
      },
      { $sort: { _id: 1 } } // Sort by date (ascending)
    ]);

    res.json(dailyPayments);
  } catch (error) {
    console.error("Error fetching daily payments:", error);
    res.status(500).json({ message: "Error fetching payment data", error: error.message });
  }
};


module.exports = { addPayment, getPayments, getPaymentById, updatePayment, deletePayment, getDailyPayments };