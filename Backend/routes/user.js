const express = require("express");
const {
  register,
  ActivateAcount,
  logout,
  login,
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
} = require("../controllers/BookingController");
const router = express.Router();
//Campnay_Login & register
router.post("/register", register);
router.post("/activate", ActivateAcount);
router.post("/login", login);
router.get("/logout", logout);
//Client_Login & register
//Services
router.post("/createservice", auth, isAdmin, createServicePost);
router.get("/ServicePostsForUser", auth, isAdmin, getServicePostsForUser);
router.get("/services", getAllServicePosts);
router.delete("/deleteservice/:id", auth, isAdmin, deleteServicePost);
router.put("/update/:id", auth, isAdmin, updateServicePost);

router.post("/booking/:serviceId", auth, createBooking);
router.get("/userbooking", auth, getUserBooking);
router.get("/adminbooking", getAdminBooking);
module.exports = router;
