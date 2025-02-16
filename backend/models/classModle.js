const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    classId: { type: String, unique: true },
    className: { type: String, required: true },
    branch: { type: String, required: true },
    vehiClass: { type: String, required: true },
    classDate: { type: String, required: true },
    classTime: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    students: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: { type: Number, default: 0 },
      },
    ],
  },
  { collection: 'schedules' }
);

// Custom ID generation
scheduleSchema.pre("save", function (next) {
  if (!this.classId) {
    this.classId = `TCL-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

scheduleSchema.virtual("formattedclassDate").get(function () {
  return this.classDate ? this.classDate.toISOString().split("T")[0] : null;
});


scheduleSchema.virtual("formattedAppointmentTime").get(function () {
  if (!this.classTime) return null;

  const [hour, minute] = this.classTime.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; 

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
});

module.exports = mongoose.model("Schedule", scheduleSchema);