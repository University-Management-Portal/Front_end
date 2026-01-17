import React from 'react'
import courses from './Courses'
import './StudentInternalMark.css'

function StudentInternalMark() {
  return (
    <div className="im-page">
          {courses.map((course, index) => (
            <div className="im-card" key={index} style={{cursor:"pointer"}}>
              <div className="im-header">
                <p>{course.sub}</p>
                <p className="im-mark">Internal Mark : {course.mark}.0</p>
              </div>
            </div>
          ))}
    </div>
  )
}

export default StudentInternalMark