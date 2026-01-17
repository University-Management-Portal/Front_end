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
          {courses.map((course, index) => (
            <div className="course-card" key={index} onClick={() => handleClick(course)} style={{cursor:"pointer"}}>
              
              <div className="course-header">
                <p>{course.sub}</p>
                <p className="credits">credits : {course.credits}.0</p>
              </div>
            </div>
          ))}
    </div>
  )
}

export default StudentCourses