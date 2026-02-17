import React from "react";
import CalendarData from "./CalendarData";
import ProfileData from "./ProfileData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProfCalender from "../Common/ProfCalender";

export default function StaffDashboard() {

  const name = ProfileData.find(i => i.label === "Name")?.value;
  const regNo = ProfileData.find(i => i.label === "Reg No")?.value;
  const dept = ProfileData.find(i => i.label === "Department")?.value;


  

  return (
    <div className="w-full max-w-none p-4">

      <div className="bg-[#16005D] rounded-[10px] w-full min-h-[180px] p-[10px] mb-4 flex flex-col justify-center">
        <p className="text-white text-[34px] font-semibold ml-[40px]">
           {name}
        </p>
        <h3 className="text-white text-[26px] font-medium ml-[40px]">{regNo}</h3>
        <p className="text-white text-[18px] font-normal ml-[40px]">{dept} Department</p>
      </div>

      <div className="w-full mb-4">
        <div className="rounded-[14px] overflow-hidden shadow-sm">
          <ProfCalender />
        </div>
      </div>

      
    </div>
  );
}
