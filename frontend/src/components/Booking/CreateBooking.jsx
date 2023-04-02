import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const [bookingId, setBookingId] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get("serviceId");
  const serviceName = searchParams.get("serviceName");
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
      return match[2];
    }
    return null;
  };
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = getCookie("token");

        const response = await axios.get(`http://localhost:8000/api/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data._id);
      } catch (error) {
        console.error(error);
        alert("Fehler beim Laden des Benutzerkontos");
      }
    };
    fetchUserId();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getCookie("token");

      const response = await axios.post(
        `http://localhost:8000/api/booking/${serviceId}`,
        {
          userId: userId, // send userId as part of the request body
          date: date,
          time: new Date(`${date}T${time}:00Z`),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // set the content type to JSON
          },
        }
      );
      if (response.status === 201) {
        // Successful booking
        setBookingId(response.data._id); // use '_id' instead of 'id' since that is the name of the field in your MongoDB document
        console.log("Buchung erfolgreich");
      } else {
        // Error during booking
        console.error("Fehler bei der Buchung");
      }
    } catch (error) {
      console.error(error);
      alert("Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div>
      <h2>{serviceName}</h2>
      <h3>Buchung</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Datum:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
        <label htmlFor="time">Zeit:</label>
        <input type="time" id="time" value={time} onChange={handleTimeChange} />
        <button type="submit">Buchen</button>
      </form>
    </div>
  );
};

export default Booking;
