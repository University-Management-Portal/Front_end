import React from 'react'
import Search from "@mui/icons-material/Search"
import Notification from "@mui/icons-material/Notifications"
import Menu from "@mui/icons-material/Menu"
import HomeIcon from '@mui/icons-material/Home';
import PageTitles from "./PageTitles"
import { useLocation, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({ 
  onMenuClick, 
  onMenuEnter,      // 👈 CORRECT NAME
  onMenuLeave 
}) {

  const navigate = useNavigate();
  const location = useLocation();

  let title = PageTitles[location.pathname]

  if (!title && location.pathname.startsWith("/student-courses")) {
    title = "Courses"
  }

  if (!title && location.pathname.startsWith("/staff-course")) {
    title = "Courses"
  }

  if (!title) {
    title = "not found"
  }

  const user = localStorage.getItem("userType")

  const handleProfileClick = () => {
    if (user === "staff") navigate('/staff-profile');
    else if (user === "student") navigate('/student-profile');
    else if (user === "admin") navigate('/admin-profile');
  }

  const handlehome = () => {
    onMenuClick();

    if (user === "student") navigate("/student-dashboard");
    else if (user === "staff") navigate("/staff-dashboard");
    else if (user === "admin") navigate("/admin-dashboard")
  }

  return (
    <div className='fixed top-0 left-0 w-full h-[90px] flex items-center px-6 bg-[#16005d] text-white z-[1000]'>

      <div className="flex items-center gap-3 min-w-[350px]">
        <div className="flex items-center gap-[10px]">

          {/* 🔥 MAIN FIX HERE */}
          <Menu
            className="cursor-pointer !text-[32px]"
            onMouseEnter={onMenuEnter}
            onMouseLeave={onMenuLeave}
            onClick={onMenuClick}
          />

          <span className="text-[28px] font-semibold tracking-[1.2px] text-white">
            {title}
          </span>

        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-[#f1f1f1] px-[14px] py-[6px] rounded-[45px] w-[380px] h-[34px]">
          <Search className="!text-black !text-[28px]" />
          <input
            type="text"
            placeholder=' Search'
            className="border-none outline-none bg-transparent w-full text-black"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 justify-end min-w-[360px]">

        <img
          src="logo.jpeg"
          alt="College"
          className="h-[55px] w-[250px] mt-[10px] ml-[10px] mr-[20px] rounded-[6px]"
        />

        <HomeIcon
          onClick={handlehome}
          className="!text-[#f1f1f1] !text-[40px] ml-[5px] cursor-pointer hover:!text-[#bcd6ff]"
        />

        <Notification
          className="!text-[#f1f1f1] !text-[40px] ml-[5px] cursor-pointer hover:!text-[#bcd6ff]"
        />

        <img
          src="Profile.jpg"
          alt="Profile"
          onClick={handleProfileClick}
          className="w-[50px] h-[50px] rounded-full mt-[5px] cursor-pointer"
        />

        <LogoutIcon
          className="mt-[8px] !text-[#CA1111] !text-[30px] cursor-pointer hover:!text-[#ff0010]"
          onClick={() => navigate("/")}
        />

      </div>
    </div>
  )
}
