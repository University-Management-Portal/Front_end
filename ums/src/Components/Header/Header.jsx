import React from 'react'
import './Headers.css'
import Search from "@mui/icons-material/Search"
import Notification from "@mui/icons-material/Notifications"
import Dashboard from "@mui/icons-material/Dashboard"
export default function Header() {
  return (
    <div className='header'>

        <div className="header-left">
        <Dashboard/><p>Dashboard</p>
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
              <img src="Profile.jpg" alt="Profile-icon" width={50} height={50} style={{borderRadius:"50px", marginRight:"5px", marginTop:"5px"}}/>
          </div>
        </div>

    </div>
  )
}
