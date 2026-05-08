const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.post("/add", async (req, res) => {
  const { studentEmail, status, teacherEmail } = req.body;

  const newAtt = new Attendance({ studentEmail, status, teacherEmail });
  await newAtt.save();

  res.json({ msg: "Attendance saved" });
});

router.get("/:email", async (req, res) => {
  const data = await Attendance.find({ studentEmail: req.params.email });
  res.json(data);
});

module.exports = router;