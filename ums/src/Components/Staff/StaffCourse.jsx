import React from 'react'
import { useNavigate } from "react-router-dom";
import courses from './Courses.js';

export default function StaffCourse() {

  const navigate = useNavigate();


  const handleClick = (course) => {
    navigate(`/staff-courses/${course.slug}`, {
      state: {
        subject: course.sub,
        dept: course.dept
      }
    });
  };


  return (
    <div className="p-[40px] min-h-[calc(100vh-90px)] bg-[#f6f7fb]">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[36px] py-[15px]'>
        {courses.map((course, index) => (
          <div className="relative h-[250px] rounded-[22px] overflow-hidden cursor-pointer bg-black shadow-[0_10px_26px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-[8px] hover:shadow-[0_18px_36px_rgba(0,0,0,0.3)] group" key={index} onClick={() => handleClick(course)}>
            <img src={course.image} alt={course.sub} className="w-full h-full object-cover block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,0,93,0.9)] to-[rgba(22,0,93,0.2)]"></div>

            <div className="absolute z-10 text-white px-[22px] bottom-[64px]">
              <h3 className="text-[24px] font-bold m-0">{course.sub}</h3>
              <p>{course.dept}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
