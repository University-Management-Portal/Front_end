import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

export default function AdminSideBar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">

        <NavLink to="/admin-dashboard" end onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Dashboard</li>
          )}
        </NavLink>

        <NavLink to="/admin-userpage" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Users</li>
          )}
        </NavLink>

        <NavLink to="/admin-attendance" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Attendance</li>
          )}
        </NavLink>

        <NavLink to="/admin-courses" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Courses</li>
          )}
        </NavLink>

        <NavLink to="/admin-departments" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Departments</li>
          )}
        </NavLink>

        <NavLink to="/admin-reports" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Reports</li>
          )}
        </NavLink>

        <NavLink to="/announcement" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Announcements</li>
          )}
        </NavLink>

        <NavLink to="/admin-settings" onClick={onClose}>
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>Settings</li>
          )}
        </NavLink>

      </ul>
    </aside>
  );
}
  