import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";


export default function StaffSeparateCourse() {

  const location = useLocation();
  const navigate = useNavigate();
  const { courseName } = useParams();

  const { subject, dept } = location.state || {};

  const handleAssignmentClick = () => {
    navigate(`/staff-courses/${courseName}/assignment`, {
      state: { subject, dept }
    });
  };

  const handleMaterialClick = () => {
    navigate(`/staff-courses/${courseName}/material`, {
      state: { subject, dept }
    });
  };



  return (
    <div className="min-h-[calc(80vh-120px)] p-[32px_48px] bg-[#f6f7fb]">

      <p className="text-[20px] text-[#16005D] mb-[24px]">
        {dept} / {subject}
      </p>

      <div className="inline-flex items-center w-[420px] h-[180px] rounded-[18px] cursor-pointer text-[25px] font-bold tracking-[1px] transition-all duration-250 border-[0.2px] border-[#16005D] text-black justify-end pr-[42px] bg-[url('/assignment-banner.jpg')] bg-cover bg-center bg-no-repeat mr-[40px] hover:-translate-y-[6px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]" onClick={handleAssignmentClick}>
        <p className="m-0">ASSIGNMENTS</p>
      </div>
      <div className="inline-flex items-center w-[420px] h-[180px] rounded-[18px] cursor-pointer text-[25px] font-bold tracking-[1px] transition-all duration-250 border-[0.2px] border-[#16005D] text-black justify-start pl-[42px] bg-[url('/material.jpg')] bg-cover bg-center bg-no-repeat hover:-translate-y-[6px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]" onClick={handleMaterialClick}>
        <p className="m-0">MATERIALS</p>
      </div>
    </div>
  )
}