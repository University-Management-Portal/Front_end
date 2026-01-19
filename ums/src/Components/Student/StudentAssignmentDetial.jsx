import React from 'react'
import { useParams } from 'react-router-dom'
import './StudentAssignmentDetial.css'
import Assignments from './AssignmentByCourse';

function StudentAssignmentDetial() {
    const { courseName, assignmentId } = useParams();

  const assignments = Assignments[courseName] || [];

  const assignment = assignments.find((a) => a.id === parseInt(assignmentId));

  if(!assignment) {
    return <div className='assign-empty'>Assignment not found</div>
  }

  return (
    <div className='assign-detial'>
        <p className='path'>Courses &gt; {courseName.replaceAll("-", " ")} &gt; Assignment &gt; {assignment.title}</p>

        <div className="assign-detail-card">
        <div className="assign-detail-header">
          <h2>{assignment.title}</h2>
          <span
            className={`status ${
              assignment.status === "Submitted" ? "submitted" : "pending"
            }`}
          >
            {assignment.status}
          </span>
        </div>

        <p className="assign-meta">
          Posted by <strong>{assignment.postBy}</strong>
        </p>
        <p className="assign-meta">
          Due date: <strong>{assignment.dueDate}</strong>
        </p>

        <div className="assign-desc">
          <p>{assignment.description}</p>
        </div>


        <div className='files'>

        {/* STAFF UPLOADED FILE */}
        {assignment.staffFile && (
        <div className="staff-file">
            <p className="staff-file-label">Assignment File :</p>
            <a href={"/uploads/dummy.pdf"} download className="download-btn"
            >
            Download PDF
            </a>
        </div>
        )}

        <div className="upload-box">
          <input type="file" />
          <button className="upload-btn">
            Save & Upload
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAssignmentDetial