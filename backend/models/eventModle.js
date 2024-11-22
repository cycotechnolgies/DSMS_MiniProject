const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false, default: "No Description" },
  start: { type: Date, required: true },
  end: { type: Date },
});

module.exports = mongoose.model("Event", eventSchema);
