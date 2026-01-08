import React from 'react';
import './SideBar.css';

export default function StaffSideBar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>Teaching Schedule</li>
        <li>Attendance</li>
        <li>Internal Mark</li>
        <li>Student List</li>
        <li>Course</li>
        <li>Announcement</li>
      </ul>
    </aside>
  );
}


  