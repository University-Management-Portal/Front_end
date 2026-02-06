import React, { useState } from "react";
import courses from "./Courses";
import CircleIcon from "@mui/icons-material/Circle";

function StudentAttendance() {
  const OverallAttendance = 91.5;
  const [activeTab, setActiveTab] = useState("attendance");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const getAttendanceColor = (value) =>
    value < 75 ? "#d32f2f" : "#1e7e34";

  return (
    <div className="flex p-[40px] gap-[40px] min-h-[calc(100vh-80px)]">

      <div className="w-[220px] flex flex-col gap-[16px]">

        <button
          className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "attendance"
              ? "bg-[#16005d] text-white"
              : "bg-transparent hover:bg-[#d9d9d9]"
            }`}
          onClick={() => setActiveTab("attendance")}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          Attendance
        </button>

        <button
          className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "courseAttendance"
              ? "bg-[#16005d] text-white"
              : "bg-transparent hover:bg-[#d9d9d9]"
            }`}
          onClick={() => setActiveTab("courseAttendance")}
          style={{
            backgroundColor: hover2 ? "#ffffff" : "#16005d",
            color: hover2 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
        >
          Course Attendance
        </button>
      </div>

      <div className="flex-1 border-l-2 border-[#ddd] pl-[40px] text-[16px]">

        {activeTab === "attendance" && (
          <>
            <div
              className="w-[460px] bg-[#fffff]/70 rounded-[26px] p-[28px_34px] mb-[40px] shadow-[0_5px_3px_rgba(22,0,93,0.18)] flex flex-col gap-[10px]"
            >
              <p className="text-[16px] font-semibold text-black">
                Overall Attendance
              </p>
              <p
                className="font-extrabold text-[44px]"
                style={{
                  color: getAttendanceColor(OverallAttendance),
                }}
              >
                {OverallAttendance}%
              </p>
            </div>

            <div>
              <h2 className="mb-[12px] text-[26px] text-[#16005d] font-bold">
                Attendance Rules & Regulations:
              </h2>

              <ul className="pl-[20px] mt-[20px] list-none">
                {[
                  "Minimum attendance required to appear for exams is 75%.",
                  "Attendance is calculated based on the total number of classes held and attended.",
                  "Students with attendance below 75% may be restricted from taking exams.",
                  "Medical certificates must be submitted for absences due to illness.",
                  "Attendance records are updated weekly; students should regularly check their status.",
                  "Excessive absenteeism may lead to disciplinary action as per college policies.",
                  "Students are encouraged to attend all classes to ensure academic success.",
                ].map((rule, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-[14px] mb-[18px] leading-[1.6] text-[16px] text-black"
                  >
                    <CircleIcon
                      style={{
                        fontSize: "14px",
                        marginTop: "6px",
                        color: "#16005d",
                        flexShrink: 0,
                      }}
                    />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "courseAttendance" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px] w-full max-w-[1200px] items-stretch">
            {courses.map((course, index) => (
              <div
                className="bg-white rounded-[18px] p-[22px_26px] w-full h-[120px] shadow-[0_3px_4px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col gap-[10px] hover:-translate-y-[2px] hover:shadow-[0_5px_14px_rgba(0,0,0,0.16)] cursor-pointer"
                key={index}
              >
                <p className="text-[18px] font-bold text-[#16005d]">
                  {course.name}
                </p>
                <p className="text-[16px] font-medium text-[#333]">
                  Attendance :
                  <span
                    className="font-bold ml-1"
                    style={{
                      color: getAttendanceColor(course.attendance),
                    }}
                  >
                    {course.attendance}%
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentAttendance;
