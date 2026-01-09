import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer';
import StaffSideBar from '../Components/Sidebar/StaffSideBar';
import StudentSideBar from '../Components/Sidebar/StudentSideBar';
import "./Layout.css";
import AdminSideBar from '../Components/Sidebar/AdminSideBar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const user = localStorage.getItem("userType");

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {user === "student" && <StudentSideBar isOpen={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} />}
        {user === "staff" && <StaffSideBar isOpen={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} />}
        {user === "admin" && <AdminSideBar isOpen={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} />}

      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ONE scroll container */}
      <div className="layout-scroll">
        <div className="page-content">
          <Outlet />
        </div>

        {/* Footer INSIDE scroll */}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
