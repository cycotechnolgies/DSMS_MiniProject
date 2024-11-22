const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: Date,
  nic: { type: String, unique: true },
  contactNo: String,
  whatsappNo: String,
  address: String,
  email: { type: String, unique: true },
  password: String,
  userType: String,
});

module.exports = mongoose.model("Staff", staffSchema);
