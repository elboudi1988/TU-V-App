import React, { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Register.css";

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

  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
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
      if (error.response && error.response.status === 409) {
        // Email already exists
        setErrorMessage("E-Mail ist bereits registriert.");
      } else {
        console.error("Fehler bei der Registrierung:", error);
        setErrorMessage(
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
        );
      }
    }
  };
  const handleChange = (val) => {
    setChecked(val);
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: checked ? "admin" : "client",
    }));
  }, [checked]);

  return (
    <>
      <div className="app" style={{ textAlign: "center" }}>
        <h4>Admin</h4>
        <ReactSwitch checked={checked} onChange={handleChange} />
      </div>

      {!checked ? (
        <div className="container">
          <h1>Client</h1>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="input-container">
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
              <label>Anrede:</label>
              <select
                name="anrede"
                value={formData.anrede}
                onChange={handleInputChange}
                required
              >
                <option value="">Bitte auswählen</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
              </select>

              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              <label>Geburtsdatum</label>
              <DatePicker
                selected={formData.birthDate}
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                name="birthDate"
                required
              />
              {/* Weitere Felder für Benutzerdetails */}
              <button type="submit" className="button">
                Register
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Admin</h1>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="input-container">
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
              <label>Anrede:</label>

              <select
                name="anrede"
                value={formData.anrede}
                onChange={handleInputChange}
                required
              >
                <option value="">Bitte auswählen</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
              </select>

              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              <label>Geburtsdatum</label>
              <DatePicker
                selected={formData.birthDate}
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                name="birthDate"
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
                name="house_number"
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
              <button type="submit" className="button">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
