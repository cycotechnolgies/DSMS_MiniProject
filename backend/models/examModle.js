const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examId: { type: String, unique: true },
    examName: { type: String, required: true },
    branch: { type: String, required: true },
    vehiClass: { type: String, required: true },
    examDate: { type: String, required: true },
    examTime: { type: String, required: true },
    examType:{ type: String, require:true, enum: ["Written", "Trial"]},
    students: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        result: { type: String, default: 'N/A', enum: ["N/A", "Pass", "Fail", "Absent"] },
      },
    ],
  },
  { collection: 'exams' }
);

// Custom ID generation
examSchema.pre("save", function (next) {
  if (!this.examId) {
    this.examId = `EXM-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

examSchema.virtual("formattedexamDate").get(function () {
  return this.examDate ? this.examDate.toISOString().split("T")[0] : null;
});


examSchema.virtual("formattedAppointmentTime").get(function () {
  if (!this.examTime) return null;

  const [hour, minute] = this.examTime.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; 

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
});

module.exports = mongoose.model("exams", examSchema);