import React from 'react'
import './StudentSchedule.css'
function StudentSchedule() {
  return (
    <div className='schedule'>
        <a href='/uploads/timetable.pdf' target='_blank' rel= "noopener noreferrer">
            <div className='tt'>
                TIME TABLE
            </div>
        </a>
        <a href='/uploads/academic_calendar.pdf' target='_blank' rel= "noopener noreferrer">
            <div className='ac'>
                ACADEMIC CALENDER
            </div>
        </a>
    </div>
  )
}

export default StudentSchedule