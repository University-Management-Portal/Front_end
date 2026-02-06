import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function StudentProfile() {

  const ProfileData = [
    { label: "Name", value: "Vinayak" },
    { label: "Reg No", value: "717823X123" },
    { label: "Year", value: "III" },
    { label: "Department", value: "CSE" },
    { label: "Section", value: "C" },
    { label: "Email", value: "XXXXXXX@gmail.com" },
    { label: "Phone Number", value: "9876543210" },
    { label: "Address", value: "123, ABC Street, City, Country" },
    { label: "Tutor", value: "Alex Pandiyan" }
  ];

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("Profile.jpg");

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
        >
          Update Photo
        </button>

        <button
          className="mt-5 w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
          onClick={() => navigate("/reset-password")}
        >
          Reset Password
        </button>

        <button
          className="mt-5 w-[220px] h-[45px] rounded-[15px] font-medium box-border std-btn"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>

      {/* RIGHT SECTION */}
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

export default StudentProfile;
