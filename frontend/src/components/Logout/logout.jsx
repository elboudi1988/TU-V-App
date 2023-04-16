import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const history = useNavigate();
  localStorage.removeItem("companyName");
  localStorage.removeItem("role");
  useEffect(() => {}, [history]);

  return (
    <div>
      <h1>Logout</h1>
      <p>You have been logged out.</p>
    </div>
  );
}

export default Logout;
