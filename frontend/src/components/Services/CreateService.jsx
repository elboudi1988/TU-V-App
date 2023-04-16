import React, { useState } from "react";
import Cookies from "js-cookie";

const CreateServiceForm = () => {
  const [serviceName, setServiceName] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [plz, setPlz] = useState("");
  const [subservices, setSubservices] = useState([]);
  const [subserviceInput, setSubserviceInput] = useState("");
  const [selectedBookingTimes, setSelectedBookingTimes] = useState([]);
  const [bookingTime, setBookingTime] = useState("");

  const companyName = localStorage.getItem("companyName");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      serviceName,
      companyName,
      street,
      house_number: houseNumber,
      city,
      plz,
      subservices,
      bookingtime: selectedBookingTimes,
    };

    const token = Cookies.get("token");

    try {
      const response = await fetch("http://localhost:8000/api/createservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const generateTimeSlots = () => {
    const timeSlots = [];
    const startDate = new Date();
    startDate.setHours(7);
    startDate.setMinutes(0);
    const endDate = new Date();
    endDate.setHours(19);
    endDate.setMinutes(30);
    const timeIncrement = 30 * 60 * 1000; // 30 minutes in milliseconds
    for (
      let currentTime = startDate;
      currentTime <= endDate;
      currentTime = new Date(currentTime.getTime() + timeIncrement)
    ) {
      const hour = currentTime.getHours().toString().padStart(2, "0");
      const minute = currentTime.getMinutes().toString().padStart(2, "0");
      timeSlots.push(`${hour}:${minute}`);
    }
    return timeSlots;
  };

  const addSubservice = () => {
    if (subserviceInput) {
      setSubservices([...subservices, { name: subserviceInput }]);
      setSubserviceInput("");
    }
  };
  const addBookingTime = () => {
    if (bookingTime && !selectedBookingTimes.includes(bookingTime)) {
      setSelectedBookingTimes([...selectedBookingTimes, bookingTime]);
    }
  };
  const removeItem = (item, list, setList) => {
    const newList = list.filter((i) => i !== item);
    setList(newList);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Service Name:
        <input
          type="text"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
      </label>
      <label>
        Street:
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </label>
      <label>
        House Number:
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        PLZ:
        <input
          type="text"
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
        />
      </label>
      <label>
        Subservices:
        <input
          type="text"
          value={subserviceInput}
          onChange={(e) => setSubserviceInput(e.target.value)}
        />
        <button type="button" onClick={addSubservice}>
          +
        </button>
        <ul>
          {subservices.map((subservice, index) => (
            <li key={index}>
              {subservice.name}{" "}
              <span
                onClick={() =>
                  removeItem(subservice, subservices, setSubservices)
                }
                style={{ cursor: "pointer" }}
              >
                &minus;
              </span>
            </li>
          ))}
        </ul>
      </label>
      <label>
        Booking Time:
        <select
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        >
          {generateTimeSlots().map((timeSlot, index) => (
            <option key={index} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
        <button type="button" onClick={addBookingTime}>
          Add Booking Time
        </button>
        <ul>
          {selectedBookingTimes.map((bookingTime, index) => (
            <li key={index}>
              {bookingTime}{" "}
              <span
                onClick={() =>
                  removeItem(
                    bookingTime,
                    selectedBookingTimes,
                    setSelectedBookingTimes
                  )
                }
                style={{ cursor: "pointer" }}
              >
                &minus;
              </span>
            </li>
          ))}
        </ul>
      </label>
      <button type="submit">Create Service Post</button>
    </form>
  );
};

export default CreateServiceForm;
