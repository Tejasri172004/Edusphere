const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mailer");



let otpStore = {};


router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000 
  };

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    console.log("OTP:", otp); 

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Email failed" });
  }
});



router.post("/register", async (req, res) => {
  const { name, email, password, role, otp } = req.body;

  const stored = otpStore[email];

 
  console.log("Stored:", stored);
  console.log("Entered:", otp);

  if (!stored) {
    return res.status(400).json({ msg: "OTP not found. Please resend OTP." });
  }

  if (Date.now() > stored.expires) {
    delete otpStore[email];
    return res.status(400).json({ msg: "OTP expired. Try again." });
  }

  if (stored.otp !== Number(otp)) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    delete otpStore[email];

    res.json({ msg: "User registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      msg: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;