import React from 'react'
import './StaffSeparateCourses.css'
import { useLocation } from "react-router-dom";

export default function StaffSeparateCourse() {
2
    const location = useLocation();
    const { subject, dept } = location.state || {};

  return (
    <div className="separate-course">

        <div className="course-title">
            <h2>{subject}</h2>
            <p>{dept}</p>
      </div>


      <div className="cart">

        <div className="Assignments">
        <p className='word'>ASSIGNMENTS</p>
        </div>

        <div className="Material">
        <p className='word'>MATERIALS</p>
        </div>
      </div>

    </div>
  )
}
