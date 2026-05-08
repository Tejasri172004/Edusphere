const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentEmail: String,
  status: String,
  teacherEmail: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
