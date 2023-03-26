const express = require("express");
const {
  register,
  ActivateAcount,
  logout,
  login,
  getusers,
} = require("../controllers/CompanyController");
const { isAdmin, auth } = require("../middleware/requireAuth");
const {
  createServicePost,
  deleteServicePost,
  updateServicePost,
  getAllServicePosts,
  getServicePostsForUser,
} = require("../controllers/ServicePostController");
const {
  createBooking,
  getUserBooking,
  getAdminBooking,
  updateBooking,
  deleteBooking,
  updateStatusBooking,
} = require("../controllers/BookingController");
const router = express.Router();
//Login & register
router.post("/register", register);
router.post("/activate", ActivateAcount);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser", auth, getusers);
//Services
router.post("/createservice", auth, isAdmin, createServicePost);
router.get("/ServicePostsForUser", auth, isAdmin, getServicePostsForUser);
router.get("/services", getAllServicePosts);
router.delete("/deleteservice/:id", auth, isAdmin, deleteServicePost);
router.put("/update/:id", auth, isAdmin, updateServicePost);
//booking
router.post("/booking/:serviceId", auth, createBooking);
router.get("/userbooking", auth, getUserBooking);
router.put("/updateBooking/:bookingId", auth, updateBooking);
router.delete("/deleteBooking/:bookingId", auth, deleteBooking);
router.get("/adminbooking", auth, isAdmin, getAdminBooking);
router.put(
  "/bookingstatusupdate/:bookingId",
  auth,
  isAdmin,
  updateStatusBooking
);
module.exports = router;
