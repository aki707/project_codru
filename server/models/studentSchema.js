const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const studentSchema = new mongoose.Schema({
  gender: {
    type: String,
    default: '',
  },
  fatherName: {
    type: String,
    default: '',
  },
  motherName: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  altphone: {
    type: String,
    default: '',
  },
  chosensubs: {
    type: String,
    default: '',
  },
  classorsem: {
    type: String,
    default: '',
  },
  schoolorcollege: {
    type: String,
    default: '',
  },
  fatherOcc: {
    type: String,
    default: '',
  },
  motherOcc: {
    type: String,
    default: '',
  },
  courses: {
    type: [String],
    default: '',
  },
  tasks:[
    {week:{
      type: Number,
    },
    question:{
      type: String
    },
    answer:{
      type:String
    },
    link:{
      type: String
    }}
  ]


});

const Student = User.discriminator('Student', studentSchema);
module.exports = Student;
