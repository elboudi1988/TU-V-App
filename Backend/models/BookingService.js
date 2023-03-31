// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServicePost",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "canceled"],
    default: "pending",
  },
});

module.exports = mongoose.model("BookingService", BookingSchema);
