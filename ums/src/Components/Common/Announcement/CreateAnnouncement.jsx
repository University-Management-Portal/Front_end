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

            <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setHover1(true)}
                    onMouseLeave={() => setHover1(false)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "8px 18px",
                        borderRadius: "20px",
                        marginTop: "16px",
                        border: "2px solid #16005d",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "0.3s",

                        backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
                    }}
                    >
                    <CampaignIcon style={{ fontSize: "28px" }} />
                    <span>Announce</span>
                    </button>

        </div>
    )
}

export default CreateAnnouncement