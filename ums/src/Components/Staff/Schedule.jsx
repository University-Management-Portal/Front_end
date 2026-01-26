import React from "react";
import "./Schedule.css";
import { FaEye, FaDownload } from "react-icons/fa";

export default function Schedule() {
  return (

    <div className="div-schedule">
      <a href="./uploads/timetable.pdf" target="_blank" rel="noopener noreferrer" className="btn view">
      <div className="row-nav-page">
        <p>Time Table</p>
      </div>
      </a> 


      <div className="row-nav-page">
        <p className="ti">Academics calendar</p>
        <div className="btn-group">
          <a href="/uploads/academic_calendar.pdf" target="_blank" rel="noopener noreferrer" className="btn view">
            <FaEye /> View
          </a>

          <a href="/uploads/academic_calendar.pdf" download className="btn download">
            <FaDownload /> Download
          </a>
        </div>
      </div>

    </div>

  );
}

