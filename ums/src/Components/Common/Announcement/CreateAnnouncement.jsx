import React, { useState } from 'react'
import CampaignIcon from '@mui/icons-material/Campaign';

function CreateAnnouncement({ setAnnouncement }) {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const user = localStorage.getItem("userType");
    const [hover1, setHover1] = useState(false);

    const handleSubmit = () => {
        if (!title || !message)
            return alert("Fill all Fields!");

        setAnnouncement((prev) => [
            {
                id: Date.now(),
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
        <div className='bg-[#f4f6ff] p-[16px] rounded-[10px] mb-[25px]'>
            <h3>Create Announcement</h3>

            <input placeholder='Title' value={title} onChange={((e) => { setTitle(e.target.value) })} className="w-full mb-[10px] p-[10px] block border border-[#16005d] rounded" />

            <textarea placeholder='Message' value={message} onChange={((e) => { setMessage(e.target.value) })} className="w-full mb-[10px] p-[10px] block border border-[#16005d] rounded" />

            <button onClick={handleSubmit} className="std-btn inline-flex items-center justify-center gap-[8px] p-[8px_18px] rounded-full text-[14px] font-semibold mt-[16px]"
            style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            ><CampaignIcon style={{ fontSize: "28px" }} /><span>Announce</span></button>
        </div>
    )
}

export default CreateAnnouncement