import React from "react";
import "./Schedule.css";
import { FaEye, FaDownload } from "react-icons/fa";

export default function Schedule() {
  return (

    <div className="div-schedule">

        <a href="/timetable.pdf" target="_blank" rel="noopener noreferrer" className="btn view">
        <div className="row-nav-page" >
        <p className="ti">Time Table</p>
        </div>  
        </a>

      
        <a href="/academic_calendar.pdf" target="_blank" rel="noopener noreferrer" className="btn view">
        <div className="row-nav-page">
        <p className="ti">Academics calendar</p>
        </div>
        </a>

    </div>

  );
}

