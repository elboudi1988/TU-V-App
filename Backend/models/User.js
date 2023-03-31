const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  anrede: {
    type: String,
    required: [true, "Anrede is required"],
    enum: ["Frau", "Herr", "Dr.", "Prof."],
  },
  first_name: {
    type: String,
    required: [true, "firs name is required"],
    trim: true,
    text: true,
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

  birthDate: {
    type: String,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  companyName: {
    type: String,
    trim: true,
    text: true,
  },
  street: {
    type: String,
    trim: true,
    text: true,
  },
  house_number: {
    type: String,
    trim: true,
    text: true,
  },
  city: {
    type: String,
    trim: true,
    text: true,
  },
  plz: {
    type: String,
    trim: true,
    text: true,
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    default: "client",
  },
});
module.exports = mongoose.model("User", userSchema);
