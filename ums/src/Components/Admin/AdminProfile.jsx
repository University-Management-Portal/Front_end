import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileData from "./AdminProfileData.js";

export default function AdminProfile() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("profiles.jpg");
  const navigate = useNavigate();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

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



        </div>
      </div>

      <div className="bg-white m-[60px_20px] rounded-[10px] w-[700px] border border-[#16005d] p-[10px]">
        {ProfileData.map((item, index) => (
          <div className="grid grid-cols-[300px_1fr] items-center p-[15px]" key={index}>
            <span className="font-semibold text-[20px] text-[#16005d] border-r-2 border-black pl-[40px]">{item.label}:</span>
            <span className="pl-[30px] text-[18px] font-medium text-[#16005d]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
