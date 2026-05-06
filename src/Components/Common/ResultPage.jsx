import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LogHeader from '../LogHeader/LHeader';
import axiosInstance from '../../api/axiosInstance';
import { Snackbar, Alert } from '@mui/material';

function ResultPage() {
    const [regNo, setRegNo] = useState("");
    const [dob, setDob] = useState("");
    const [hover, setHover] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, text: "", type: "info" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!regNo || !dob) {
            setSnackbar({ open: true, text: "Please fill all fields", type: "warning" });
            return;
        }

        setLoading(true);
        try {
            const res = await axiosInstance.get(`/assessment/results/lookup?registerNo=${regNo}&dob=${dob}`);
            if (res.data && res.data.length > 0) {
                navigate("/result-dashboard", { state: { results: res.data } });
            } else {
                setSnackbar({ open: true, text: "No results found or results are not published yet.", type: "info" });
            }
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, text: "Failed to fetch results. Check your Register Number and DOB.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat'>
            <LogHeader />
            <div className='flex items-center justify-center min-h-screen w-full'>
                <div className='absolute w-[440px] h-[400px] opacity-[0.7] p-[40px] rounded-[22px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] bg-[#BBD2DC]'>
                    <p className='text-[32px] font-bold mb-[45px]  text-black text-center'>Result</p>
                    <form>
                        <p className='font-medium text-[16px] text-black mb-[15px]'>Enter your credentials :</p>
                        <input type='text' placeholder='Register Number' onChange={(e) => { setRegNo(e.target.value) }} className="w-full h-[50px] bg-white/80 text-black/80 p-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] outline-none"></input><br></br>
                        <input type='text' placeholder='DOB (DD/MM/YYYY)' onChange={(e) => { setDob(e.target.value) }} className="w-full h-[50px] bg-white/80 text-black/80 p-[15px] mb-[22px] rounded-[10px] border border-white text-[15px] outline-none"></input><br></br>
                        <button type='submit' onClick={handleSubmit} disabled={loading} className="std-btn h-[40px] w-1/2 p-[5px] rounded-[20px] text-[17px] font-semibold block mx-auto mt-[10px]"
                            style={{
                                backgroundColor: hover ? "#2d1a7a" : "#16005d",
                                color: "#ffffff",
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >{loading ? "Searching..." : "Submit"}</button>
                    </form>
                </div>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: '100%' }}>
                    {snackbar.text}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ResultPage