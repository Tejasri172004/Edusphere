const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  studentEmail: String,
  fileName: String,
  note: String,
  fileData: String,   
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assignment", AssignmentSchema);