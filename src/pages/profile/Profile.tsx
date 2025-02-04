import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnAuthenticatedPage from "../unauthenticated/UnAuthenticatedPage";
import "./Profile.css";

const Profile = ({ handleLogout }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  const userdata_string = localStorage.getItem("userdata");
  const userdata = userdata_string && JSON.parse(userdata_string);

  return (
    <div className="profile-container">
      {isAuthenticated ? (
        <div className="profile-card">
          <div className="profile-header">
            <img src="/assets/chef.png" alt="Profile" className="profile-img" />
            <h1>Welcome, {userdata!.username}</h1>
          </div>
          <div className="profile-info">
            <p>
              <strong>Country:</strong> {userdata!.country}
            </p>
            <p>
              <strong>Email:</strong> {userdata!.email}
            </p>
          </div>
          <div className="logout-btn-container">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <UnAuthenticatedPage />
      )}
    </div>
  );
};

export default Profile;
