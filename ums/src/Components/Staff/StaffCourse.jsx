import React from 'react'
import './StaffCourses.css'

export default function StaffCourse() {

    const courses = [
    { sub: "CS104 / Advanced Networking", dept: "III Year CSE C" },
    { sub: "CS101 / Database Management System", dept: "III Year CSE C" },
    { sub: "CS102 / Data Structure", dept: "III Year CSE C" },
    { sub: "CS104 / Advanced Networking", dept: "III Year CSE C" },
    { sub: "CS101 / Database Management System", dept: "III Year CSE C" },
    { sub: "CS102 / Data Structure", dept: "III Year CSE C" }
  ]
    
  return (
    <div className="page">

      {courses.map((course,index)=>(
        <div className="div" key={index}>
                <h2 className='sub'>{course.sub}</h2>
                <p className='dept'>{course.dept}</p>
            </div>
      ))}

    </div>
  )
}
