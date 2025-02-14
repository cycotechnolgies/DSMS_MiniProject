const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
      default: function () {
        return `USR-${Math.floor(1000 + Math.random() * 9000)}`;
      },
    },
    firstName: String,
    lastName: String,
    fullName: { type: String, default: null },
    birthday: String,
    nic: { type: String, unique: true },
    contactNo: String,
    whatsappNo: String,
    address: String,
    email: { type: String, unique: true },
    password: String,
    branch: String,
    course: { type: String, default: null },
    training: { type: String, default: null },
    profilePic: { type: String, default: null },
    userType: String,
  },
  { collection: "users" }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Virtual for formatted date
userSchema.virtual("formattedDob").get(function () {
  return this.birthday ? new Date(this.birthday).toISOString().split("T")[0] : null;
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
