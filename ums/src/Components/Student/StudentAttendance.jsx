import React from 'react'
import './StudentAttendance.css'
import courses from './Courses'
import { useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';

function StudentAttendance() {

    const OverallAttendance = 91.5;
    const [activeTab,setActiveTAb] = useState("attendance");

    const getAttendanceClass=(value)=>{
        if(value < 75)
            return "low";
        return "high";
    }

  return (
    <div className='attendance-page'>
        <div className='attendance-left'>
            <button onClick={()=>{setActiveTAb("attendance")}} className={activeTab === "attendance" ? "ActiveTab" : " "}>Attendance</button>
            <button onClick={()=>{setActiveTAb("courseAttendance")}} className={activeTab === "courseAttendance" ? "ActiveTab" : " "}>Course Attendance</button>
        </div>

        <div className='attendance-right'>
            {activeTab === "attendance" && (
                <div className='attendance-Overall'>
                    
                    <div className="overall-attendance-card">
                        <p className="overall-label">Overall Attendance</p>
                        <p className="overall-value">{OverallAttendance}%</p>
                    </div>

                    <div className='attendance-rules'>
                        <h2>Attendance Rules & Regulations:</h2>
                        <ul>
                            <li><CircleIcon/>Minimum attendance required to appear for exams is 75%.</li>
                            <li><CircleIcon/>Attendance is calculated based on the total number of classes held and attended.</li>
                            <li><CircleIcon/>Students with attendance below 75% may be restricted from taking exams.</li>
                            <li><CircleIcon/>Medical certificates must be submitted for absences due to illness.</li>
                            <li><CircleIcon/>Attendance records are updated weekly; students should regularly check their status.</li>
                            <li><CircleIcon/>Excessive absenteeism may lead to disciplinary action as per college policies.</li>
                            <li><CircleIcon/>Students are encouraged to attend all classes to ensure academic success.</li>
                        </ul>
                    </div>
                </div>
            )}
            {activeTab === "courseAttendance" && (
                <div className='attendance-Course'>
                    {courses.map((course)=>(
                        <div className='course-attendance-card'>
                            <p className='course-name'>{course.name}</p>
                            <p className="course-attendance">Attendance : <span className={`course-attendance-${getAttendanceClass(course.attendance)}`} >{course.attendance}%</span></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default StudentAttendance