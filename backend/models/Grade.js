const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  studentEmail: String,
  grade: String,
  teacherEmail: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Grade", GradeSchema);