import React, { useState } from "react";
import ReactSwitch from "react-switch";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    anrede: "",
    first_name: "",
    last_name: "",
    bYear: "",
    bMonth: "",
    bDay: "",
    companyName: "",
    email: "",
    password: "",
    street: "",
    house_number: "",
    city: "",
    role: "",
    // weitere Felder für Benutzerdetails
  });

  const [checked, setChecked] = useState(true);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );
      console.log(response.data);
      // Hier kannst du weitere Aktionen durchführen, z. B. den Benutzer zur Anmeldeseite weiterleiten
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      // Hier kannst du Fehlermeldungen anzeigen oder andere Fehlerbehandlungen durchführen
    }
  };
  const handleChange = (val) => {
    setChecked(val);
  };
  if (checked) {
    FormData.role = "admin";
  }

  return (
    <>
      <div className="app" style={{ textAlign: "center" }}>
        <h4>Admin</h4>
        <ReactSwitch checked={checked} onChange={handleChange} />
      </div>

      {!checked ? (
        <div>
          <h1>Client</h1>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <h1>Birthday</h1>
            <label>day:</label>
            <input
              type=""
              name="bDay"
              value={formData.bDay}
              onChange={handleInputChange}
              required
            />
            <label>Month:</label>
            <input
              type=""
              name="bMonth"
              value={formData.bMonth}
              onChange={handleInputChange}
              required
            />
            <label>Year:</label>
            <input
              type=""
              name="bYear"
              value={formData.bYear}
              onChange={handleInputChange}
              required
            />
            {/* Weitere Felder für Benutzerdetails */}
            <button type="submit">Register</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Admin</h1>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <h1>Birthday</h1>
            <label>day:</label>
            <input
              type=""
              name="bDay"
              value={formData.bDay}
              onChange={handleInputChange}
              required
            />
            <label>Month:</label>
            <input
              type=""
              name="bMonth"
              value={formData.bMonth}
              onChange={handleInputChange}
              required
            />
            <label>Year:</label>
            <input
              type=""
              name="bYear"
              value={formData.bYear}
              onChange={handleInputChange}
              required
            />
            <label>companyName:</label>
            <input
              type=""
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
            <label>street:</label>
            <input
              type=""
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
            <label>House Number:</label>
            <input
              type=""
              name="House Number"
              value={formData.house_number}
              onChange={handleInputChange}
              required
            />
            <label>city:</label>
            <input
              type=""
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <label>plz:</label>
            <input
              type=""
              name="plz"
              value={formData.plz}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;
