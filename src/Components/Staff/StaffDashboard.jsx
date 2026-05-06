import React, { useState, useEffect } from "react";
import ProfCalender from "../Common/ProfCalender";
import axiosInstance from '../../api/axiosInstance';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';

export default function StaffDashboard() {
  const [dashboardData, setDashboardData] = useState({
    staffName: '',
    regNo: '',
    department: '',
    recentAnnouncements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ open: false, text: "", type: "error" });

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const res = await axiosInstance.get(`/dashboard/staff/${userId}`);
        setDashboardData(res.data);
      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err.message);
        const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || "Unknown error";
        setError({ open: true, text: `Failed to load dashboard: ${errMsg}`, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="w-full max-w-none p-4 relative min-h-[80vh]">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="bg-[#16005D] rounded-[10px] w-full min-h-[180px] p-[10px] mb-4 flex flex-col justify-center">
        <p className="text-white text-[34px] font-semibold ml-[40px]">
          {(dashboardData.staffName || "Staff Member").toUpperCase()} ({dashboardData.regNo || "N/A"})
        </p>
        <h3 className="text-white text-[26px] font-medium ml-[40px]">{dashboardData.department || "General"} Department</h3>
      </div>

      <div className="w-full mb-4">
        <div className="rounded-[14px] overflow-hidden shadow-sm">
          <ProfCalender />
        </div>
      </div>

      {/* Recent Announcements Section */}
      <div className="mt-[30px] w-full">
        <h3 className="text-[24px] font-bold text-[#16005d] mb-[15px] ml-[10px]">Recent Announcements</h3>
        {dashboardData.recentAnnouncements && dashboardData.recentAnnouncements.length > 0 ? (
          <div className="grid gap-[15px]">
            {dashboardData.recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white p-[16px] rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] border-l-[6px] border-[#16005d]">
                <h4 className="text-[18px] font-bold text-gray-800 mb-[6px]">{announcement.title}</h4>
                <p className="text-gray-600 mb-[10px]">{announcement.message}</p>
                <div className="flex justify-between text-[12px] text-gray-500 font-medium">
                  <span>Posted by {announcement.postBy}</span>
                  <span>{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic ml-[10px] pb-[80px]">No recent announcements available.</p>
        )}
      </div>

      <Snackbar
        open={error.open}
        autoHideDuration={6000}
        onClose={() => setError({ ...error, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setError({ ...error, open: false })} severity={error.type} sx={{ width: '100%' }}>
          {error.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
