import React, { useState } from 'react'
import CreateAnnouncement from './CreateAnnouncement';
import "./Announcement.css"
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

    const handleDelete=(id)=>{
        setAnnouncement((prev)=>
            prev.filter((item)=> item.id != id)
        );
    };

  return (
    <div className='announcement-page'>
        <h2>Anouncement</h2>

        {(user === "admin" || user === "staff") && (
            <CreateAnnouncement setAnnouncement={setAnnouncement}/>
        )}

        <div className='announcement-list'>
            {announcement.map((item) => (
                <div key={item.id} className='announcement-card'>
                    <h3>{item.title}</h3>
                    <p>{item.message}</p>

                    <div className="announcement-footer">
                        <span>Posted by {item.postedBy}</span>
                        <span>{item.date}</span>
                    </div>

                    {user === "admin" && (
                        <button onClick={()=>handleDelete(item.id)} className="delete-btn"><DeleteIcon/><span>Delete</span></button>
                    )}
                </div>
            ))}
        </div>

    </div>
  );
}

export default AnnouncementPage