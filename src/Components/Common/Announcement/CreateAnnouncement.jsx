import React, { useState } from 'react'
import CampaignIcon from '@mui/icons-material/Campaign';
import axiosInstance from '../../../api/axiosInstance';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';

function CreateAnnouncement({ onAnnouncementCreated }) {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [department, setDepartment] = useState("All");
    const user = localStorage.getItem("userType");
    const [hover1, setHover1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ open: false, text: "", type: "success" });

    const handleSubmit = async () => {
        if (!title || !message) {
            setFeedback({ open: true, text: "Title and Message are required.", type: "warning" });
            return;
        }

        const authorName = localStorage.getItem("userName") || "Staff";

        const payload = {
            title,
            message,
            department,
            postedBy: user === "admin" ? "Admin" : authorName,
            // the backend likely generates date, but we can pass it if required
        };

        setLoading(true);
        try {
            await axiosInstance.post('/announcement', payload);
            setFeedback({ open: true, text: "Announcement broadcasted successfully!", type: "success" });

            // clear form
            setTitle("");
            setMessage("");
            setDepartment("All");

            // trigger parent re-fetch
            if (onAnnouncementCreated) {
                onAnnouncementCreated();
            }

        } catch (err) {
            console.error(err);
            setFeedback({ open: true, text: "Failed to broadcast announcement.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#f4f6ff] p-[16px] rounded-[10px] mb-[25px] relative'>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <h3>Create Announcement</h3>

            <input placeholder='Title' value={title} onChange={((e) => { setTitle(e.target.value) })} className="w-full mb-[10px] p-[10px] block border border-[#16005d] rounded" />

            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full mb-[10px] p-[10px] block border border-[#16005d] rounded bg-white">
                <option value="All">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="CD">CD</option>
                <option value="CT">CT</option>
                <option value="CYBER">CYBER</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECH">MECH</option>
                <option value="ETE">ETE</option>
                <option value="AIDS">AIDS</option>
                <option value="AE">AE</option>
            </select>

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
                    color: "#ffffff",
                }}
            >
                <CampaignIcon style={{ fontSize: "28px" }} />
                <span>Announce</span>
            </button>

            <Snackbar
                open={feedback.open}
                autoHideDuration={6000}
                onClose={() => setFeedback({ ...feedback, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setFeedback({ ...feedback, open: false })} severity={feedback.type} sx={{ width: '100%' }}>
                    {feedback.text}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default CreateAnnouncement