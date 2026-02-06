import React, { useState } from 'react'
import LHeader from '../LogHeader/LHeader'
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [Email, setEmail] = useState("");
    const [otp, setOtp] = useState();
    const [pass, setPass] = useState();
    const [confirm, setConfirm] = useState();
    const navigate = useNavigate();
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);

    const handleEmail = () => {
        if (!Email) {
            alert("Please Enter Email");
            return;
        }
        setStep(2)
    }

    const handleOTP = () => {
        if (!otp) {
            alert("Enter OTP!");
            return;
        }
        setStep(3);
    }

    const handlePassword = () => {
        if (!pass || !confirm) {
            alert("Please fill all fields");
        }
        if (pass != confirm) {
            alert("Password is not match");
        }
        else {
            alert("Password reset successfully!")
            navigate("/");
        }
    }

    return (
        <div>
            <LHeader />
            <div className='w-screen h-screen relative bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat p-[40px_80px] overflow-hidden'>
                <div className='min-h-screen flex items-center justify-center'>
                    <div className='absolute w-[440px] opacity-[0.7] p-[40px] rounded-[22px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] bg-[#BBD2DC] backdrop-blur-sm'>
                        <p className="text-[32px] font-bold mb-[45px] text-black text-center">Forget Password</p>
                        <form>
                            {step === 1 &&
                                <div>
                                    <p className="font-medium text-[16px] text-black mb-[15px]">Enter your Email :</p>

                                    <input type="email" placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input>

                                    <button onClick={handleEmail} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer block mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors"
                                    style={{
                                        backgroundColor: hover1 ? "#ffffff" : "#16005d",
                                        color: hover1 ? "#16005d" : "#ffffff",
                                        borderRadius: "20px"
                                    }}
                                    onMouseEnter={() => setHover1(true)}
                                    onMouseLeave={() => setHover1(false)}
                                    >Send OTP</button>
                                </div>
                            }
                            {step === 2 &&
                                <div>
                                    <p className="font-medium text-[20px] text-black mb-[15px]">Enter OTP :</p>

                                    <input type="text" placeholder='OTP'
                                        onChange={(e) => setOtp(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input>

                                    <button onClick={handleOTP} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer block mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors"
                                    style={{
                                        backgroundColor: hover2 ? "#ffffff" : "#16005d",
                                        color: hover2 ? "#16005d" : "#ffffff",
                                        borderRadius: "20px"
                                    }}
                                    onMouseEnter={() => setHover2(true)}
                                    onMouseLeave={() => setHover2(false)}
                                    >Verify OTP</button>
                                </div>
                            }
                            {step === 3 &&
                                <div>
                                    <p className="font-medium text-[20px] text-black mb-[15px]">New Password :</p>

                                    <input type="text" placeholder='New Password'
                                        onChange={(e) => setPass(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input>

                                    <p className="font-medium text-[20px] text-black mb-[15px]">Confirm Password :</p>

                                    <input type="text" placeholder='Confirm Password'
                                        onChange={(e) => setConfirm(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input>

                                    <button type="button" onClick={handlePassword} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer block mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors"
                                    style={{
                                        backgroundColor: hover3 ? "#ffffff" : "#16005d",
                                        color: hover3 ? "#16005d" : "#ffffff",
                                        borderRadius: "20px"
                                    }}
                                    onMouseEnter={() => setHover3(true)}
                                    onMouseLeave={() => setHover3(false)}
                                    >Reset</button>
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
