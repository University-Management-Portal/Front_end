import React from 'react'
import './StaffSeparateCourses.css'
import { useLocation, useNavigate,useParams } from "react-router-dom";


export default function StaffSeparateCourse() {

  const location = useLocation();
  const navigate = useNavigate();
  const {courseName} = useParams();

  const { subject, dept } = location.state || {};

  const handleAssignmentClick = () => {
    navigate(`/staff-courses/${courseName.courseName}/assignment`, {
      state: { subject, dept }
    });
  };

  return (
    <div className="separate-course">

      <div className="course-title">
        <p className="title"> 
          {subject} / {dept} / Assignment
        </p>
      </div>

      <div className="cart">

        {/* ASSIGNMENTS */}
        <div className="Assignments" onClick={handleAssignmentClick}>
          <p className='word'>ASSIGNMENTS</p>
        </div>

        {/* MATERIALS */}
        <div className="Material">
          <p className='word'>MATERIALS</p>
        </div>

      </div>

    </div>
  )
}
