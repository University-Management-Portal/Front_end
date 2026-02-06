import React from 'react'
import { useParams } from 'react-router-dom'
import Materials from './MaterialByCourse.js'
import BookIcon from '@mui/icons-material/Description';

function StudentMaterialDetial() {
    const { courseName, folderId } = useParams();

    const folders = Materials[courseName] || [];
    const folder = folders.find(f => f.id === folderId);
    return (
        <div className='min-h-[calc(100vh-120px)] p-[32px_48px] bg-[#f6f7fb] max-md:p-[24px]'>
            <p className="text-[15px] text-black mb-[18px]">
                Courses &gt; {courseName.replaceAll("-", " ")} &gt; Material &gt; {folder ? folder.title : 'Not Found'}
            </p>

            <p className='text-[26px] font-bold text-[#16005d] mb-[22px] max-md:text-[22px]'>{folder.title}</p>

            {folder.files.length === 0 ? (
                <div className='mt-[40px] p-[36px] text-center bg-white rounded-[16px] text-[16px] text-black shadow-[0_6px_18px_rgba(0,0,0,0.08)]'>No Files</div>
            ) : (
                folder.files.map((f) => (
                    <div key={f.id} className='flex items-center gap-[14px] bg-[#e5e5e5] p-[16px_22px] rounded-[14px] mb-[14px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] max-md:p-[14px_18px]'>
                        <BookIcon className='text-[28px] text-[#16005d]' style={{ fontSize: '28px', color: '#16005d' }} />
                        <a href={"/uploads/dummy2.pdf"} target="_blank" rel="noopener noreferrer" className="no-underline text-[#16005d] text-[16px] font-semibold flex items-center hover:underline">
                            <span className='cursor-pointer max-md:text-[15px]'>{f.name}</span>
                        </a>
                    </div>
                ))
            )}
        </div>
    )
}

export default StudentMaterialDetial