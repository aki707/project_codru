const bcrypt = require("bcrypt");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
const User = require("../models/userSchema");
const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");

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
    return res.status(422).json({ error: "Empty field(s)." });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(422).json({ error: "User already exists." });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords didn't match." });
    } else {
      let user;
      if (role === 'Student') {
        user = new Student({ photo, name, username, email, password, dob, phone, declaration, ...rest });
      } else if (role === 'Teacher') {
        user = new Teacher({ photo, name, username, email, password, dob, phone, declaration, ...rest });
      } else {
        return res.status(422).json({ error: "Invalid role." });
      }

      await user.save();
      const token = jwt.sign(
        { _id: user._id, username: user.username, role:user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
      );
      res.status(201).json({ message: "Registration successful",token });
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

    let user = await Student.findOne({ username: username });
    let role = "Student";

    if (!user) {
      user = await Teacher.findOne({ username: username });
      role = "Teacher";
    }

    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const token = jwt.sign(
        { _id: user._id, user: user.username, role: user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ message: "You are in", role, username: user.username, token });
      console.log(token);
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/course-register",async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
})

module.exports = router;
