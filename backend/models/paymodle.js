const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
    {

    payId: { type: String, unique: true },
    userId: { type: String, required: true },
    branch: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Paid", "Pending", "Canceled"], default: "Pending" },
    description: { type: String, default: null },
    slip: { type: String, default: null }, 
    createdAt: { type: Date, default: Date.now },

    },
    { collection: "payment" }
);

// Custom ID generation
paymentSchema.pre('save', function (next) {
  if (!this.payId) {
    this.payId = `PAY-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;