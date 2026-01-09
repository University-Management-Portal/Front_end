import React from 'react';
import './SideBar.css';

export default function AdminSideBar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>Users</li>
        <li>Attendance</li>
        <li>Courses</li>
        <li>Departments</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}


  