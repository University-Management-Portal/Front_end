import React, { useState, useEffect } from 'react'
import CreateAnnouncement from './CreateAnnouncement';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../../../api/axiosInstance';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';

function AnnouncementPage() {

    const user = localStorage.getItem("userType");
    const userDept = localStorage.getItem("userDepartment") || "All";

    const [announcement, setAnnouncement] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ open: false, text: "", type: "success" });

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/announcement');
            // Sort by ID descending so newest is first by default
            const sortedData = res.data.sort((a, b) => b.id - a.id);
            setAnnouncement(sortedData);
        } catch (err) {
            console.error(err);
            setMessage({ open: true, text: "Failed to load announcements from server.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Filter announcements based on user role and department
    const visibleAnnouncements = announcement.filter((item) => {
        if (user === "admin") return true; // Admins see everything
        if (item.department === "All") return true; // Everyone sees "All" announcements

        // Students and Staff only see announcements targeted at their specific department
        if ((user === "student" || user === "staff") && userDept) {
            return item.department === userDept;
        }

        return false;
    });

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/announcement/${id}`);
            setMessage({ open: true, text: "Announcement deleted successfully.", type: "success" });
            fetchAnnouncements();
        } catch (err) {
            console.error(err);
            setMessage({ open: true, text: "Failed to delete announcement.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-[20px] min-h-[calc(100vh-80px)]'>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <h2 className="text-[36px] mb-[20px]">Anouncement</h2>

            {(user === "admin" || user === "staff") && (
                <CreateAnnouncement setAnnouncement={setAnnouncement} onAnnouncementCreated={fetchAnnouncements} />
            )}

            <div className='announcement-list'>
                {visibleAnnouncements.length === 0 && !loading && (
                    <p className="text-gray-500 italic mt-[20px]">No announcements available for your department.</p>
                )}
                {visibleAnnouncements.map((item) => (
                    <div key={item.id} className='bg-white p-[16px] rounded-[12px] mb-[15px] shadow-[0_6px_14px_rgba(0,0,0,0.1)] relative pb-[40px]'>
                        <span className="absolute top-[16px] right-[16px] bg-[#d3dcf7] text-[#16005d] px-[12px] py-[4px] rounded-[20px] text-[12px] font-bold">
                            {item.department}
                        </span>
                        <h3 className="mb-[8px] pr-[80px] text-[#16005d]">{item.title}</h3>
                        <p>{item.message}</p>

                        <div className="flex justify-between text-[13px] text-[#555] mt-[15px] absolute bottom-[16px] left-[16px] right-[16px] pr-[120px]">
                            <span>Posted by {item.postBy}</span>
                            <span>{item.date}</span>
                        </div>

                        {user === "admin" && (

                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    padding: "6px 14px",
                                    borderRadius: "50px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    transition: "all 0.3s ease",
                                    position: "absolute",
                                    bottom: "16px",
                                    right: "16px",


                                    backgroundColor: "#b00020",
                                    color: "#ffffff",
                                }}
                            >
                                <DeleteIcon style={{ fontSize: "18px", color: "inherit" }} />
                                <span>Delete</span>
                            </button>

                        )}
                    </div>
                ))}
            </div>

            <Snackbar
                open={message.open}
                autoHideDuration={6000}
                onClose={() => setMessage({ ...message, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: '100%' }}>
                    {message.text}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AnnouncementPage
