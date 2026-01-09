import React,{useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './StaffProfiles.css';

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

  <div className="row">
    <p className="label">Name</p>
    <p className="value">Praveenkumar R</p>
  </div>

  <div className="row">
    <p className="label">Reg No</p>
    <p className="value">23P341</p>
  </div>

  <div className="row">
    <p className="label">Department</p>
    <p className="value">Computer Science</p>
  </div>

  <div className="row">
    <p className="label">Area of Specialization</p>
    <p className="value">AI, DBMS, CN</p>
  </div>

  <div className="row">
    <p className="label">Date of Joining</p>
    <p className="value">2023-08-15</p>
  </div>

  <div className="row">
    <p className="label">E-Mail Id</p>
    <p className="value">praveen@gmail.com</p>
  </div>

  <div className="row">
    <p className="label">Phone Number</p>
    <p className="value">9876543210</p>
  </div>

  <div className="row">
    <p className="label">Address</p>
    <p className="value">123, ABC Street, City, Country</p>
  </div>

</div>




    </div>
    
  )
}
