import React, { useState, useEffect } from 'react';
import LHeader from '../LogHeader/LHeader';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { CircularProgress, Alert, Snackbar } from '@mui/material';

function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [Email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: 'info', open: false });

    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);
    const [hoverResend, setHoverResend] = useState(false);

    // Timer state (300 seconds = 5 minutes)
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setMessage({ text: 'OTP Expired! Please request a new one.', type: 'error', open: true });
        }

        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleEmail = async (e) => {
        e.preventDefault();
        if (!Email) {
            setMessage({ text: 'Please Enter Email', type: 'warning', open: true });
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/auth/forgot-password', { email: Email });
            setMessage({ text: 'OTP sent successfully!', type: 'success', open: true });
            setTimer(300); // Reset timer to 5 mins
            setStep(2);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Failed to send OTP. Check if email exists.', type: 'error', open: true });
        } finally {
            setLoading(false);
        }
    }

    const handleResendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/auth/forgot-password', { email: Email });
            setMessage({ text: 'OTP resent successfully!', type: 'success', open: true });
            setTimer(300); // Reset timer to 5 mins
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Failed to resend OTP.', type: 'error', open: true });
        } finally {
            setLoading(false);
        }
    }

    const handleOTP = async (e) => {
        e.preventDefault();
        if (!otp) {
            setMessage({ text: 'Enter OTP!', type: 'warning', open: true });
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/auth/verify-otp', { email: Email, otp: otp });
            setMessage({ text: 'OTP Verified!', type: 'success', open: true });
            setStep(3);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Invalid or Expired OTP', type: 'error', open: true });
        } finally {
            setLoading(false);
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        if (!pass || !confirm) {
            setMessage({ text: 'Please fill all fields', type: 'warning', open: true });
            return;
        }
        if (pass !== confirm) {
            setMessage({ text: 'Passwords do not match', type: 'error', open: true });
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/auth/reset-password', {
                email: Email,
                otp: otp,
                newPassword: pass,
                confirmPassword: confirm
            });
            setMessage({ text: 'Password reset successfully!', type: 'success', open: true });
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Failed to reset password', type: 'error', open: true });
        } finally {
            setLoading(false);
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

                                    <button onClick={handleEmail} disabled={loading} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer flex justify-center items-center mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors disabled:opacity-50"
                                        style={{
                                            backgroundColor: hover1 && !loading ? "#2d1a7a" : "#16005d",
                                            color: "#ffffff",
                                        }}
                                        onMouseEnter={() => setHover1(true)}
                                        onMouseLeave={() => setHover1(false)}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
                                    </button>
                                </div>
                            }
                            {step === 2 &&
                                <div>
                                    <p className="font-medium text-[20px] text-black mb-[15px] flex justify-between items-center">
                                        Enter OTP :
                                        <span className={`text-[16px] ${timer > 0 ? 'text-[#16005d]' : 'text-red-600'} font-bold`}>
                                            {formatTime()}
                                        </span>
                                    </p>

                                    <input type="text" placeholder='OTP'
                                        onChange={(e) => setOtp(e.target.value)} className="w-full h-[50px] px-[15px] mb-[10px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border"></input>

                                    <div className="flex justify-end mb-[22px]">
                                        <button
                                            type="button"
                                            onClick={handleResendOTP}
                                            disabled={timer > 0 || loading}
                                            className={`text-[14px] font-semibold bg-transparent border-none cursor-pointer ${timer > 0 ? 'text-gray-500 cursor-not-allowed' : 'text-[#16005d]'}`}
                                            style={{ color: hoverResend && timer === 0 ? "#16005d" : "" }}
                                            onMouseEnter={() => setHoverResend(true)}
                                            onMouseLeave={() => setHoverResend(false)}
                                        >
                                            {loading ? <CircularProgress size={16} color="inherit" /> : 'Resend OTP'}
                                        </button>
                                    </div>

                                    <button onClick={handleOTP} disabled={loading || timer === 0} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer flex justify-center items-center mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors disabled:opacity-50"
                                        style={{
                                            backgroundColor: hover2 && !loading && timer > 0 ? "#2d1a7a" : "#16005d",
                                            color: "#ffffff",
                                        }}
                                        onMouseEnter={() => setHover2(true)}
                                        onMouseLeave={() => setHover2(false)}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
                                    </button>
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

                                    <button type="button" onClick={handlePassword} disabled={loading} className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold flex justify-center items-center cursor-pointer mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors disabled:opacity-50"
                                        style={{
                                            backgroundColor: hover3 && !loading ? "#ffffff" : "#16005d",
                                            color: hover3 && !loading ? "#16005d" : "#ffffff",
                                            borderRadius: "20px"
                                        }}
                                        onMouseEnter={() => setHover3(true)}
                                        onMouseLeave={() => setHover3(false)}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset'}
                                    </button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>

            <Snackbar
                open={message.open}
                autoHideDuration={6000}
                onClose={() => setMessage({ ...message, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: '100%' }}>
                    {message.text}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default ForgetPassword
