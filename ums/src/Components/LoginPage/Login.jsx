import React, { useState } from 'react'
import LHeader from '../LogHeader/LHeader'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [hover1, setHover1] = useState(false);

  const role = user.trim().toLowerCase();

  const handleUser = () => {
    if (role === "staff") {
      localStorage.setItem("userType", "staff");
      navigate("/staff-dashboard");
    }
    if (role === "student") {
      localStorage.setItem("userType", "student");
      navigate("/student-dashboard");
    }
    if (role === "admin") {
      localStorage.setItem("userType", "admin");
      navigate("/admin-dashboard");
    }
  };

  return (
    <div>
      <LHeader />

      {/* Background */}
      <div className='w-screen h-screen relative bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat p-[40px_80px] overflow-hidden'>

        {/* Left Content */}
        <div className='mt-[80px]'>
          <p className="text-[38px] font-semibold text-white tracking-[1px]">
            25 YEARS OF EXCELLENCE
          </p>
        </div>

        <div className='mt-[10px]'>
          <p className="text-[58px] font-bold text-[#16005d]">
            BEC
          </p>
        </div>

        <div className='mt-[100px]'>
          <img src="NBA.png" alt="NBA" className="h-[60px]" />
        </div>

        <div className='max-w-[700px] mt-[20px]'>
          <p className="font-medium text-[30px] leading-[1.5] text-white">
            Scientists dream about doing great things. <br />
            Engineers make them happen
          </p>
        </div>

        {/* Login Card */}
        <div className='absolute top-1/2 opacity-[0.7] right-[90px] -translate-y-1/2
          w-[440px] p-[40px] rounded-[22px]
          shadow-[0_25px_50px_rgba(0,0,0,0.25)]
          bg-[#ffffff]/10 backdrop-blur-md mt-[40px]'>

          <p className="text-[36px] font-bold mb-[35px] text-black text-center">
            Login Portal
          </p>

          <form>
            <p className="text-[19px] text-black/80 font-medium mb-[12px]">
              Enter your credentials :
            </p>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setUser(e.target.value)}
              className="
                w-full h-[50px] px-[15px] mb-[22px]
                rounded-[10px] border border-white
                bg-white/80
                text-black/80
                placeholder:text-black/50
                focus:outline-none focus:ring-2 focus:ring-[#16005d]/40
              "
            />

            <input
              type="password"
              placeholder="Password"
              className="
                w-full h-[50px] px-[15px] mb-[10px]
                rounded-[10px] border border-white
                bg-white/80
                text-black/80
                placeholder:text-black/50
                focus:outline-none focus:ring-2 focus:ring-[#16005d]/40
              "
            />

            <Link
              to="/forget-password"
              className="block text-right text-[14px] text-[#0021F4] mb-[20px] hover:underline"
            >
              Forget Password?
            </Link>

            <button
              type="button"
              onClick={handleUser}
              className="
                bg-[#16005d] text-white
                h-[42px] w-1/2
                rounded-[20px]
                text-[17px] font-semibold
                block mx-auto
                transition-all
                hover:bg-white hover:text-[#16005d]
              "
              style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff",
              borderRadius:"20px"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            >
              Login
            </button>
          </form>

          <p className="text-[13px] text-center mt-[14px] text-[#12004a]">
            *You should be a member of this organization
          </p>
          <p className="text-[13px] text-center mt-1 text-[#16005d]">
            *Use only official Email ID
          </p>
        </div>
      </div>
    </div>
  )
}
