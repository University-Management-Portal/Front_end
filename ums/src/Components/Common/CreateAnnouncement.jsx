import React, { useState } from 'react'
import "./Announcement.css"
import CampaignIcon from '@mui/icons-material/Campaign';

function CreateAnnouncement({setAnnouncement}) {

    const[title,setTitle] = useState("");
    const[message,setMessage] = useState("");
    const user = localStorage.getItem("userType");

    const handleSubmit = () =>{
        if(!title || !message)
            return alert("Fill all Fields!");

        setAnnouncement((prev)=>[
            {
                id : Date.now(),
                title,
                message,
                postedBy: user === "admin" ? "Admin" : "Staff",
                date: new Date().toISOString().split("T")[0],
            },
            ...prev,
        ]);

        setTitle("");
        setMessage("");
    };

  return (
    <div className='create-announcement'>
        <h3>Create Announcement</h3>

        <input placeholder='Title' value={title} onChange={((e)=>{setTitle(e.target.value)})} />

        <textarea placeholder='Message' value={message} onChange={((e)=>{setMessage(e.target.value)})} />

        <button onClick={handleSubmit}><CampaignIcon/><span>Announce</span></button>
    </div>
  )
}

export default CreateAnnouncement