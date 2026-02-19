import React, { useState } from 'react'
import LHeader from '../LogHeader/LHeader'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [hover1, setHover1] = useState(false);

  const role = user.trim().toLowerCase();

  const handleUser = (e) => {
    e.preventDefault();

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

      <div className='w-screen h-screen relative bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat p-[40px_80px] overflow-hidden'>

        <div className='mt-[80px]'>
          <p className="text-[38px] font-bold text-white tracking-[1px]">
            25 YEARS OF EXCELLENCE
          </p>
        </div>

        <div className='mt-[15px]'>
          <p className="text-[58px] font-bold text-[#16005d]">
            BEC
          </p>
        </div>

        <div className='mt-[220px]'>
          <img src="NBA.png" alt="NBA" className="h-[60px]" />
        </div>

        <div className='max-w-[700px] mt-[20px]'>
          <p className="font-medium text-[30px] leading-[1.5] text-white">
            Scientists dream about doing great things. <br />
            Engineers make them happen
          </p>
        </div>

        <div className='absolute top-1/2 opacity-[0.7] right-[90px] -translate-y-1/2
          w-[440px] p-[40px] rounded-[22px]
          shadow-[0_25px_50px_rgba(0,0,0,0.25)]
          bg-gradient-to-r from-[#e3f2f5] to-[#b2d8e5] mt-[40px] '>

          <p className="text-[36px] font-bold mb-[35px] text-black text-center">
            Login Portal
          </p>

          <form onSubmit={handleUser}>
            <p className="text-[19px] text-black/80 font-medium mb-[12px]">
              Enter your credentials :
            </p>

            
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
              className="block text-right text-[14px] mb-[20px] hover:underline"
              style={{ color: "#0d1d82" }}
            >
              Forget Password?
            </Link>

            <button
              type="submit"
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
              backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            >
              Login
            </button>
          </form>

          <p className="text-[14px] text-center mt-[14px] " 
            style={{ color: "#240b88" , fontWeight: "500" }}>
            *You should be a member of this organization
          </p>
          <p className="text-[14px] text-center mt-1 " style={{ color: "#290c9c" , fontWeight: "500" }}>
            *Use only official Email ID
          </p>
        </div>
      </div>
    </div>
  )
}
