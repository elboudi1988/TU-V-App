const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("ServicePost", ServiceSchema);
