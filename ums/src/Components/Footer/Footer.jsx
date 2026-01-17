import React from 'react'
import "./Footer.css"
import Phoneicon from "@mui/icons-material/Phone"
import Emailicon from "@mui/icons-material/Email"
import Facebook from "@mui/icons-material/Facebook"
import Xicon from "@mui/icons-material/X"
import Igicon from "@mui/icons-material/Instagram"
import Yticon from "@mui/icons-material/YouTube"
import Pintrest from "@mui/icons-material/Pinterest"
import Whatsapp from "@mui/icons-material/WhatsApp"
import Location from "@mui/icons-material/LocationOn"

function Footer() {
  return (
    <div className='footer'>
        <div className='footer-left'>
            <img src="University Logo.png" alt="College image" style={{borderRadius:"10px"}} />
            <p className='clgname'>BEST ENGINEERING COLLEGE</p>

            <div className='copy'>
            <p>Copyright © 2026 BEC. All rights reserved </p>
            </div>
        </div>
        <div className='footer-right'>
            {/* <img src="NBA.png" alt="nba" style={{borderRadius:"10px"}} /> */}
            <div className='footer-item'>
                <Location/><span>Myleripalayam Village, Othakkal Mandapam Post, Coimbatore - 641032, Tamilnadu, India</span>
            </div>
            <div className='footer-item'>
                <Phoneicon/><span>+91 9876543210</span>
            </div>
            <div className='footer-item'>
                <Emailicon/><span>info.best.ac.in</span>
            </div>
            <div className='footer-social'>
            <Facebook/>
            <Whatsapp/>
            <Igicon/>
            <Xicon/>
            <Yticon/>
            <Pintrest/>
            </div>
        </div>
        
    </div>
  )
}

export default Footer