const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    birthday: Date,
    nic: { type: String, unique: true },
    contactNo: String,
    whatsappNo: String,
    address: String,
    email: { type: String, unique: true },
    password: String,
    profilePic: {type: String, default: null},
    userType: String,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
