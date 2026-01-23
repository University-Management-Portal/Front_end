import React from 'react'
import "./StudentDashboard.css"
import { NavLink, useNavigate } from 'react-router-dom';

function StudentDashboard() {
    const navigate = useNavigate();
    const upcomingEvents = [
        "Continuous Internal Exam – I",
        "Model Lab – I",
        "Assignment – I",
        "Seminar Presentation",
        "Project Review – Phase 1",
        "Workshop on Cloud Computing",
        "Internal Assessment – II",
    ];

  return (
    <div className='dashboard'>
        <div className='profile-card'>
            <p>WELCOME,VARUN VIGNESH M(717823P359)</p>
            <p>III year CSE-C</p>
        </div>
        <div className='card' onClick={()=>{navigate("/student-attendance")}}>
            <p>Overall Attendance :  91.5%</p>
        </div>
        <div className='card'>
            <p>Current Semester  : 6</p>
        </div>
        <div className='card'>
            <p> Current CGPA : 8.34</p>
        </div>
        <div className='card'>
            <p>Tutor : DR.Xxxxxx  AP/CSE</p>
        </div>
        <div className='card'>
            <p>Last Working Day  : 26.02.2026</p>
        </div>
        <div className='card' onClick={()=>{navigate("/student-courses")}}>
            <p>Enrolled Courses : 7</p>
        </div>

        <div className="events-card">
            <h3 className="events-title">Upcoming Events</h3>

            <ul className="events-list">
                {upcomingEvents.map((event, index) => (
                <li key={index}>{event}</li>
                ))}
            </ul>
        </div>

    </div>
  )
}

export default StudentDashboard