import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Materials from './MaterialByCourse.js'
import BookIcon from '@mui/icons-material/Description';

function StudentMaterial() {
  const { courseName } = useParams();

  const folders = Materials[courseName] || [];

  return (
    <div className='min-h-[calc(100vh-120px)] p-[32px_48px] bg-[#f6f7fb] max-md:p-[24px]'>
      <p className="text-[15px] text-black mb-[16px]">
        Courses &gt; {courseName.replaceAll("-", " ")} &gt; Material
      </p>

      <div className='bg-[url("/commen.jpg")] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] text-[38px] font-bold tracking-[0.8px] h-[180px] flex items-center max-md:text-[18px] max-md:p-[18px_20px]'>
        <p>{courseName.replaceAll("-", " ").toUpperCase()}</p>
      </div>

      {folders.length === 0 ? (
        <div className='mt-[40px] p-[40px] text-center bg-white rounded-[16px] text-[16px] text-black shadow-[0_6px_18px_rgba(0,0,0,0.08)]'>No Materials Found</div>
      ) : (
        folders.map((f) => (
          <div key={f.id} className='flex items-center gap-[14px] bg-[#e5e5e5] p-[16px_22px] rounded-[14px] mb-[14px] h-[70px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] max-md:p-[14px_18px]'>
            <BookIcon className='text-[28px] text-[#16005d]' style={{ fontSize: '28px', color: '#16005d' }} />
            <Link to={`/student-courses/${courseName}/materials/${f.id}`} className='no-underline text-[16px] font-semibold text-[#16005d] hover:underline max-md:text-[15px]'>
              {f.title} - Posted by {f.postedBy} on {f.date}
            </Link>
          </div>
        )
        ))}

    </div>
  )
}

export default StudentMaterial