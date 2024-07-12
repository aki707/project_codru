const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const studentSchema = new mongoose.Schema({
  address: {
    type: String,
    default: "",
  },
  userphoto: {
    type: String,
    default: "",
  },
  usersign: {
    type: String,
    default: "",
  },
  userparentsign: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  altphone: {
    type: String,
    default: "",
  },
  adddeclaration: {
    type: Boolean,
    default: false,
  },
  classorsem: {
    type: String,
    default: "",
  },
  chosensubs: {
    type: [String],
    default: ["", "", "", "", "", ""],
  },
  schoolorcollege: {
    type: String,
    default: "",
  },
  semorclg: {
    type: String,
    default: "",
  },
  fatherName: {
    type: String,
    default: "",
  },
  fatherOcc: {
    type: String,
    default: "",
  },
  motherName: {
    type: String,
    default: "",
  },
  motherOcc: {
    type: String,
    default: "",
  },
  tasks: [
    {
      week: {
        type: Number,
      },
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
});

const Student = User.discriminator("Student", studentSchema);
module.exports = Student;
