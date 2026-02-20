import React from 'react'
import Phoneicon from "@mui/icons-material/Phone"
import Emailicon from "@mui/icons-material/Email"
import Facebook from "@mui/icons-material/Facebook"
import Xicon from "@mui/icons-material/X"
import Igicon from "@mui/icons-material/Instagram"
import Yticon from "@mui/icons-material/YouTube"
export default function LHeader() {
  return (
    <div className='flex justify-between items-center p-[10px_40px] bg-gradient-to-r from-[#e3f2f5] to-[#b2d8e5] box-border absolute top-0 left-0 w-full z-[1000] opacity-60'>
      <div className='flex items-center gap-[12px]'>
        <img src='Logo BG removed.png' className="w-[70px] h-[70px] object-contain"></img>
        <p className='m-0 text-[22px] font-bold text-[#16005d] tracking-[0.4px] leading-[1.3]'>BEST ENGINEERING <br />COLLEGE</p>
      </div>

      <div className='flex items-center gap-[20px] text-[14px] text-black'>
        <span className="flex items-center gap-[6px] whitespace-nowrap hover:text-[#16005d]"><Phoneicon className='text-[22px] cursor-pointer hover:text-[#16005d]' /> +91 9876543210</span>
        <span className="flex items-center gap-[6px] whitespace-nowrap hover:text-[#16005d]"><Emailicon className='text-[22px] cursor-pointer hover:text-[#16005d]' /> info.best.ac.in</span>
        <div className='flex gap-[20px] [&_svg]:text-[22px] [&_svg]:cursor-pointer [&_svg:hover]:text-[#16005d]'>
          <Facebook />
          <Igicon />
          <Xicon />
          <Yticon />
        </div>
      </div>


    </div>
  )
}
