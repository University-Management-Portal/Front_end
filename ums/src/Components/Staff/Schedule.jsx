import React, { useState } from "react";

export default function Schedule() {

  const [view, setView] = useState("");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

 const activeStyle =
  "bg-white text-[#16005D] border-2 border-[#16005D]";

const normalStyle =
  "bg-[#16005D] text-white border-2 border-[#16005D]";


  return (
    <div className="p-12 min-h-[80vh] bg-[#f6f7fb]">

      <div className="flex gap-8 mb-10">

        <button
          onClick={() => setView("timetable")}
          className={`px-10 py-4 rounded-full text-[18px] font-semibold transition ${
            view === "timetable" ? activeStyle : normalStyle
          }`}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          TIME TABLE
        </button>

        <button
          onClick={() => setView("calendar")}
          className={`px-10 py-4 rounded-full text-[18px] font-semibold transition ${
            view === "calendar" ? activeStyle : normalStyle
          }`}
          style={{
            backgroundColor: hover2 ? "#ffffff" : "#16005d",
            color: hover2 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
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
