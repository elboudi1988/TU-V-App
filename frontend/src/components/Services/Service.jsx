import React, { useState, useEffect } from "react";

function ServicePage() {
  const searchParams = new URLSearchParams(window.location.reload());
  const [service, setService] = useState([]);
  const serviceId = searchParams.get("serviceId");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Request options:", requestOptions);
    fetch("http://localhost:8000/api/Services", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Service");
        }
        if (serviceId === response.serviceId) return response.json();
      })
      .then((data) => {
        setService(data);
      })
      .catch((error) => {
        console.error("Error fetching Service:", error);
      });
  }, []);
  console.log("bookings", service);
  return (
    <div className="user-bookings">
      <h2>Service</h2>
      {service.length === 0 ? (
        <p>Keine Service gefunden.</p>
      ) : (
        <ul>
          {service.map((service, index) => (
            <li key={index}>
              <div>
                <strong>Service:</strong> {service.serviceId.serviceName}
              </div>
              <div>
                <strong>Datum:</strong>{" "}
                {new Intl.DateTimeFormat("de-DE").format(
                  new Date(service.date)
                )}
              </div>
              <div>
                <strong>Zeit:</strong>{" "}
                {new Date(service.time).toLocaleTimeString("de-DE", {
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

export default ServicePage;
