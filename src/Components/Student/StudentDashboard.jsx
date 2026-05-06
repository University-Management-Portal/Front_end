import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfCalender from "../Common/ProfCalender";
import axiosInstance from '../../api/axiosInstance';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';

function StudentDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    studentName: '',
    regNo: '',
    department: '',
    overallAttendance: 0,
    currentSemester: 0,
    currentCGPA: 0,
    tutor: '',
    enrolledCourses: 0,
    recentAnnouncements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ open: false, text: "", type: "error" });

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const res = await axiosInstance.get(`/dashboard/student/${userId}`);
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
        setError({ open: true, text: "Failed to load dashboard data", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="w-full p-4 grid grid-cols-1 gap-4 relative min-h-[80vh]">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="w-full">
        <div className="bg-[#16005d] text-white p-6 rounded-[14px] min-h-[180px] flex flex-col justify-center">
          <h2 className="text-[32px] font-semibold tracking-[0.5px]">
            {(dashboardData.studentName || 'Student').toUpperCase()} ({dashboardData.regNo || 'N/A'})
          </h2>
          <h5 className="text-[20px] font-normal opacity-90 mt-2">
            {dashboardData.department || 'General'} Department
          </h5>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="w-full">
          <div
            className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold"
            onClick={() => navigate("/student-attendance")}
          >
            Overall Attendance : <strong className="ml-1">{dashboardData.overallAttendance}%</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Current Semester : <strong className="ml-1">{dashboardData.currentSemester}</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Current CGPA : <strong className="ml-1">{dashboardData.currentCGPA}</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Tutor : <strong className="ml-1">{dashboardData.tutor || 'Unassigned'}</strong>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold">
            Batch Year : <strong className="ml-1">{dashboardData.batchYear || 'N/A'}</strong>
          </div>
        </div>

        <div className="w-full">
          <div
            className="bg-[#e0e0e0] rounded-[14px] p-6 text-center text-[18px] font-medium text-black min-h-[100px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-600 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:font-bold"
            onClick={() => navigate("/student-courses")}
          >
            Enrolled Courses : <strong className="ml-1">{dashboardData.enrolledCourses}</strong>
          </div>
        </div>
      </div>

      <div className="w-full mb-4">
        <div className="rounded-[14px] overflow-hidden shadow-sm">
          <ProfCalender />
        </div>
      </div>

      {/* Recent Announcements Section */}
      <div className="mt-[10px] w-full">
        <div className="bg-white rounded-[14px] p-6 shadow-sm">
          <h5 className="text-[20px] font-semibold mb-5 border-b-2 border-[#ddd] pb-2 text-[#16005d]">
            Recent Announcements
          </h5>
          {dashboardData.recentAnnouncements && dashboardData.recentAnnouncements.length > 0 ? (
            <div className="grid gap-[15px]">
              {dashboardData.recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="bg-[#f9f9f9] p-[16px] rounded-[12px] border-l-[6px] border-[#16005d]">
                  <h4 className="text-[17px] font-bold text-gray-800 mb-[4px]">{announcement.title}</h4>
                  <p className="text-gray-600 mb-[10px] text-[15px]">{announcement.message}</p>
                  <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                    <span>Posted by {(announcement.postBy || "Staff").toUpperCase()}</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic pb-[20px]">No recent announcements available.</p>
          )}
        </div>
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

export default StudentDashboard;
