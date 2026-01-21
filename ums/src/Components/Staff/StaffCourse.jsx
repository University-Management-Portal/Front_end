import React from 'react'
import './StaffCourses.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import courses from './Courses.js';

export default function StaffCourse() {

  const navigate = useNavigate();


  const handleClick = (course) => {
    navigate(`/staff-courses/${course.slug}`, {
      state: {
        subject: course.sub,
        dept: course.dept
      }
    });
  };


  return (
    <div className="page">
      {courses.map((course, index) => (
        <div className="carts" key={index} onClick={() => handleClick(course)} style={{cursor:"pointer"}}>
          
          <div className="course-header">
            <h2 className="sub">{course.sub}</h2>
            <BsThreeDotsVertical className="menu-icon" />
          </div>

          <p className="dept" style={{ color: "#16005D", fontSize: "20px", fontWeight: "600", marginLeft: "2px" }}>{course.dept}</p>
        </div>
      ))}
    </div>
  )
}
