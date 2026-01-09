import React from 'react';
import './SideBar.css';
import {NavLink} from 'react-router-dom';

export default function StaffSideBar({ isOpen,onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <NavLink to="staff-dashboard" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Dashboard</li>
          )}
        </NavLink>

        <NavLink to="/staff-schedule" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Teaching Schedule</li>
          )}
        </NavLink>

        <NavLink to="/staff-attendance" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Attendance</li>
          )}
        </NavLink>

        <NavLink to="/staff-internalmark" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Internal Mark</li>
          )}
        </NavLink>

        <NavLink to="/staff-studentlist" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Student List</li>
          )}
        </NavLink>

        <NavLink to="/staff-courses" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Courses</li>
          )}
        </NavLink>

        <NavLink to="/staff-Announcement" onClick={onClose} >
          {({isActive})=>(
            <li className={isActive ? "active" : ""} >Announcement</li>
          )}
        </NavLink>
      </ul>
    </aside>
  );
}


  