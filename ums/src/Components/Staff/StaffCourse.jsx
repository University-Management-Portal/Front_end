import React from 'react'
import './StaffCourses.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function StaffCourse() {

  const navigate = useNavigate();

  const courses = [
    { sub: "CS104 / Advanced Networking", dept: "III Year CSE C" },
    { sub: "CS101 / Database Management System", dept: "III Year CSE C" },
    { sub: "CS102 / Data Structure", dept: "III Year CSE C" },
    { sub: "CS104 / Advanced Networking", dept: "III Year CSE C" },
    { sub: "CS101 / Database Management System", dept: "III Year CSE C" },
    { sub: "CS102 / Data Structure", dept: "III Year CSE C" }
  ]

  const handleClick = (course) => {
    navigate("/staff-course", {
      state: {
        subject: course.sub,
        dept: course.dept
      }
    });
  };


  return (
    <div className="page">
      {courses.map((course, index) => (
        <div className="div" key={index} onClick={() => handleClick(course)} style={{cursor:"pointer"}}>
          
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
