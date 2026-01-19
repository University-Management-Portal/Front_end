import React from 'react';
import './SideBar.css';
import {NavLink} from 'react-router-dom';
export default function StudentSideBar({ isOpen,onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <NavLink to="/student-dashboard" onClick={onClose} >
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Dashboard</li>
        )}</NavLink>

        <NavLink to="/student-attendance" onClick={onClose} >
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Attendance</li>
        )}</NavLink>

        <NavLink to="/student-examination" onClick={onClose}>
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Examination</li>
        )}</NavLink>

        <NavLink to="/student-navcourse" onClick={onClose}>
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Courses</li>
        )}</NavLink>

        <NavLink to="/student-schedule" onClick={onClose} >
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Schedule</li>
        )}</NavLink>
        
        <NavLink to="/student-fees" onClick={onClose}>
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Fees</li>
        )}</NavLink>

        <NavLink to="/student-announcement" onClick={onClose}>
        {({isActive}) => (
          <li className={isActive ? "active" : ""} >Announcement</li>
        )}</NavLink>
      </ul>
    </aside>
  );
}


