import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Snackbar, Alert } from "@mui/material";

export default function AdminProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("profiles.jpg");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ open: false, text: "", type: "success" });
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          navigate("/");
          return;
        }
        const response = await axiosInstance.get(`/users/${userId}`);
        setUserData(response.data);
        if (response.data.profileImageUrl) {
          setProfileImage(response.data.profileImageUrl);
          localStorage.setItem("profileImage", response.data.profileImageUrl);
          window.dispatchEvent(new Event('profileImageUpdated'));
        }
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpdateClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));

      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.put(`/profiles/${userId}/upload-photo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.data && response.data.profileImageUrl) {
          setProfileImage(response.data.profileImageUrl);
          localStorage.setItem("profileImage", response.data.profileImageUrl);
          window.dispatchEvent(new Event('profileImageUpdated'));
        }
        setMessage({ open: true, text: "Profile photo updated successfully!", type: "success" });
      } catch (error) {
        console.error("Failed to upload profile photo:", error);
        setMessage({ open: true, text: "Failed to update profile photo.", type: "error" });
      }
    }
  };

  const displayData = userData ? [
    { label: "Admin Name", value: userData.name || "N/A" },
    { label: "Admin ID", value: userData.regNo || "N/A" },
    { label: "Email ID", value: userData.email || "N/A" },
    { label: "Mobile No", value: userData.phone || "N/A" },
    { label: "DOB", value: userData.dateOfBirth || "N/A" },
    { label: "Role", value: userData.role || "N/A" }
  ] : [];

  return (
    <div className="bg-[#e5e5e5] m-[5px] rounded-[10px] h-[600px] flex">

      <div className="w-2/5 flex flex-col items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-[250px] h-[250px] rounded-full mt-[70px] object-cover p-[5px] bg-white"
        />

        <div className="mt-[30px] flex flex-col gap-[20px]">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <button
            className="w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
            onClick={handleUpdateClick}
            style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
          >
            Update Photo
          </button>

          <button
            className="w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
            onClick={() => navigate("/reset-password")}
            style={{
              backgroundColor: hover2 ? "#ffffff" : "#16005d",
              color: hover2 ? "#16005d" : "#ffffff",
              padding: hover2 ? "0px" : "10px",
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
          >
            Reset Password
          </button>

          <button
            className="w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            style={{
              backgroundColor: hover3 ? "#ffffff" : "#16005d",
              color: hover3 ? "#16005d" : "#ffffff",
              padding: hover3 ? "0px" : "10px",
            }}
            onMouseEnter={() => setHover3(true)}
            onMouseLeave={() => setHover3(false)}
          >
            Logout
          </button>

        </div>
      </div>

      <div className="bg-white m-[60px_20px] rounded-[10px] w-[700px] border border-[#16005d] p-[10px]">
        {loading ? (
          <div className="flex justify-center items-center h-full text-[20px] text-[#16005d] font-semibold">Loading Profile...</div>
        ) : (
          displayData.map((item, index) => (
            <div className="grid grid-cols-[300px_1fr] items-center p-[15px]" key={index}>
              <span className="font-semibold text-[20px] text-[#16005d] border-r-2 border-black pl-[40px]">{item.label}:</span>
              <span className="pl-[30px] text-[18px] font-medium text-[#16005d]">{item.value}</span>
            </div>
          ))
        )}
      </div>
      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: "100%" }}>
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
