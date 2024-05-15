const bcrypt = require("bcrypt");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
const Student = require("../models/studentSchema");

router.post("/register", async (req, res) => {
  const { username, name, email, password, phone, dob, cpassword } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !cpassword ||
    !phone ||
    !username ||
    !dob
  ) {
    return res.status(422).json({ error: "Empty field(s)." });
  }

  try {
    const emailExist = await Student.findOne({ email: email });

    if (emailExist) {
      return res.status(422).json({ error: "User already exists." });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords didn't match." });
    } else {
      const student = new Student({});
      await student.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Empty field(s)" });
    }

    const studentLogin = await Student.findOne({ username: username });

    if (studentLogin) {
      const isMatched = await bcrypt.compare(password, studentLogin.password);
      const token = await studentLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      if (!isMatched) {
        res.status(400).json({ error: "Wrong Credentials" });
      } else {
        res.json({ message: "You are in", studentLogin });
      }
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
