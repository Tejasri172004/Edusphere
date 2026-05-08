const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");


router.post("/upload", async (req, res) => {
  const { studentEmail, fileName, note, fileData } = req.body;

  const newAssignment = new Assignment({
    studentEmail,
    fileName,
    note,
    fileData   
  });

  await newAssignment.save();

  res.json({ msg: "Assignment uploaded" });
});


router.get("/", async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

module.exports = router;