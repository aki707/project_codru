const bcrypt = require("bcrypt");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
const User = require("../models/userSchema");
const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");

const validateEmail = (email) => {
  const re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/register", async (req, res) => {
  const {
    photo,
    name,
    username,
    email,
    password,
    cpassword,
    dob,
    phone,
    declaration,
    role,
    ...rest
  } = req.body;
  console.log(role, "aa gya");
  if (
    !name ||
    !email ||
    !password ||
    !cpassword ||
    !phone ||
    !username ||
    !dob ||
    !role
  ) {
    return res.status(400).json({ error: "Empty field(s)." });
  }

  // if (!validateEmail(email)) {
  //   return res.status(422).json({ error: "Invalid email format." });
  // }

  // if (!validatePassword(password)) {
  //   return res.status(422).json({
  //     error:
  //       "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  //   });
  // }

  try {
    const emailExist = await User.findOne({ email: email });
    const usernameExist = await User.findOne({ username: username });

    if (emailExist || usernameExist) {
      return res.status(401).json({ error: "User already exists." });
    } else if (password != cpassword) {
      return res.status(402).json({ error: "Passwords didn't match." });
    } else {
      let user;
      if (role === "Student") {
        user = new Student({
          photo,
          name,
          username,
          email,
          password,
          dob,
          phone,
          declaration,
          ...rest,
        });
      } else if (role === "Teacher") {
        user = new Teacher({
          photo,
          name,
          username,
          email,
          password,
          dob,
          phone,
          declaration,
          ...rest,
        });
      } else {
        return res.status(403).json({ error: "Invalid role." });
      }

      await user.save();
      const token = jwt.sign(
        { _id: user._id, username: user.username, role: user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: "14d" }
      );
      res
        .status(201)
        .json({ message: "Registration successful", token: token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Empty field(s)" });
    }

    console.log("Attempting to sign in user:", username);

    let user = await Student.findOne({ username: username });
    let role = "Student";

    if (!user) {
      console.log("User not found in Students, searching in Teachers...");
      user = await Teacher.findOne({ username: username });
      role = "Teacher";
    }

    if (user) {
      console.log("User found:", user.username, "Role:", role);
      const isMatched = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatched);

      if (!isMatched) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const token = jwt.sign(
        { _id: user._id, user: user.username, role: user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: "14d" }
      );

      res.json({
        message: "You are in",
        role: role,
        username: user.username,
        token: token,
        photo: user.photo,
        name: user.name,
      });
      console.log("Token generated:", token);
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    console.error("Sign In Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/admission", async (req, res) => {
  const {
    username,
    photo,
    sign,
    gender,
    parentsign,
    altphone,
    chosensubs,
    declaration,
    classorsem,
    schoolorcollege,
    fatherOcc,
    motherOcc,
    fatherName,
    motherName,
    courses,
  } = req.body;

  if (
    !username ||
    !photo ||
    !sign ||
    !parentsign ||
    !chosensubs ||
    !declaration ||
    !classorsem ||
    !schoolorcollege ||
    !fatherOcc ||
    !motherOcc ||
    !fatherName ||
    !motherName ||
    !courses ||
    !gender ||
    !altphone
  ) {
    return res.status(400).json({ error: "Empty field(s)." });
  }

  try {
    const existingUser = await Student.findOne({ username: username });

    if (existingUser) {
      existingUser.photo = photo;
      existingUser.sign = sign;
      existingUser.gender = gender;
      existingUser.parentsign = parentsign;
      existingUser.altphone = altphone;
      existingUser.chosensubs = chosensubs;
      existingUser.declaration = declaration;
      existingUser.classorsem = classorsem;
      existingUser.schoolorcollege = schoolorcollege;
      existingUser.fatherOcc = fatherOcc;
      existingUser.motherOcc = motherOcc;
      existingUser.fatherName = fatherName;
      existingUser.motherName = motherName;
      existingUser.courses = courses;

      await existingUser.save();

      res.status(200).json({ message: "Admitted successfully" });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    if (!username || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "Empty field(s)" });
    }

    let user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
      return res.status(400).json({ error: "Wrong current password" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Empty field(s)" });
    }

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `You requested for password reset. Please use the following link to reset your password: http://localhost:5173/forgot-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    });
  } catch (error) {
    console.error("Server error during password reset request:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.userId;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    console.log("Password reset successful for user:", user.username);

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Server error during password reset:", error);
    res.status(500).json({ error: "Server error" });
  }
});

let otpCode;
let otpTimestamp;

router.post("/generate-otp", (req, res) => {
  const { email } = req.body;
  otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  otpTimestamp = Date.now();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Hi there! You have recently visited our website and entered your email. Your OTP code for email verification is ${otpCode}.`,
  };

  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send({ message: "Failed to send OTP" });
    } else {
      console.log("OTP sent:", otpCode);
      res.status(200).send({ message: "OTP sent successfully" });
    }
  });
});

router.post("/verify-email", async (req, res) => {
  const { otp } = req.body;
  const currentTime = Date.now();
  const timeDifference = currentTime - otpTimestamp;
  console.log(req.body);
  console.log(otpCode);

  const enteredOTP = parseInt(otp, 10);

  try {
    if (enteredOTP === parseInt(otpCode, 10) && timeDifference <= 60000) {
      console.log("Entered OTP:", otp);
      console.log("Generated OTP:", otpCode);

      res.status(200).send({ message: "Verification successful" });
    } else {
      res.status(401).send({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/profile", async (req, res) => {
  try {
  } catch (error) {}
});

router.post("/update-details", async (req, res) => {
  try {
  } catch (error) {}
});



module.exports = router;
