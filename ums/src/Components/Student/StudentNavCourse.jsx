import React from 'react'
import { Link} from "react-router-dom";
import './StudentNavCourse.css';
function StudentNavCourse() {
  return (
    <div className="course-nav-page">
      <div className="courses">
        <Link to={"/student-courses"} ><p>COURSES</p></Link>
      </div>  
      <div className="mark">
        <Link to={"/student-internalMarks"}><p>INTERNAL MARKS</p></Link>
      </div>
    </div>
  )
}

export default StudentNavCourse