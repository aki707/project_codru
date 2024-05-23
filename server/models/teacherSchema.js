const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const teacherSchema = new mongoose.Schema({
  streamordepartment: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
});

const Teacher = User.discriminator("Teacher", teacherSchema);
module.exports = Teacher;
