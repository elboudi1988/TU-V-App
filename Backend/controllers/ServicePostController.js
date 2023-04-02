const ServicePost = require("../models/servicePost");
// Create a new service post
exports.createServicePost = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.userId;
    const companyName = req.companyName;

    // Create a new service post with the user ID
    const subservices = req.body.subservices;
    const servicePost = new ServicePost({
      serviceName: req.body.serviceName,
      street: req.body.street,
      house_number: req.body.house_number,
      city: req.body.city,
      plz: req.body.plz,
      companyName: companyName,
      userId: userId,
      subservices: subservices,
    });
    // Save the service post to the database
    await servicePost.save();

    res.status(201).json({
      message: "Service post created successfully",
      servicePost,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
// Update a service post
exports.updateServicePost = async (req, res) => {
  try {
    // Get the user ID and service post ID from the request
    const userId = req.userId;
    const servicePostId = req.params.id;
    const companyName = req.companyName;

    // Find the service post by ID
    const servicePost = await ServicePost.findById(servicePostId);
    // If the service post doesn't exist or doesn't belong to the user, throw an error
    if (!servicePost || servicePost.userId.toString() !== userId) {
      throw new Error("Service post not found");
    }

    // Update the service post fields
    servicePost.serviceName = req.body.serviceName;
    servicePost.address = req.body.address;
    servicePost.companyName = companyName;

    // Save the updated service post
    await servicePost.save();

    res.status(200).json({
      message: "Service post updated successfully",
      servicePost,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteServicePost = async (req, res) => {
  try {
    // Get the user ID and service post ID from the request
    const userId = req.userId;
    const servicePostId = req.params.id;

    // Find the service post by ID
    const servicePost = await ServicePost.findById(servicePostId);
    // If the service post doesn't exist or doesn't belong to the user, throw an error
    if (!servicePost || servicePost.userId.toString() !== userId) {
      throw new Error("Service post not found");
    }

    // Delete the service post
    await ServicePost.findByIdAndDelete(servicePostId);

    res.status(200).json({
      message: "Service post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Get all service posts for a user
exports.getServicePostsForUser = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.userId;
    // Find all service posts for the user
    const servicePosts = await ServicePost.find({ userId: userId });
    res.status(200).json(servicePosts);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
// Get all service posts for all user
exports.getAllServicePosts = async (req, res) => {
  try {
    // Find all service posts
    const servicePosts = await ServicePost.find();

    res.status(200).json(servicePosts);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
