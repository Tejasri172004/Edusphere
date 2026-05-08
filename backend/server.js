const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/grades", require("./routes/gradeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));


app.use("/api/auth", require("./routes/authRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("✅ EduSphere Backend is Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});