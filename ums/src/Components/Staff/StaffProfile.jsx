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

      <div className="heading">
      <p className='left'>Name</p>
      <p className=''>:</p>
      <p>Praveenkumar R</p> 
      </div>

      <div className="heading">
      <p className='left'>Reg No</p>
      <p>:</p>
      <p>23P341</p>
      </div>

      <div className="heading">
      <p className='left'>Department</p>
      <p>:</p>
      <p>Computer Science</p>
      </div>

      <div className="heading">
      <p className='left'>Area of Specilization</p>
      <p>:</p>
      <p>AI , DBMS , CN</p>
      </div>

      <div className="heading">
      <p className='left'>Date of Joining</p>
      <p>:</p>
      <p>2023-08-15</p>
      </div>

      <div className="heading">
      <p className='left'>E-Mail Id</p>
      <p>:</p>
      <p>praveen@gmail.com</p>
      </div>

      <div className="heading">
      <p className='left'>Phone Number</p>
      <p>:</p>
      <p>9876543210</p>
      </div>

      <div className="heading">
      <p className='left'>Address</p>
      <p>:</p>
      <p>123, ABC Street, City, Country</p>
      </div>

      </div>



    </div>
    
  )
}
