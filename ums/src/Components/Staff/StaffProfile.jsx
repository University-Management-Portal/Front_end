import React,{useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './StaffProfiles.css';
import ProfileData from './ProfileData.js';

export default function StaffProfile() {


  const fileInputRef = useRef(null)
  
  const[profileImage, setProfileImage] = useState("profiles.jpg");

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
    <div className="container">
      <div className="left-cart">
        <img src={profileImage} alt="Profile" width={250} height={250} style={{
          borderRadius: "50%",
          marginTop: "70px",
          marginLeft: "222px",
          objectFit: "cover",
          padding: "5px"
        }} />
        
        <div className='items'>
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

      <div className="right-cart">

        {ProfileData.map((item, index) => (
          <div className="row" key={index}>
            <span className="label">{item.label}:</span>
            <span className="value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


        
        
        
        
        

