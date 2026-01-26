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
    <div className='course-containers'>
  {courses.map((course, index) => (
    <div className="course-cart" key={index} onClick={() => handleClick(course)}>
        <img src={course.image} alt={course.sub} />

      <div className="card-content">
          <h3>{course.sub}</h3>
          <p>{course.dept}</p>
      </div>
    </div>
  ))}
  </div>
</div>

  )
}
