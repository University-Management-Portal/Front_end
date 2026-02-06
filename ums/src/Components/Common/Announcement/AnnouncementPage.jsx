import React, { useState } from 'react'
import CreateAnnouncement from './CreateAnnouncement';
import DeleteIcon from '@mui/icons-material/Delete';

function AnnouncementPage() {

    const user = localStorage.getItem("userType");
    const [announcement, setAnnouncement] = useState([
        {
            id: 1,
            title: "End Semester Examination",
            message: "End semester examinations will commence from 15th April 2026.",
            postedBy: "Admin",
            date: "2026-03-20",
        },
        {
            id: 2,
            title: "Internal Assessment",
            message: "Internal assessment for CSE department will be conducted next week.",
            postedBy: "Staff",
            date: "2026-03-22",
        },
    ]);

    const handleDelete = (id) => {
        setAnnouncement((prev) =>
            prev.filter((item) => item.id != id)
        );
    };

    return (
        <div className='p-[20px] min-h-[calc(100vh-80px)]'>
            <h2 className="text-[36px] mb-[20px]">Anouncement</h2>

            {(user === "admin" || user === "staff") && (
                <CreateAnnouncement setAnnouncement={setAnnouncement} />
            )}

            <div className='announcement-list'>
                {announcement.map((item) => (
                    <div key={item.id} className='bg-white p-[16px] rounded-[12px] mb-[15px] shadow-[0_6px_14px_rgba(0,0,0,0.1)]'>
                        <h3 className="mb-[8px]">{item.title}</h3>
                        <p>{item.message}</p>

                        <div className="flex justify-between text-[13px] text-[#555] mt-[10px] ">
                            <span>Posted by {item.postedBy}</span>
                            <span>{item.date}</span>
                        </div>

                        {user === "admin" && (
                            <button onClick={() => handleDelete(item.id)} className="inline-flex items-center justify-center gap-[8px] bg-[#b00020] text-white border-none p-[8px_18px] rounded-full cursor-pointer text-[14px] font-semibold transition-all duration-300 transform mt-[16px] hover:bg-[#8e001a] hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: "#16005d",
                                color:"#ffffffff"
                            }}
                            ><DeleteIcon style={{ fontSize: "18px" }} /><span>Delete</span></button>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default AnnouncementPage
