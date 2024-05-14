const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
      name: {
        type: String,
        default: "",
      },
      username: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      password: {
        type: String,
        default: "",
      },
      cpassword: {
        type: String,
        default: "",
      },
      dob: {
        type: String,
        default: "",
      },
      gender: {
        type: String,
        default: "",
      },
      fatherName: {
        type: String,
        default: "",
      },
      motherName: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      altphone: {
        type: String,
        default: "",
      },
      chosensubject: {
        type: String,
        default: "",
      },
      classorsem: {
        type: String,
        default: "",
      },
      schoolorcollege: {
        type: String,
        default: "",
      }
})

studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
      this.cpassword = await bcrypt.hash(this.password, 12);
    }
    next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;