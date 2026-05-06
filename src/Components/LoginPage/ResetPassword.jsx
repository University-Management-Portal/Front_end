import React, { useState } from 'react';
import LHeader from "../LogHeader/LHeader";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { CircularProgress, Alert, Snackbar } from '@mui/material';

function ResetPassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: 'info', open: false });
    const [hover1, setHover1] = useState(false);

    const handlePassword = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            setMessage({ text: 'Please fill all fields', type: 'warning', open: true });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error', open: true });
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.put('/auth/change-password', {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });
            setMessage({ text: 'Password successfully reset!', type: 'success', open: true });
            setTimeout(() => navigate("/"), 1500); // Redirect to login or home
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Failed to change password. Please check your old password.', type: 'error', open: true });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen relative bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat p-[40px_80px] overflow-hidden'>
            <LHeader />
            <div className='min-h-screen flex items-center justify-center'>
                <div className='absolute w-[440px] opacity-[0.7] p-[40px] rounded-[22px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] bg-[#BBD2DC] backdrop-blur-sm'>
                    <p className="text-[32px] font-bold mb-[45px] text-black text-center">Reset Password</p>
                    <form>
                        <p className="font-medium text-[16px] text-black mb-[10px]">Set New Password :</p>

                        <input type='password' placeholder='Old Password'
                            onChange={(e) => setOldPassword(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border" />

                        <input type='password' placeholder='New Password'
                            onChange={(e) => setNewPassword(e.target.value)} className="w-full h-[50px] px-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border" />

                        <input type='password' placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-[50px] px-[15px] mb-[10px] rounded-[10px] border border-white text-[15px] bg-white text-black placeholder:text-gray-500 box-border" />

                        <Link to="/forget-password" className='text-[#0021F4] block text-right text-[14px] no-underline mb-[15px] hover:underline'>Forget Password?</Link>

                        <button
                            type="button"
                            onClick={handlePassword}
                            disabled={loading}
                            className="bg-[#16005d] text-white h-[40px] w-1/2 p-[5px] rounded-[20px] border-none text-[17px] font-semibold cursor-pointer flex justify-center items-center mx-auto mt-[10px] hover:bg-white hover:text-[#16005d] transition-colors disabled:opacity-50"
                            style={{
                                backgroundColor: hover1 && !loading ? "#2d1a7a" : "#16005d",
                                color: "#ffffff",
                            }}
                            onMouseEnter={() => setHover1(true)}
                            onMouseLeave={() => setHover1(false)}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset'}
                        </button>
                    </form>
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

export default ResetPassword