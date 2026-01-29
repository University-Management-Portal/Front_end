import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";
import ProfileData from "./AdminProfileData.js";

export default function AdminProfile() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("profiles.jpg");
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="admin-container">
      {/* LEFT CARD */}
      <div className="admin-left-card">
        <img
          src={profileImage}
          alt="Profile"
          className="admin-profile-img"
        />

        <div className="admin-actions">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <button className="admin-btn" onClick={handleUpdateClick}>
            Update Photo
          </button>

          <button
            className="admin-btn"
            onClick={() => navigate("/reset-password")}
          >
            Reset Password
          </button>

          <button
            className="admin-btn logout"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-right-card">
        {ProfileData.map((item, index) => (
          <div className="admin-row" key={index}>
            <span className="admin-label">{item.label}:</span>
            <span className="admin-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
