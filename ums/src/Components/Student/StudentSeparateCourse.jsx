import { Link, useParams } from "react-router-dom";
import './StudentSeparateCourse.css';
export default function StudentSeparateCourse() {
  const { courseName } = useParams();

  return (
    <div className="course-detail-page">
      <p>Courses &gt; {courseName.replaceAll("-"," ")}</p>

      <div className="assignment">
        <Link to={`/student-courses/${courseName}/assignments`} ><p>ASSIGNMENTS</p></Link>
      </div>  
      <div className="material">
        <Link to={`/student-courses/${courseName}/materials`}><p>MATERIALS</p></Link>
      </div>
    </div>
  );  
}
