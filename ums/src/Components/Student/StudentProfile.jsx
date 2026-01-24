import React from 'react'
import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './StudentProfile.css';

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

  const fileInputRef = useRef(null)

  const[profileImage, setProfileImage] = useState("Profile.jpg");

  const handleupdateclick=()=>{
    fileInputRef.current.click();
  }

  const handleImageChange=(event)=>{
    const file= event.target.files[0];
    if(file)
    {
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const navigate = useNavigate();

  return (
     <div className="profile-container">
      <div className="profile-left">
        <img src={profileImage} alt="Profile" width={250} height={250} style={{
          borderRadius: "50%",
          marginTop: "70px",
          marginLeft: "222px",
          objectFit: "cover",
          padding: "5px",
          marginBottom:"20px"
        }} />
        
        <div className='profile-items'>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{display: "none"}} />
        <button className='buttons' onClick={handleupdateclick} >Update Photo</button>
        <br />
        <br />
        <button className='buttons'  onClick={() => navigate("/reset-password")}>Reset Password</button>
        <br />
        <br />
        <button className='buttons' style={{marginBottom:"160px"}} onClick={() => navigate("/")}>Logout</button>
        </div>

      </div>

      <div className="profile-right">

        {ProfileData.map((item, index) => (
          <div className="student-row" key={index}>
            <span className="student-label">{item.label}</span>
            <span className="student-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentProfile