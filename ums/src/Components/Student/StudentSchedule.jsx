import React, { useState } from "react";
import ProfileData from "./Studentdata";

export default function StudentSchedule() {

  const [view, setView] = useState("timetable");

  const studentYear = ProfileData.find(item => item.label === "Year")?.value;
  const studentDept = ProfileData.find(item => item.label === "Department")?.value;
  const studentSec = ProfileData.find(item => item.label === "Section")?.value;

  const schedules = JSON.parse(localStorage.getItem("schedules")) || [];

  const matchedSchedule = schedules.find(
    (item) =>
      item.year === studentYear &&
      item.department === studentDept &&
      item.section === studentSec &&
      item.status === true
  );

  return (
    <div className="p-12 min-h-[80vh] bg-[#ffffff]">

      <div className="flex gap-8 mb-10">
        <button
          onClick={() => setView("timetable")}
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: view === "timetable" ? "#16005d" : "#ffffff",
            color: view === "timetable" ? "#ffffff" : "#16005d",
            border: "1px solid #16005d"
          }}
        >
          TIME TABLE
        </button>

        <button
          onClick={() => setView("calendar")}
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: view === "calendar" ? "#16005d" : "#ffffff",
            color: view === "calendar" ? "#ffffff" : "#16005d",
            border: "1px solid #16005d"
          }}
        >
          ACADEMIC CALENDAR
        </button>
      </div>

      <div className="w-full bg-white rounded-[12px] p-6 shadow text-center">

        {!matchedSchedule && (
          <p className="text-red-500 font-semibold">
            No Schedule Available
          </p>
        )}

        {matchedSchedule && view === "timetable" && (
          <div>
            <h2 className="text-[24px] font-bold mb-4">Time Table</h2>
            <img
      src={matchedSchedule.timeTable}
      alt="Time Table"
      className="mx-auto max-w-[1100px] h-[500px] rounded-lg shadow-md"
    />
          </div>
        )}

        {matchedSchedule && view === "calendar" && matchedSchedule.academicCalendar && (
          <div>
            <h2 className="text-[24px] font-bold mb-4">Academic Calendar</h2>
            <img
      src={matchedSchedule.academicCalendar}
      alt="Academic Calendar"
      className="mx-auto max-w-[1100px] h-[500px] rounded-lg shadow-md"
    />
          </div>
        )}

      </div>
    </div>
  );
}
