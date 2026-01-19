import React from 'react'
import { useNavigate} from "react-router-dom";
import './StudentNavCourse.css';
function StudentNavCourse() {
  const navigate = useNavigate();

  const handleClickCourses =() =>{
    navigate("/student-courses");
  }
  const handleClickMarks =() =>{
    navigate("/student-internalMarks");
  }

  return (
    <div className="course-nav-page">
      <div className="courses" onClick={handleClickCourses}>
        <p>COURSES</p>
      </div>  
      <div className="mark" onClick={handleClickMarks}>
        <p>INTERNAL MARKS</p>
      </div>
    </div>
  )
}

export default StudentNavCourse