import React from 'react'
import courses from './Courses'
import './StudentInternalMark.css'

function StudentInternalMark() {
  return (
    <div className="im-page">
      <div className='im-container'>
          {courses.map((course, index) => (
            <div className="im-card" key={index} style={{cursor:"pointer"}}>
              <div className="im-header">
                <p className='im-title'>{course.sub}</p>
                <p className="im-mark">Internal Mark :<span className={`im-mark-${course.mark < 20 ? "min" : "max"}`}> {course.mark}.0</span></p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default StudentInternalMark