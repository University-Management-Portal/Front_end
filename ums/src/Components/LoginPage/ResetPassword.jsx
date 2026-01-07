import React, { useState } from 'react'
import "./LoginPage.css"
import "./ForgetPassword.css"
import "./Login.css"
import LHeader from "../LogHeader/LHeader"
import {Link, useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert'
function ResetPassword() {
    const[Old,setOld] = useState();
    const[New,setNew] = useState();
    const[Confirm,setConfirm] = useState();
    const Navigate = useNavigate();

    const handlepassword=()=>{
        if(!Old || !New || !Confirm){
            alert("Please fill all fields")
            return ;
        }
        if(New != Confirm){
            alert("Password is not match")
        }
        Alert("Password Successfully Reset!")
        Navigate("/")
    }

  return (
    <div className='bg'>
        <LHeader/>
        <div className='forget-container'>
            <div className='forget-card' style={{backgroundColor:"#BBD2DC"}}>
                <p>Reset Password</p>
              <form>
                  <p style={{marginBottom:"0px"}}>Set New Password :</p><br></br>
                  <input type='text' placeholder='Old Password' 
                  onChange={(e)=>setOld(e.target.value)}></input><br></br>
                  
                  <input type='text' placeholder='New Password'
                  onChange={(e)=>setNew(e.target.value)}></input><br></br>

                  <input type='text' placeholder='Confirm Password'
                  onChange={(e)=>setConfirm(e.target.value)}></input><br></br>

                  <Link to = "/forget-password" className='fp'>Forget Password?</Link><br></br>

                  <button type="button" onClick={handlepassword}>Reset</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword