import React from 'react'
import "./LHeader.css"
import Phoneicon from "@mui/icons-material/Phone"
import Emailicon from "@mui/icons-material/Email"
import Facebook from "@mui/icons-material/Facebook"
import Xicon from "@mui/icons-material/X"
import Igicon from "@mui/icons-material/Instagram"
import Yticon from "@mui/icons-material/YouTube"
export default function LHeader() {
  return (
    <div className='lheader'>
        <div className='header-left'>
        <img src='Logo BG removed.png'></img>
        <p>BEST ENGINEERING <br/>COLLEGE</p>
        </div>

        <div className='header-right'>
            <span><Phoneicon/> +91 9876543210</span>
            <span><Emailicon/> info.best.ac.in</span>
            <Facebook/> 
            <Igicon/>
            <Xicon/>
            <Yticon/>
        </div>


    </div>
  )
}
