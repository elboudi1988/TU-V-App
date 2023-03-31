import React, { useState, useEffect } from "react";

function UserBookings() {
  const [bookings, setBookings] = useState([]);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
      return match[2];
    }
    return null;
  };

  useEffect(() => {
    const token = getCookie("token");

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("Request options:", requestOptions);
    fetch("http://localhost:8000/api/userbooking", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching user bookings:", error);
      });
  }, []);
  console.log("bookings", bookings);
  return (
    <div className="user-bookings">
      <h2>Deine Buchungen</h2>
      {bookings.length === 0 ? (
        <p>Keine Buchungen gefunden.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <div>
                <strong>Service:</strong> {booking.serviceId.serviceName}
              </div>
              <div>
                <strong>Datum:</strong>{" "}
                {new Intl.DateTimeFormat("de-DE").format(
                  new Date(booking.date)
                )}
              </div>
              <div>
                <strong>Zeit:</strong>{" "}
                {new Date(booking.time).toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBookings;
