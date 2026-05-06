import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Snackbar, Alert } from "@mui/material";

function StudentProfile() {

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("Profile.jpg");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ open: false, text: "", type: "success" });

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const navigate = useNavigate();

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
        console.error("Failed to fetch student profile:", error);
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
      // Show immediate local preview
      setProfileImage(URL.createObjectURL(file));

      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        // user-service actually exposes /profiles (ProfileController) for photo uploads
        // The API Endpoint is PUT /api/profiles/{userId}/upload-photo
        const response = await axiosInstance.put(`/profiles/${userId}/upload-photo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        // If the backend returns the new image URL, set it
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

  const getCalculatedYear = (joinYearStr) => {
    if (!joinYearStr) return "N/A";
    const joinYear = parseInt(joinYearStr, 10);
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const currentYear = new Date().getFullYear();
    const academicStart = currentMonth >= 6 ? currentYear : currentYear - 1;

    // e.g. joinYear = 2023. academicStart = 2024. diff = 1. So they are in their 2nd year.
    const diff = academicStart - joinYear + 1;

    if (diff === 1) return "1st Year";
    if (diff === 2) return "2nd Year";
    if (diff === 3) return "3rd Year";
    if (diff === 4) return "4th Year";
    if (diff > 4) return "Alumni / Graduated (" + diff + "th Year)";
    return "Invalid Year Data";
  };

  const displayData = userData ? [
    { label: "Name", value: userData.name || "N/A" },
    { label: "Reg.No", value: userData.regNo || "N/A" },
    { label: "Year", value: getCalculatedYear(userData.year) },
    { label: "Batch", value: userData.year || "N/A" },
    { label: "Department", value: userData.department || "N/A" },
    { label: "Section", value: userData.section || "N/A" },
    { label: "Email ID", value: userData.email || "N/A" },
    { label: "Mobile No", value: userData.phone || "N/A" },
    { label: "DOB", value: userData.dateOfBirth || "N/A" },
  ] : [];

  return (
    <div className="bg-[#E5E5E5] m-[5px] rounded-[10px] h-[600px] flex p-3">

      {/* LEFT SECTION */}
      <div className="flex flex-col items-center w-2/5">

        <img
          src={profileImage}
          alt="Profile"
          className="w-[250px] h-[250px] rounded-full mt-12 object-cover p-[5px] bg-white"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          className="mt-8 w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
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
          className="mt-5 w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
          onClick={() => navigate("/reset-password")}
          style={{
            backgroundColor: hover2 ? "#ffffff" : "#16005d",
            color: hover2 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
        >
          Reset Password
        </button>

        <button
          className="mt-5 w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          style={{
            backgroundColor: hover3 ? "#ffffff" : "#16005d",
            color: hover3 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-[10px] p-4 ml-12 mt-6 my-[60px] w-[700px] h-[510px] border border-[#16005D]">

        {loading ? (
          <div className="flex justify-center items-center h-full text-[20px] text-[#16005d] font-semibold">Loading Profile...</div>
        ) : (
          displayData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[300px_1fr] items-center py-3"
            >
              <div className="font-semibold text-[20px] text-[#16005D] border-r-2 border-black pl-20">
                {item.label}:
              </div>

              <div className="text-[18px] font-medium text-[#16005D] pl-[60px]">
                {item.value}
              </div>
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

export default StudentProfile;
