import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function StudentSchedule() {

  const [view, setView] = useState("timetable");
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const userRes = await axiosInstance.get(`/users/${userId}`);
      const profile = userRes.data;

      const schedRes = await axiosInstance.get('/academic/schedules');

      const matched = schedRes.data.find(s =>
        s.department === profile.department &&
        s.section === profile.section &&
        s.enabled === true
      );

      if (matched) setSchedule(matched);
    } catch (err) {
      console.error(err);
    }
  };

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

        {!schedule && (
          <p className="text-red-500 font-semibold mt-10 text-[18px]">
            No Schedule Available Or Assigned
          </p>
        )}

        {schedule && view === "timetable" && (
          <div>
            <h2 className="text-[24px] font-bold mb-4">Time Table</h2>
            <img
              src={schedule.timetableUrl}
              alt="Time Table"
              className="mx-auto max-w-[1100px] h-[500px] rounded-lg shadow-md object-contain cursor-pointer"
              onClick={() => window.open(schedule.timetableUrl, "_blank")}
            />
          </div>
        )}

        {schedule && view === "calendar" && schedule.calendarUrl && (
          <div>
            <h2 className="text-[24px] font-bold mb-4">Academic Calendar</h2>
            <img
              src={schedule.calendarUrl}
              alt="Academic Calendar"
              className="mx-auto max-w-[1100px] h-[500px] rounded-lg shadow-md object-contain cursor-pointer"
              onClick={() => window.open(schedule.calendarUrl, "_blank")}
            />
          </div>
        )}

      </div>
    </div>
  );
}
