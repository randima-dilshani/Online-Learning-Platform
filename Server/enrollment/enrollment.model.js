const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student ID is required!"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required!"],
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Enroll", "UnEnroll"],
      default: "Enroll",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
