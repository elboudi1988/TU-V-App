import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarckerClusterGroup from "react-leaflet-cluster";
import "./Map.css";
import fetchUserData from "../GetUser";

function Map({ userId }) {
  const [position, setPosition] = useState({ lat: 51.1657, lng: 10.4515 });
  const [geocodes, setGeocodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(position);
  const [mapZoom, setMapZoom] = useState(10);
  const [resultsToShow, setResultsToShow] = useState(50);
  const [userData, setUserData] = useState(null);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
    iconSize: [38, 38],
  });
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
      return match[2];
    }
    return null;
  };
  const handleShowMore = () => {
    setResultsToShow(resultsToShow + 50);
  };
  const SetMapCenter = ({ center, zoom }) => {
    const map = useMap();
    const prevCenter = useRef(center);
    useEffect(() => {
      if (JSON.stringify(prevCenter.current) !== JSON.stringify(center)) {
        prevCenter.current = center;
        map.setView(center, zoom);
      }
    }, [center, zoom, map]);
    return null;
  };
  useEffect(() => {
    const token = getCookie("token");
    fetchUserData(token)
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  console.log(userData);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition(currentPosition);
        setMapCenter(currentPosition);
        setMapZoom(13);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  async function fetchServiceData() {
    try {
      const response = await fetch("http://localhost:8000/api/Services");
      const data = await response.json();
      const services = data.map((service) => {
        return {
          name: service.serviceName,
          address: `${service.street} ${service.house_number}, ${service.plz} ${service.city}`,
        };
      });
      return services;
    } catch (error) {
      console.error(error);
    }
  }

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
                    serviceId: address._id,
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
    let sortedResults = geocodes;
    if (searchQuery === "") {
      setSearchResults(geocodes);
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
    sortedResults.sort((a, b) => {
      const cityA = a.address.split(", ")[1].toLowerCase();
      const cityB = b.address.split(", ")[1].toLowerCase();

      if (cityA < cityB) {
        return -1;
      }
      if (cityA > cityB) {
        return 1;
      }
      return 0;
    });
    setSearchResults(searchResults);
  }, [searchQuery, geocodes]);
  return (
    <>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="map-container">
        <div className="search-results-wrapper">
          <ul>
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() =>
                  handleClick(result.location.lat(), result.location.lng())
                }
              >
                <h5>
                  {result.name},{result.address}
                </h5>
              </li>
            ))}
          </ul>
          {searchResults.length > resultsToShow && (
            <button onClick={handleShowMore}>Mehr</button>
          )}
        </div>
        <div className="map-wrapper">
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={mapZoom}
            style={{ height: "400px" }}
          >
            <SetMapCenter
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={mapZoom}
            />
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
                  <>{console.log("first", geocode.serviceId)}</>
                  <Popup>
                    {`${geocode.name}`}
                    <br></br>
                    {`${geocode.address}`}
                    <br></br>
                    <Link
                      to={`/createbooking?userId=${userId}&serviceId=${geocode.serviceId}&serviceName=${geocode.name}`}
                    >
                      more
                    </Link>
                  </Popup>
                </Marker>
              ))}
            </MarckerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default Map;
