import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarckerClusterGroup from "react-leaflet-cluster";

function SetMapCenter({ center, zoom }) {
  const map = useMap();
  const prevCenter = useRef(center);

  useEffect(() => {
    if (JSON.stringify(prevCenter.current) !== JSON.stringify(center)) {
      prevCenter.current = center;
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

function Map() {
  const [geocodes, setGeocodes] = useState([]);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(position);
  const [mapZoom, setMapZoom] = useState(10);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
    iconSize: [38, 38],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/Services")
      .then((response) => response.json())
      .then((data) => {
        const geocoder = new window.google.maps.Geocoder();

        const promises = data.map((address) => {
          return new Promise((resolve, reject) => {
            geocoder.geocode(
              {
                address: `${address.street}
                 ${address.house_number}, ${address.plz} ${address.city}`,
              },
              (results, status) => {
                if (status === "OK") {
                  resolve({
                    location: results[0].geometry.location,
                    name: address.serviceName,
                    address: `${address.street} ${address.house_number}, ${address.plz} ${address.city}`,
                  });
                } else {
                  console.error(
                    `Geocode was not successful for the following reason: ${status}`
                  );
                  reject();
                }
              }
            );
          });
        });

        Promise.all(promises)
          .then((geocodes) => setGeocodes(geocodes))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);
  const handleClick = (lat, lng) => {
    setMapCenter({ lat, lng });
    setMapZoom(15);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }

    const searchResults = geocodes.filter((geocode) => {
      const serviceNameMatch = geocode.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const addressMatch = geocode.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const cityMatch = geocode.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const plzMatch = geocode.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return serviceNameMatch || addressMatch || cityMatch || plzMatch;
    });

    setSearchResults(searchResults);
  }, [searchQuery, geocodes]);

  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <ul>
          {searchResults.map((result, index) => (
            <li
              key={index}
              onClick={() =>
                handleClick(result.location.lat(), result.location.lng())
              }
            >
              {result.name}
            </li>
          ))}
        </ul>
      </div>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={10}
        style={{ height: "400px" }}
      >
        <SetMapCenter center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
          maxZoom={18}
        />
        <MarckerClusterGroup>
          {geocodes.map((geocode) => (
            <Marker
              position={[geocode.location.lat(), geocode.location.lng()]}
              key={`${geocode.location.lat()},${geocode.location.lng()}`}
              icon={customIcon}
            >
              <Popup>{`${geocode.name} \n ${geocode.address}`}</Popup>
            </Marker>
          ))}
        </MarckerClusterGroup>
      </MapContainer>
    </>
  );
}

export default Map;
