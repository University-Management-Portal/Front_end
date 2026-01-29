import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import "./ProfCalender.css"

function ProfCalender() {

  const user = localStorage.getItem("userType")

  const [events,setEvents] = useState([
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
    <div className="calendar-wrapper">
      <h2>Calendar</h2>

      <div className="calendar-header">
        {user === "admin" && (
          <button className="add-event-btn" onClick={addEvent}>
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
