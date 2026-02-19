import React, { useState } from "react";

export default function StudentSchedule() {

  const [view, setView] = useState("timetable");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);


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
            fontSize: "16px",
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
            fontSize: "16px",
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

        {view === "timetable" && (
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold mb-4">Time Table</h2>

            <img
              src="time_table.png"
              className="w-[85%] object-contain"
              alt="time table"
            />
          </div>
        )}

        {view === "calendar" && (
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold mb-4">Academic Calendar</h2>

            <img
              src="acd_cal.png"
              className="w-[85%] object-contain"
              alt="calendar"
            />
          </div>
        )}

        {view === "" && (
          <p className="text-gray-500 text-center">
            Click any button to view content
          </p>
        )}

      </div>
    </div>
  );
}
