import React, { useState } from 'react'
import LHeader from "../LogHeader/LHeader"
import { Link, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
function ResetPassword() {
    const [Old, setOld] = useState();
    const [New, setNew] = useState();
    const [Confirm, setConfirm] = useState();
    const Navigate = useNavigate();
    const [hover1, setHover1] = useState(false);

    const handlepassword = () => {
        if (!Old || !New || !Confirm) {
            alert("Please fill all fields")
            return;
        }
        if (New != Confirm) {
            alert("Password is not match")
        }
        alert("Password Successfully Reset!")
        Navigate("/")
    }

    return (
        <div className='w-screen h-screen relative bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat p-[40px_80px] overflow-hidden'>
            <LHeader />
            <div className='min-h-screen flex items-center justify-center'>
                <div className='absolute w-[440px] opacity-[0.7] p-[40px] rounded-[22px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] bg-[#BBD2DC] backdrop-blur-sm'>
                    <p className="text-[32px] font-bold mb-[45px] text-black text-center">Reset Password</p>
                    <form>
                        <p className="font-medium text-[16px] text-black mb-0">Set New Password :</p><br></br>
                        <input type='text' placeholder='Old Password'
                            onChange={(e) => setOld(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input><br></br>

                        <input type='text' placeholder='New Password'
                            onChange={(e) => setNew(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input><br></br>

                        <input type='text' placeholder='Confirm Password'
                            onChange={(e) => setConfirm(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input><br></br>

                        <Link to="/forget-password" className='text-[#0021F4] block text-right text-[14px] no-underline mb-[2px] hover:underline'>Forget Password?</Link><br></br>

                        <button type="button" onClick={handlepassword} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer block mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors "
                        style={{
                                        backgroundColor: hover1 ? "#ffffff" : "#16005d",
                                        color: hover1 ? "#16005d" : "#ffffff",
                                        borderRadius: "20px"
                                    }}
                                    onMouseEnter={() => setHover1(true)}
                                    onMouseLeave={() => setHover1(false)}>Reset</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword