import React, { useState } from "react";
import CalendarData from "./CalendarData";
import ProfileData from "./ProfileData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProfCalender from "../Common/ProfCalender";

export default function StaffDashboard() {

  const name = ProfileData.find(i => i.label === "Name")?.value;
  const regNo = ProfileData.find(i => i.label === "Reg No")?.value;
  const dept = ProfileData.find(i => i.label === "Department")?.value;

  const hour = new Date().getHours();
  const greetings =
    hour < 12 ? "Good Morning" : hour < 16 ? "Good Afternoon" : "Good Evening";

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevMonth = () =>
    setCurrentIndex(currentIndex === 0 ? CalendarData.length - 1 : currentIndex - 1);

  const nextMonth = () =>
    setCurrentIndex(currentIndex === CalendarData.length - 1 ? 0 : currentIndex + 1);

  const scheduleData = [
    { subject: "DBMS", time: "10:00 AM to 11:00 AM" }
  ];

  return (
    <div className="w-full max-w-none p-4">

      <div className="bg-[#16005D] rounded-[10px] w-full min-h-[180px] p-[10px] mb-4 flex flex-col justify-center">
        <p className="text-white text-[33px] font-semibold ml-[40px]">
          {greetings}! {name}
        </p>
        <h3 className="text-white text-[25px] font-medium ml-[40px]">{regNo}</h3>
        <p className="text-white text-[17px] font-normal ml-[40px]">{dept} Department</p>
      </div>

      <div className="w-full mb-4">
        <div className="rounded-[14px] overflow-hidden shadow-sm">
          <ProfCalender />
        </div>
      </div>

      
    </div>
  );
}
