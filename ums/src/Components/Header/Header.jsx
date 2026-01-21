import React from 'react'
import './Headers.css'
import Search from "@mui/icons-material/Search"
import Notification from "@mui/icons-material/Notifications"
import Menu from "@mui/icons-material/Menu"
import PageTitles from "./PageTitles"
import { useLocation,useNavigate } from 'react-router-dom'

export default function Header({onMenuClick}) {
  const navigate = useNavigate();
  const location = useLocation();
  let title = PageTitles[location.pathname] 

  if (!title && location.pathname.startsWith("/student-courses")) {
    title = "Courses"
  }

  if (!title && location.pathname.startsWith("/staff-course")) {
    title = "Courses"
  }

  if(!title){
    title="not found"
  }

  return (
    <div className='header'>
        <div className="header-left">
          <div className="header-title">
            <Menu onClick={onMenuClick} style={{ cursor: "pointer" }} />
            <span>{title}</span>
          </div>
        </div>
        
        <div className="header-center">
        <div className="search-box">
            <Search/><input type="text" placeholder=' Search'/>
        </div>
        </div>

        <div className="header-right">
          <div className="college-image">
              <img src="logo.jpeg" alt="College Image" width={220} height={45} style={{borderRadius:"6px"}}/>
          </div>

          <Notification color='#ffffffff'/>
          <div className="Profile">
              <img src="Profile.jpg" alt="Profile-icon" onClick={() => navigate("/staff-profile")} width={50} height={50} style={{borderRadius:"50px", marginRight:"36px", marginTop:"5px"}} />
          </div>
        </div>

    </div>
  )
}
