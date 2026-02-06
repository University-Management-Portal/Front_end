import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer';
import StaffSideBar from '../Components/Sidebar/StaffSideBar';
import StudentSideBar from '../Components/Sidebar/StudentSideBar';
import AdminSideBar from '../Components/Sidebar/AdminSideBar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = localStorage.getItem("userType");

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {user === "student" && <StudentSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      {user === "staff" && <StaffSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      {user === "admin" && <AdminSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

      {isSidebarOpen && (
        <div
          className="fixed top-[85px] left-0 w-screen h-[calc(100vh-85px)] bg-black/50 z-[400]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ONE scroll container */}
      <div className="mt-[85px] h-[calc(100vh-85px)] overflow-y-auto overflow-x-hidden relative w-full">
        <div className="p-5 w-full max-w-[100vw] box-border">
          <Outlet />
        </div>

        {/* Footer INSIDE scroll */}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
