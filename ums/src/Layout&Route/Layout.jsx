import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer';
import StaffSideBar from '../Components/Sidebar/StaffSideBar';
import StudentSideBar from '../Components/Sidebar/StudentSideBar';
import AdminSideBar from '../Components/Sidebar/AdminSideBar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);   // CLICK LOCK MODE

  const user = localStorage.getItem("userType");

  // HOVER MODE
  const handleMouseEnter = () => {
    if (!isLocked) {
      setIsSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsSidebarOpen(false);
    }
  };

  // CLICK MODE (LOCK / UNLOCK)
  const handleClick = () => {
    setIsLocked(prev => {
      const newLock = !prev;
      setIsSidebarOpen(newLock);   // lock na open, unlock na close
      return newLock;
    });
  };

  return (
    <>
      {/* HEADER KKU HANDLERS PASS PANREN */}
      <Header
        onMenuClick={handleClick}
        onMenuEnter={handleMouseEnter}
        onMenuLeave={handleMouseLeave}
      />

      {user === "student" && (
        <StudentSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {user === "staff" && (
        <StaffSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {user === "admin" && (
        <AdminSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed top-[85px] left-0 w-screen h-[calc(100vh-85px)] bg-black/50 z-[400]"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsLocked(false);     // overlay click pannal unlock
          }}
        />
      )}

      {/* SCROLL CONTAINER */}
      <div className="mt-[85px] h-[calc(100vh-85px)] overflow-y-auto overflow-x-hidden relative w-full">
        <div className="p-5 w-full max-w-[100vw] box-border">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Layout;
