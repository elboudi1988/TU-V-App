// controllers/bookingServiceController.js
const ServicePost = require("../models/servicePost");
const BookingService = require("../models/BookingService");
//const ServicePost = require("../models/ServicePost");

exports.getUserBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await BookingService.find({ userId: userId });
    //.populate("userId")
    // .populate("serviceId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminBooking = async (req, res) => {
  try {
    const userId = req.userId;

    const servicePosts = await ServicePost.find({ userId: userId });

    if (servicePosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this admin." });
    }

    const serviceIds = servicePosts.map((service) => service._id);

    const bookings = await BookingService.find({
      serviceId: { $in: serviceIds },
    })
      .populate("userId", "first_name last_name email")
      .populate("serviceId", "serviceName companyName");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const userId = req.userId;

    const { date } = req.body;
    const booking = new BookingService({
      userId: userId,
      serviceId: serviceId,
      date,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { date, status } = req.body;

    const updatedBooking = await BookingService.findByIdAndUpdate(
      bookingId,
      {
        date,
        status,
      },
      { new: true }
    );

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    await BookingService.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
