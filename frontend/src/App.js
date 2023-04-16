import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/Navbar.css";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/logout";
import Navbar from "./components/Navbar";
import CleintBookings from "./components/Booking/ClientBooking";
import CreateBooking from "./components/Booking/CreateBooking";
import CreateServiceForm from "./components/Services/CreateService";
import ServicePage from "./components/Services/Service";
import ServicePosts from "./components/Services/ServicesAdmin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Booking" element={<CleintBookings />} />
        <Route path="/createbooking" element={<CreateBooking />} />
        <Route path="/CreateService" element={<CreateServiceForm />} />
        <Route path="/Service" element={<ServicePage />} />
        <Route path="/ServicePosts" element={<ServicePosts />} />
      </Routes>
    </Router>
  );
}

export default App;
