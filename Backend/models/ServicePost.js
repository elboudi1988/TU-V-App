const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
