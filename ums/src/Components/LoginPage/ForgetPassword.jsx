import React, { useState } from 'react'
import LHeader from '../LogHeader/LHeader'
import "./ForgetPassword.css"
import "./LoginPage.css"
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [step,setStep] =useState(1);
    const [Email,setEmail] = useState("");
    const [otp,setOtp] = useState();
    const [pass,setPass] = useState();
    const [confirm,setConfirm] = useState();
    const navigate = useNavigate();

    const handleEmail =()=>{
        if(!Email){
            alert("Please Enter Email");
            return ;
        }
        setStep(2)
    }

    const handleOTP =()=>{
        if(!otp){
            alert("Enter OTP!");
            return ;
        }
        setStep(3);
    }

    const handlePassword=()=>{
        if(!pass || !confirm){
            alert("Please fill all fields");
        }
        if(pass != confirm){
            alert("Password do not match");
        }
        alert("Password reset successfully!")
        navigate("/");
    }

  return (
    <div>
        <LHeader/>
        <div className='bg'>
            <div className='forget-container'>
                <div className='forget-card' style={{backgroundColor:"#BBD2DC"}}>
                    <p>Forget Password</p>
                    <form>
                        {step === 1 && 
                            <div>
                                <p>Enter your Email :</p>

                                <input type="email" placeholder='Email' 
                                onChange={(e)=>setEmail(e.target.value)} ></input>

                                <button onClick={handleEmail}>Send OTP</button>
                            </div>
                        }
                        {step === 2 && 
                            <div>
                                <p style={{fontSize :20}}>Enter OTP :</p>

                                <input type="text" placeholder='OTP' 
                                onChange={(e)=>setOtp(e.target.value)} ></input>

                                <button onClick={handleOTP}>Verify OTP</button>
                            </div>
                        }
                        {step === 3 && 
                            <div>
                                <p style={{fontSize :20}}>New Password :</p>

                                <input type="text" placeholder='New Password' 
                                onChange={(e)=>setPass(e.target.value)} ></input>

                                <p style={{fontSize :20}}>Confirm Password :</p>

                                <input type="text" placeholder='Confirm Password' 
                                onChange={(e)=>setConfirm(e.target.value)} ></input>

                                <button onClick={handlePassword}>Reset</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword