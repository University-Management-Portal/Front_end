import React from "react";
import "./Schedule.css";
import { FaEye, FaDownload } from "react-icons/fa";

export default function Schedule() {
  return (

    <div className="div-schedule">
      <div className="row-nav-page">
        <p className="ti">Time Table</p>
        <div className="btn-group">
          <a href="/timetable.pdf" target="_blank" rel="noopener noreferrer" className="btn view">
            <FaEye /> View
          </a>

          <a href="/timetable.pdf" download className="btn download">
            <FaDownload /> Download
          </a>
        </div>
      </div>  


      <div className="row-nav-page">
        <p className="ti">Academics calendar</p>
        <div className="btn-group">
          <a href="/academic_calendar.pdf" target="_blank" rel="noopener noreferrer" className="btn view">
            <FaEye /> View
          </a>

          <a href="/academic_calendar.pdf" download className="btn download">
            <FaDownload /> Download
          </a>
        </div>
      </div>

    </div>

  );
}

