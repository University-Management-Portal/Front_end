import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function Schedule() {

  const [view, setView] = useState("timetable");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const [activeSchedule, setActiveSchedule] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const regNo = localStorage.getItem("userRegNo");
      if (!regNo) return;
      const res = await axiosInstance.get(`/academic/schedules/faculty/${regNo}`);
      const enabled = res.data.filter(s => s.enabled);
      setSchedules(enabled);
      setActiveSchedule(enabled.length > 0 ? enabled[0] : null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-12 min-h-[80vh] bg-[#ffffff]">

      <div className="flex gap-8 mb-10">

        <button
          onClick={() => setView("timetable")}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",

            backgroundColor:
              view === "timetable" || hover1
                ? "#16005d"
                : "#ffffff",

            color:
              view === "timetable" || hover1
                ? "#ffffff"
                : "#16005d",
          }}
        >
          TIME TABLE
        </button>


        <button
          onClick={() => setView("calendar")}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",

            backgroundColor:
              view === "calendar" || hover2
                ? "#16005d"
                : "#ffffff",

            color:
              view === "calendar" || hover2
                ? "#ffffff"
                : "#16005d",
          }}
        >
          ACADEMIC CALENDAR
        </button>


      </div>

      <div className="w-full bg-white rounded-[12px] p-6 shadow">

        {!activeSchedule && (
          <p className="text-gray-500 text-center text-lg mt-10">
            No schedule assigned to you yet
          </p>
        )}

        {activeSchedule && view === "timetable" && (
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold mb-4">Time Table</h2>

            <img
              src={activeSchedule.timetableUrl}
              className="w-[85%] object-contain cursor-pointer"
              alt="time table"
              onClick={() => window.open(activeSchedule.timetableUrl, "_blank")}
            />
          </div>
        )}

        {activeSchedule && view === "calendar" && activeSchedule.calendarUrl && (
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold mb-4">Academic Calendar</h2>

            <img
              src={activeSchedule.calendarUrl}
              className="w-[85%] object-contain cursor-pointer"
              alt="calendar"
              onClick={() => window.open(activeSchedule.calendarUrl, "_blank")}
            />
          </div>
        )}

        {activeSchedule && view === "" && (
          <p className="text-gray-500 text-center mt-10">
            Click any button to view content
          </p>
        )}

      </div>
    </div >
  );
}
