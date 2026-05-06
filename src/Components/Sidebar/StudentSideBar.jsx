import React from 'react';
import { NavLink } from 'react-router-dom';

export default function StudentSideBar({ isOpen, onClose }) {
  const sidebarClasses = `fixed top-[85px] w-[270px] h-[calc(100vh-85px)] bg-[#D9D9D9] z-[500] overflow-y-auto overflow-x-hidden transition-[left] duration-300 ease-in-out ${isOpen ? "left-0" : "-left-[280px]"
    }`;

  const linkClasses = ({ isActive }) =>
    `block py-4 pl-[43px] text-[18px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#C4C4C4] hover:font-semibold hover:text-[20px] ${isActive ? "bg-[#0f094e] text-white font-semibold text-[20px]" : "text-black"
    }`;

  return (
    <aside className={sidebarClasses}>
      <ul className="list-none pt-10">
        <NavLink to="/student-dashboard" onClick={onClose} >
          {({ isActive }) => <li className={linkClasses({ isActive })} >Dashboard</li>}
        </NavLink>

        <NavLink to="/student-attendance" onClick={onClose} >
          {({ isActive }) => <li className={linkClasses({ isActive })} >Attendance</li>}
        </NavLink>

        <NavLink to="/student-examination" onClick={onClose}>
          {({ isActive }) => <li className={linkClasses({ isActive })} >Examination</li>}
        </NavLink>

        <NavLink to="/student-navcourse" onClick={onClose}>
          {({ isActive }) => <li className={linkClasses({ isActive })} >Courses</li>}
        </NavLink>

        <NavLink to="/student-schedule" onClick={onClose} >
          {({ isActive }) => <li className={linkClasses({ isActive })} >Schedule</li>}
        </NavLink>

        <NavLink to="/student-fees" onClick={onClose}>
          {({ isActive }) => <li className={linkClasses({ isActive })} >Fees</li>}
        </NavLink>

        <NavLink to="/announcement" onClick={onClose}>
          {({ isActive }) => <li className={linkClasses({ isActive })} >Announcement</li>}
        </NavLink>
      </ul>
    </aside>
  );
}


