import React from "react";
import { useNavigate } from "react-router-dom";
import ProfCalender from "../Common/ProfCalender";

function StudentDashboard() {
  const navigate = useNavigate();

  const upcomingEvents = [
    "Continuous Internal Exam – I",
    "Model Lab – I",
    "Assignment – I",
    "Seminar Presentation",
    "Project Review – Phase 1",
    "Workshop on Cloud Computing",
    "Internal Assessment – II",
  ];

  return (
    <div className="w-full p-4 grid grid-cols-1 gap-4">

      <div className="w-full">
        <div className="bg-[#16005d] text-white p-6 rounded-[14px] min-h-[180px] flex flex-col justify-center">
          <h2 className="text-[32px] font-semibold tracking-[0.5px]">
            WELCOME, VARUN VIGNESH M (717823P359)
          </h2>
          <h5 className="text-[20px] font-normal opacity-90 mt-2">
            III year CSE - C
          </h5>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

        <div className="w-full">
          <div
            className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold"
            onClick={() => navigate("/student-attendance")}
          >
            Overall Attendance : <strong className="ml-1">91.5%</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Current Semester : <strong className="ml-1">6</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Current CGPA : <strong className="ml-1">8.34</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Tutor : <strong className="ml-1">DR. Xxxxxx AP/CSE</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Last Working Day : <strong className="ml-1">26.02.2026</strong>
          </div>
        </div>

        <div className="w-full">
          <div
            className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold"
            onClick={() => navigate("/student-courses")}
          >
            Enrolled Courses : <strong className="ml-1">7</strong>
          </div>
        </div>

      </div>

      <div className="w-full mb-4">
        <div className="rounded-[14px] overflow-hidden shadow-sm">
          <ProfCalender />
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white rounded-[14px] p-6 shadow-sm">
          <h5 className="text-[20px] font-semibold mb-3 border-b-2 border-[#ddd] pb-2">
            Upcoming Events
          </h5>

          <ul className="list-none p-0 m-0">
            {upcomingEvents.map((event, index) => (
              <li key={index} className="p-[12px_4px] text-[16px] border-b border-[#ccc] last:border-b-0">
                {event}
              </li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  );
}

export default StudentDashboard;
