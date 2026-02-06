import React, { useState } from 'react'
import StudentCourses from './StudentCourses'
import StudentInternalMark from './StudentInternalMark'

function StudentNavCourse() {

  const [activeTab, setActiveTab] = useState("courses");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    <div className="min-h-[calc(80vh-120px)] p-[32px_48px] bg-[#f6f7fb]">

      {/* TOP BUTTONS */}
      <div className="flex gap-[32px] mb-[30px]">

        <button
          onClick={() => setActiveTab("courses")}
          className={`
            px-[28px] py-[12px] rounded-[18px] font-semibold
            border border-[#16005d]
            ${activeTab === "courses"
              ? "bg-[#16005d] text-white"
              : "bg-white text-[#16005d] hover:bg-[#16005d] hover:text-white"}
            transition-all
          `}
          style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
        >
          COURSES
        </button>

        <button
          onClick={() => setActiveTab("marks")}
          className={`
            px-[28px] py-[12px] rounded-[18px] font-semibold
            border border-[#16005d]
            ${activeTab === "marks"
              ? "bg-[#16005d] text-white"
              : "bg-white text-[#16005d] hover:bg-[#16005d] hover:text-white"}
            transition-all
          `}
          style={{
              backgroundColor: hover2 ? "#ffffff" : "#16005d",
              color: hover2 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
        >
          INTERNAL MARK
        </button>

      </div>

      <div>
        {activeTab === "courses" && <StudentCourses />}
        {activeTab === "marks" && <StudentInternalMark />}
      </div>

    </div>
  )
}

export default StudentNavCourse;
