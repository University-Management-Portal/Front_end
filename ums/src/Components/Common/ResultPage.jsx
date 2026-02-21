import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LogHeader from '../LogHeader/LHeader';

function ResultPage() {
    const [regNo, setRegNo] = useState("");
    const [dob, setDob] = useState("");
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!regNo || !dob) {
        alert("Please fill all fields");
        return;
    }

    navigate("/result-dashboard");
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
                        <button type='submit' onClick={handleSubmit} className="std-btn h-[40px] w-1/2 p-[5px] rounded-[20px] text-[17px] font-semibold block mx-auto mt-[10px]"
                        style={{
                        backgroundColor: hover ? "#2d1a7a" : "#16005d",
                        color:"#ffffff",
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResultPage