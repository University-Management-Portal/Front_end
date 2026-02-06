import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Assignments from './AssignmentByCourse';

function StudentAssignment() {
  const { courseName } = useParams();

  const assignments = Assignments[courseName] || [];

  return (
    <div className="min-h-[calc(100vh-120px)] p-[32px_48px] bg-[#f6f7fb]">
      <p className="text-[15px] text-black mb-[16px]">
        Courses &gt; {courseName.replaceAll("-", " ")} &gt; Assignments
      </p>

      <h2 className="text-[28px] font-bold text-[#16005d] mb-[28px]">Assignments</h2>

      {assignments.length === 0 ? (
        <div className="mt-[40px] p-[40px] text-center bg-white rounded-[16px] text-[#0e0e0e] text-[16px]">
          <p>No assignments assigned</p>
        </div>
      ) : (
        assignments.map((a) => (
          <div key={a.id} className='bg-[#e6e6e6] rounded-[14px] p-[18px_22px] mb-[18px] cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]'>
            <div className='flex items-start gap-[14px]'>
              <AssignmentIcon className='text-[32px] text-[#16005d] mt-[2px]' style={{ fontSize: '32px', color: '#16005d' }} />
              <Link to={`/student-courses/${courseName}/assignments/${a.id}`} className='text-[16px] font-semibold text-[#16005d] no-underline leading-[1.4] hover:underline'>
                {a.postBy} posted a new assignment : {a.title}
              </Link>
            </div>
            <p className='text-[13px] text-[#555] mt-[6px] pl-[46px]'>Due Date : {a.dueDate}</p>
          </div>))
      )}
    </div>
  );
}

export default StudentAssignment;
