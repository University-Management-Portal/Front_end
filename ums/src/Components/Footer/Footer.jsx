import React from 'react'
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
        <div className='relative flex justify-between items-start bg-[#16005d] text-white p-[25px_40px] w-full box-border max-md:flex-col max-md:gap-[20px] max-md:text-center max-md:items-center'>
            <div className='flex items-center gap-[12px] max-md:justify-center'>
                <img src="University Logo.png" alt="College image" className="w-[75px] h-[75px] rounded-[10px]" />
                <p className='text-[24px] font-semibold tracking-[1.2px]'>BEST ENGINEERING COLLEGE</p>

                <div className='absolute bottom-[12px] left-1/2 -translate-x-1/2 text-[13px] font-light text-[#f3f3f3] whitespace-nowrap text-center'>
                    <p>Copyright © 2026 BEC. All rights reserved </p>
                </div>
            </div>
            <div className='flex flex-col gap-[10px] max-w-[420px] max-md:items-center'>
                {/* <img src="NBA.png" alt="nba" style={{borderRadius:"10px"}} /> */}
                <div className='flex items-start gap-[8px] text-[14px] max-md:justify-center'>
                    <Location className="text-[20px] shrink-0" /><span>Myleripalayam Village, Othakkal Mandapam Post, Coimbatore - 641032, Tamilnadu, India</span>
                </div>
                <div className='flex items-start gap-[8px] text-[14px] max-md:justify-center'>
                    <Phoneicon className="text-[20px] shrink-0" /><span>+91 9876543210</span>
                </div>
                <div className='flex items-start gap-[8px] text-[14px] max-md:justify-center'>
                    <Emailicon className="text-[20px] shrink-0" /><span>info.best.ac.in</span>
                </div>
                <div className='flex gap-[15px] mt-[10px] [&_svg]:text-[26px] [&_svg]:cursor-pointer [&_svg:hover]:text-[#bcd6ff]'>
                    <Facebook />
                    <Whatsapp />
                    <Igicon />
                    <Xicon />
                    <Yticon />
                    <Pintrest />
                </div>
            </div>

        </div>
    )
}

export default Footer