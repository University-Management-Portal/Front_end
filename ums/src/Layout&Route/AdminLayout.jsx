import React, { useState } from "react";
import Header from "../Components/Header/Header";
import AdminSideBar from "../Components/Sidebar/AdminSideBar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // hover open
  const handleMenuHover = () => {
    if (!isLocked) setIsOpen(true);
  };

  // hover leave close
  const handleMenuLeave = () => {
    if (!isLocked) setIsOpen(false);
  };

  // click toggle + lock
  const handleMenuClick = () => {
    setIsOpen(prev => !prev);
    setIsLocked(prev => !prev);
  };

  return (
    <>
      <Header
        onMenuHover={handleMenuHover}
        onMenuLeave={handleMenuLeave}
        onMenuClick={handleMenuClick}
      />

      <AdminSideBar
        isOpen={isOpen}
        onClose={() => {
          if (!isLocked) setIsOpen(false);
        }}
      />

      <div className="pt-[90px] pl-[270px]">
        {children}
      </div>
    </>
  );
}
