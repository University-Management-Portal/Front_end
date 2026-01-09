import React from 'react'
import './Headers.css'
import Search from "@mui/icons-material/Search"
import Notification from "@mui/icons-material/Notifications"
import Menu from "@mui/icons-material/Menu"
import PageTitles from "./PageTitles"
import { useLocation } from 'react-router-dom'

export default function Header({onMenuClick}) {
  const location = useLocation();
  const title = PageTitles[location.pathname] || "Dashboard"   
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
              <img src="Profile.jpg" alt="Profile-icon" width={50} height={50} style={{borderRadius:"50px", marginRight:"36px", marginTop:"5px"}}/>
          </div>
        </div>

    </div>
  )
}
