import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

function ProfCalender() {

  const user = localStorage.getItem("userType")
  const [hover, setHover] = useState(false);

  const [events, setEvents] = useState([
    { title: "Exam", date: "2026-01-28" },
    { title: "Holiday", date: "2026-01-30" }
  ])

  const addEvent = () => {
    const title = prompt("Enter event title")
    const date = prompt("Enter date (YYYY-MM-DD)")

    if (title && date) {
      setEvents(prev => [...prev, { title, date }])
    }
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] p-[15px] bg-transparent box-border [&_.fc]:h-full [&_.fc]:bg-white [&_.fc]:rounded-[10px] [&_.fc]:p-[10px] [&_.fc-toolbar]:mb-[15px] [&_.fc-toolbar-title]:text-[22px] [&_.fc-toolbar-title]:font-semibold [&_.fc-daygrid-day]:cursor-pointer [&_.fc-daygrid-day:hover]:bg-[#f0f8ff] [&_.fc-event]:text-[13px] [&_.fc-event]:p-[3px] [&_.fc-event]:rounded-[6px] [&_.fc-day-today]:bg-[rgba(0,123,255,0.1)] [&_.fc-today-button]:bg-[#16005d] [&_.fc-today-button]:text-white [&_.fc-today-button]:rounded-[20px] [&_.fc-prev-button]:rounded-full [&_.fc-next-button]:rounded-full">
      <h2 className="text-[28px] mb-[20px]">Calendar</h2>

      <div className="flex justify-between items-center mb-[15px]">
        {user === "admin" && (
          <button className="std-btn p-[10px_18px] text-[14px] rounded-[8px]" onClick={addEvent}
          style={{
              backgroundColor: hover ? "#ffffff" : "#16005d",
              color: hover ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            + Add Event
          </button>
        )}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={false}
        editable={false}
      />
    </div>
  )
}

export default ProfCalender
