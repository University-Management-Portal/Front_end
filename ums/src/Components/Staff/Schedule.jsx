import React from "react";
import "./Schedule.css";
import { FaEye, FaDownload } from "react-icons/fa";

export default function Schedule() {
  return (
    <div className="schedule-container">
      <h2>Schedule :</h2>

      <div className="row">
        <p>Time Table</p>

        <div className="btn-group">
          {/* VIEW */}
          <a
            href="/timetable.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn view"
          >
            <FaEye /> View
          </a>

          {/* DOWNLOAD */}
          <a
            href="/timetable.pdf"
            download
            className="btn download"
          >
            <FaDownload /> Download
          </a>
        </div>
      </div>

      {/* Academic Calendar */}
      <div className="row">
        <p>Academics calendar</p>

        <div className="btn-group">
          <a
            href="/academic_calendar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn view"
          >
            <FaEye /> View
          </a>

          <a
            href="/academic_calendar.pdf"
            download
            className="btn download"
          >
            <FaDownload /> Download
          </a>
        </div>
      </div>
    </div>
  );
}
