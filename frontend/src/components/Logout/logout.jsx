import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const history = useNavigate();

  useEffect(() => {
    // Hier kannst du eine API-Anfrage an den Server senden, um die Sitzung des Benutzers zu beenden
    // Nachdem die Sitzung beendet wurde, kannst du den Benutzer zur Login-Seite weiterleiten
    //history.push("/");
  }, [history]);

  return (
    <div>
      <h1>Logout</h1>
      <p>You have been logged out.</p>
    </div>
  );
}

export default Logout;
