const mongoose = require("mongoose");

const MedicalSchema = new mongoose.Schema(
  {
    mediId: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    birthday: { type: String, required: true }, 
    nic: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    contactNo: { type: String, required: true },
    whatsappNo: { type: String, required: true },
    address: { type: String, required: true },
    vehiClass: { type: String, required: true },
    institute: { type: String, required: true },
    req_date: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    AppointmentDate: { type: String, default: null },
    AppointmentTime: { type: String, default: null },
  },
  { collection: "medical" }
);

// Custom ID generation
MedicalSchema.pre("save", function (next) {
  if (!this.mediId) {
    this.mediId = `MEDI-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});


MedicalSchema.virtual("formattedBirthday").get(function () {
  return this.birthday ? this.birthday.toISOString().split("T")[0] : null;
});


MedicalSchema.virtual("formattedAppointmentDate").get(function () {
  return this.AppointmentDate ? this.AppointmentDate.toISOString().split("T")[0] : null;
});


MedicalSchema.virtual("formattedAppointmentTime").get(function () {
  if (!this.AppointmentTime) return null;

  const [hour, minute] = this.AppointmentTime.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; 

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
});

module.exports = mongoose.model("Medical", MedicalSchema);
