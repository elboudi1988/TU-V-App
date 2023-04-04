const mongoose = require("mongoose");

const SubserviceSchema = new mongoose.Schema({
  name: { type: String },
});
const bookingtimeSchema = new mongoose.Schema({
  hour_time: { type: String },
});
const ServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
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
  companyName: {
    type: String,
    required: true,
  },
  subservices: {
    type: [SubserviceSchema],
    default: [],
  },
  bookingtime: {
    type: [String],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ServicePost", ServiceSchema);
