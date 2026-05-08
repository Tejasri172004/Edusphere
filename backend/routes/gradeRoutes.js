const express = require("express");
const router = express.Router();
const Grade = require("../models/Grade");


router.post("/add", async (req, res) => {
  const { studentEmail, grade, teacherEmail } = req.body;

  const newGrade = new Grade({ studentEmail, grade, teacherEmail });
  await newGrade.save();

  res.json({ msg: "Grade saved" });
});


router.get("/", async (req, res) => {
  const grades = await Grade.find();
  res.json(grades);
});


router.get("/:email", async (req, res) => {
  const grades = await Grade.find({ studentEmail: req.params.email });
  res.json(grades);
});

module.exports = router; 