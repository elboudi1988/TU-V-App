import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../Register/Register.css";

const ServicePosts = () => {
  const [servicePosts, setServicePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicePosts = async () => {
      const token = Cookies.get("token");
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/ServicePostsForUser",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServicePosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicePosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Service Posts</h1>
      <ul className="service-post-list">
        {servicePosts.map((post) => (
          <div className="container">
            <li key={post._id}>
              <h2>Dienst: </h2>
              <h3>{post.serviceName}</h3>
              <p>{post.companyName}</p>
              <p>
                {post.street} {post.house_number}, {post.city}, {post.zipCode}
              </p>
              <h4>Subservices:</h4>
              <ul>
                {(post.subservices || []).map((subservice, index) => (
                  <li key={index}>{subservice.name}</li>
                ))}
              </ul>
              <h4>Booking Times:</h4>
              <ul>
                {(post.bookingtime || []).map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ServicePosts;
