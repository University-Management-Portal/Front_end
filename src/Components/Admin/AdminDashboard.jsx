import React, { useState, useEffect } from 'react'
import ProfCalender from '../Common/ProfCalender'
import axiosInstance from '../../api/axiosInstance';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';

function AdminDashboard() {
  const [adminData, setAdminData] = useState({ name: '', regNo: '' });
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculties: 0,
    totalDepartments: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ open: false, text: "", type: "error" });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const [userRes, dashboardRes] = await Promise.all([
        axiosInstance.get(`/users/${userId}`),
        axiosInstance.get('/dashboard/admin')
      ]);

      setAdminData({
        name: userRes.data.name || 'Admin',
        regNo: userRes.data.regNo || 'N/A'
      });
      setStats({
        totalStudents: dashboardRes.data.totalStudents || 0,
        totalFaculties: dashboardRes.data.totalFaculties || 0,
        totalDepartments: dashboardRes.data.totalDepartments || 0,
        totalCourses: dashboardRes.data.totalCourses || 0,
      });
    } catch (err) {
      console.error(err);
      setError({ open: true, text: "Failed to load dashboard data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className='p-[30px] bg-[#f7f8fc] grid grid-cols-4 gap-[22px] min-h-screen relative'>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='col-span-4 bg-[#16005d] text-white p-[30px] rounded-[14px] flex flex-col justify-center h-[160px] mb-0'>
        <p className="text-[32px] font-bold">{adminData.name.toUpperCase()}</p>
        <p className="text-[25px] font-bold">{adminData.regNo}</p>
      </div>

      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.00] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Total Student</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">{stats.totalStudents}</p>
      </div>
      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Total Faculties</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">{stats.totalFaculties}</p>
      </div>
      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Departments</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">{stats.totalDepartments}</p>
      </div>
      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Total Courses</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">{stats.totalCourses}</p>
      </div>

      <div className='col-span-4 max-h-[95vh] overflow-hidden'>
        <ProfCalender />
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
  )
}

export default AdminDashboard