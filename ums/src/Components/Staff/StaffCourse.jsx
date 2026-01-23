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
    <div
      className="course-card"
      key={index}
      onClick={() => handleClick(course)}
    >
      <div className="card-image">
        <img src={course.image} alt={course.sub} />
      </div>

      <div className="card-content">
        <div className="course-header">
          <h3>{course.sub}</h3>
        </div>
        
        <p className="dept">{course.dept}</p>
      </div>
    </div>
  ))}
</div>

  )
}
