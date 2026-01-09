import React, { useState } from 'react'
import "./Login.css"
import "./LoginPage.css"
import LHeader from '../LogHeader/LHeader'
import {Link, useNavigate} from "react-router-dom"

export default function Login() {
  const [user,Setuser] = useState("");
  const navigate = useNavigate();

  const role = user.trim().toLowerCase();
  const handleuser=()=>{
    if(role==="staff"){
      localStorage.setItem("userType", "staff");
      navigate("/staff-dashboard");
    }
    if(role==="student"){
      localStorage.setItem("userType", "student");                
      navigate("/student-dashboard");
    }
    if(role==="admin"){
      localStorage.setItem("userType", "admin");                  //add path
      navigate("/admin-dashboard");
    }
  }
  
  return (
    <div>
      <LHeader/>
      <div className='bg'>
          <div className='exp'><p>25 YEARS OF EXCELLENCE</p></div>

          <div className='clg'><p style={{color : "#16005D"}}><b>BEC</b></p></div>

          <div className='nba'><img src='NBA.png'></img></div>

          <div className='quote'><p>Scientists dream about doing great things.
            Engineers make them happen</p></div>

          <div className='Login-card' style={{backgroundColor:"#BBD2DC"}}>
              <p style={{fontSize :40}}>Login Portal</p>
              <form>
                  <p style={{fontSize :20}}>Enter your credentials :</p><br></br>
                  <input type='email' name='email' placeholder='Email' onChange={(e) => Setuser(e.target.value)} ></input><br></br>
                  <input type="password" name='password' placeholder='Password' ></input><br></br>
                  <Link to = "/forget-password" className='fp'>Forget Password?</Link><br></br>
                  <button type='button' onClick={handleuser}>Login</button>
              </form>
              <p>*Your should be a member of this organization</p>
              <p>*use only official Email ID</p>
          </div>
      </div>
    </div>
  )
}
