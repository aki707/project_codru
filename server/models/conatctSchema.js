const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Converts email to lowercase
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Phone number validation
  },
  city: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;