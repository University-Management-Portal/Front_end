import React from 'react'
import { useParams } from 'react-router-dom'
import Assignments from './AssignmentByCourse';

function StudentAssignmentDetial() {
  const { courseName, assignmentId } = useParams();

  const assignments = Assignments[courseName] || [];

  const assignment = assignments.find((a) => a.id === parseInt(assignmentId));

  if (!assignment) {
    return <div className='mt-[40px] p-[40px] text-center bg-white rounded-[16px] text-[#0e0e0e] text-[16px]'>Assignment not found</div>
  }

  return (
    <div className='min-h-[calc(100vh-120px)] p-[32px_48px] bg-[#f6f7fb] flex flex-col'>
      <p className='text-[15px] text-black mb-[20px]'>Courses &gt; {courseName.replaceAll("-", " ")} &gt; Assignment &gt; {assignment.title}</p>

      <div className="bg-white rounded-[16px] p-[28px_32px] w-full shadow-[0_8px_22px_rgba(0,0,0,0.12)] mt-[12px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[28px] font-bold text-[#16005d] m-0">{assignment.title}</h2>
          <span
            className={`p-[6px_18px] rounded-[20px] text-[13px] font-semibold ${assignment.status === "Submitted" ? "bg-[#d4edda] text-[#155724]" : "bg-[#fff3cd] text-[#856404]"
              } `}
          >
            {assignment.status}
          </span>
        </div>

        <p className="mt-[12px] text-[15px] text-black">
          Posted by <strong>{assignment.postBy}</strong>
        </p>
        <p className="mt-[12px] text-[15px] text-black">
          Due date: <strong>{assignment.dueDate}</strong>
        </p>

        <div className="mt-[22px] text-[16px] text-black leading-[1.6]">
          <p>{assignment.description}</p>
        </div>


        <div className='mt-[32px] flex justify-between items-center flex-wrap'>

          {assignment.staffFile && (
            <div className="mt-[24px] flex items-center gap-[16px]">
              <p className="text-[15px] font-semibold text-black">Assignment File :</p>
              <a href={"/uploads/dummy.pdf"} download className="p-[8px_18px] rounded-[20px] no-underline font-semibold text-[14px] std-btn"
              >
                Download PDF
              </a>
            </div>
          )}

          <div className="mt-[28px] flex items-center gap-[6px]">
            <input type="file" className="text-[14px]" />
            <button className="p-[10px_22px] rounded-[25px] font-semibold text-[15px] std-btn">
              Save & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAssignmentDetial
