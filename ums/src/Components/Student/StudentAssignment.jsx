import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './StudentAssignment.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Assignments from './AssignmentByCourse';

function StudentAssignment() {
  const { courseName } = useParams();

  const assignments = Assignments[courseName] || [];

  return (
    <div className="assignment-page">
      <p className="path">
        Courses &gt; {courseName.replaceAll("-", " ")} &gt; Assignments
      </p>

      <h2 className="assignment-title">Assignments</h2>

      {assignments.length === 0 ? (
        <div className="assign-empty">
          <p>No assignments assigned</p>
        </div>
      ) : (
         assignments.map((a) => (
        <div key={a.id} className='assign-card'>
            <div className='assign-left'>
                <AssignmentIcon className='assign-icon' />
                <Link to={`/student-courses/${courseName}/assignments/${a.id}`} className='assign-link'>
                    {a.postBy} posted a new assignment : {a.title}
                </Link>
            </div>
            <p className='duedate'>Due Date : {a.dueDate}</p>
        </div>))
      )}
    </div>
  );
}

export default StudentAssignment;
