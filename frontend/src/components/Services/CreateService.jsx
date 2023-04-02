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

  const addSubservice = () => {
    if (subserviceInput) {
      setSubservices([...subservices, { name: subserviceInput }]);
      setSubserviceInput("");
    }
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
      </label>
      <ul>
        {subservices.map((subservice, index) => (
          <li key={index}>{subservice.name}</li>
        ))}
      </ul>
      <button type="submit">Create Service Post</button>
    </form>
  );
};

export default CreateServiceForm;
