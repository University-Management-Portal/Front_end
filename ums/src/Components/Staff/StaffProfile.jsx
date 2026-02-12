import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileData from "./ProfileData";

export default function StaffProfile() {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("profiles.jpg");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const handleUpdateClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-[#E5E5E5] m-[5px] rounded-[10px] h-[600px] flex p-3">
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
          onClick={() => navigate("/")}
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
        {ProfileData.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
}
