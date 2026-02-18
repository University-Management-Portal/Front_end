import React, { useState } from 'react'
import StudentCourses from './StudentCourses'
import StudentInternalMark from './StudentInternalMark'

function StudentNavCourse() {

  const [activeTab, setActiveTab] = useState("courses");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    <div className="min-h-[calc(80vh-120px)] p-[32px_48px] bg-[#ffffff]">

      <div className="flex gap-[32px] mb-[30px]">

        <button
        onClick={() => setActiveTab("courses")}
        onMouseEnter={() => setHover1(true)}
        onMouseLeave={() => setHover1(false)}
        style={{
          padding: "12px 28px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",

          backgroundColor:
            activeTab === "courses" || hover1
              ? "#16005d"
              : "#ffffff",

          color:
            activeTab === "courses" || hover1
              ? "#ffffff"
              : "#16005d",
        }}
      >
        COURSES
      </button>


        <button
        onClick={() => setActiveTab("marks")}
        onMouseEnter={() => setHover2(true)}
        onMouseLeave={() => setHover2(false)}
        style={{
          padding: "12px 28px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",

          backgroundColor:
            activeTab === "marks" || hover2
              ? "#16005d"
              : "#ffffff",

          color:
            activeTab === "marks" || hover2
              ? "#ffffff"
              : "#16005d",
        }}
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
