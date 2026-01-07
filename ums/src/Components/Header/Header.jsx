import React from 'react'
import './Headers.css'

export default function Header() {
  return (
    <div className='header'>

        <div className="header-left">
        <h2>Dashboard</h2>
        </div>
        
        <div className="header-center">
        <div className="search-box">
            <input type="text" placeholder='🔍 Search'/>
        </div>
        </div>

        <div className="header-right">
        <div className="college-image">
            <img src="logo.jpeg" alt="College Image" width={220} height={45} style={{borderRadius:"8px"}}/>
        </div>

        <span className='icon'>🔔</span>
        <div className="Profile">
            <img src="Profile.jpg" alt="Profile-icon" width={50} height={50} style={{borderRadius:"50px", marginRight:"50px", marginTop:"12px"}}/>
        </div>
        </div>

    </div>
  )
}
