import React from 'react';
import './SideBar.css';

export default function StudentSideBar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>Attendance</li>
        <li>Examination</li>
        <li>Courses</li>
        <li>Schedule</li>
        <li>Fees</li>
        <li>Announcement</li>
      </ul>
    </aside>
  );
}


