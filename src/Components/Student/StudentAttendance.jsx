import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import CircleIcon from "@mui/icons-material/Circle";
import AttendanceRules from "./AttendanceRules";

function StudentAttendance() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const [overall, setOverall] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const regNo = localStorage.getItem("userRegNo");
      if (!regNo) return;

      const overallRes = await axiosInstance.get(`/academic/attendance/overall/${encodeURIComponent(regNo)}`);
      setOverall(overallRes.data);

      const coursesRes = await axiosInstance.get(`/academic/attendance/courses/${encodeURIComponent(regNo)}`);
      setCourses(coursesRes.data);
    } catch (err) {
      console.error("Failed to fetch student attendance", err);
    }
  };

  const getAttendanceColor = (value) =>
    value < 75 ? "#d32f2f" : "#1e7e34";

  return (
    <div className="flex p-[40px] gap-[40px] min-h-[calc(100vh-80px)]">

      <div className="w-[220px] flex flex-col gap-[16px]">

        <button
          onClick={() => setActiveTab("attendance")}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            padding: "12px 18px",
            borderRadius: "18px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.3s",
            width: "100%",

            backgroundColor:
              activeTab === "attendance" || hover1
                ? "#16005d"
                : "#ffffff",

            color:
              activeTab === "attendance" || hover1
                ? "#ffffff"
                : "#16005d",
          }}
        >
          Attendance
        </button>


        <button
          onClick={() => setActiveTab("courseAttendance")}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          style={{
            padding: "12px 18px",
            borderRadius: "18px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.3s",

            backgroundColor:
              activeTab === "courseAttendance" || hover2
                ? "#16005d"
                : "#ffffff",

            color:
              activeTab === "courseAttendance" || hover2
                ? "#ffffff"
                : "#16005d",
          }}
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
                  color: getAttendanceColor(overall),
                }}
              >
                {overall}%
              </p>
            </div>

            <div>
              <h2 className="mb-[12px] text-[26px] text-[#16005d] font-bold">
                Attendance Rules & Regulations:
              </h2>

              <ul className="pl-[20px] mt-[20px] list-none">
                {AttendanceRules.map((rule, index) => (
                  <li
                    key={index}
                    className="mb-[12px] flex items-start gap-[10px]"
                  >
                    <CircleIcon style={{ color: "#16005d", fontSize: "12px" }}
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
            {courses.length > 0 ? courses.map((course, index) => (
              <div
                className="bg-white rounded-[18px] p-[22px_26px] w-full h-[120px] shadow-[0_3px_4px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col gap-[10px] hover:-translate-y-[2px] hover:shadow-[0_5px_14px_rgba(0,0,0,0.16)] cursor-pointer"
                key={index}
              >
                <p className="text-[18px] font-bold text-[#16005d]">
                  {course.courseName}
                </p>
                <p className="text-[16px] font-medium text-[#333]">
                  Attendance :
                  <span
                    className="font-bold ml-1"
                    style={{
                      color: getAttendanceColor(course.attendancePercentage),
                    }}
                  >
                    {course.attendancePercentage}%
                  </span>
                </p>
              </div>
            )) : <p>No course attendance recorded yet.</p>}
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentAttendance;
