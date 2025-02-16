const mongoose = require("mongoose");

const RenewalSchema = new mongoose.Schema({
  RenewId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  whatsappNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: ["Colombo", "Gampaha", "Galle"],
  },
  LicenceType: {
    type: String,
    required: true,
    enum: ["L Permit", "Temporary"],
  },
  vehiClass: {
    type: String,
    required: true,
    enum: ["Light Vehicle", "Heavy Vehicle"],
  },
  bracode: {
    type: String,
    required: true,
  },
  expDate: {
    type: String,
    required: true,
  },
  renewState: {
    type: String,
    enum: [
      "Pending",
      "Document Collected",
      "Send To DMV",
      "Licence Renewed",
      "Delivered New Licence",
    ],
    default: "Pending",
  },
  collector: {
    type: String,
    required: false,
    default: null,
  },
},{ collection: "renewal" }
);

// Custom ID generation
RenewalSchema.pre("save", function (next) {
  if (!this.RenewId) {
    this.RenewId = `LR-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

RenewalSchema.virtual("formattedExp").get(function () {
  return this.expDate ? this.expDate.toISOString().split("T")[0] : null;
});

const LicenceRenewal = mongoose.model("LicenceRenewal", RenewalSchema);

module.exports = LicenceRenewal;
