import React from 'react'
import { useNavigate } from 'react-router-dom'
import './StudentCourses.css'
import courses from './Courses.js'

function StudentCourses() {

  const navigate = useNavigate()

  const handleClick=(course)=>{
    navigate(`/student-courses/${course.slug}`)
  }

  return (
    <div className="course-page">
      <div className='course-container'>
          {courses.map((course, index) => (
            <div className="course-card" key={index} onClick={() => handleClick(course)} style={{cursor:"pointer"}}>
              <img src={course.img} alt={course.sub}></img>
              <div className="course-header">
                <p>{course.sub}</p>
              </div>
              <div className='staff'>
                <p>{course.staff}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default StudentCourses