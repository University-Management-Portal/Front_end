import { useNavigate, useParams } from "react-router-dom";
import './StudentSeparateCourse.css';
export default function StudentSeparateCourse() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const handleClickAssignmnets = () => {
    navigate(`/student-courses/${courseName}/assignments`);
  }

  const handleClickMaterials = () => {
    navigate(`/student-courses/${courseName}/materials`);
  }
  
  return (
    <div className="course-detail-page">
      <p>Courses &gt; {courseName.replaceAll("-"," ")}</p>

      <div className="assignment" onClick={handleClickAssignmnets}>
        <p>ASSIGNMENTS</p>
      </div>  
      <div className="material" onClick={handleClickMaterials}>
        <p>MATERIALS</p>
      </div>
    </div>
  );  
}
