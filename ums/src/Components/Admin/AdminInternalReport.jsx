import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InternalMarksData from "./InternalMarksData";
import "./AdminReport.css";

function AdminInternalReport() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const subjects =
    InternalMarksData?.[filters.academic]?.[filters.sem]?.[filters.dept]?.[
      filters.sec
    ] || [];

  return (
    <div className="admin-report-page">
      <h2 className="report-title">Report / Internal Mark</h2>

      <div className="admin-filter-bar">
        <div className="filter-item">
          <label>Academic Year</label>
          <select
            name="academic"
            value={filters.academic}
            onChange={handleChange}
          >
            <option value="2025-2026">2025 - 2026</option>
            <option value="2024-2025">2024 - 2025</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Semester</label>
          <select name="sem" value={filters.sem} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Department</label>
          <select name="dept" value={filters.dept} onChange={handleChange}>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Section</label>
          <select name="sec" value={filters.sec} onChange={handleChange}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
      </div>

      <div className="report-card-grid">
        {subjects.length > 0 ? (
          subjects.map((item, index) => (
            <div className="subject-card" key={index}>
              <h4>{item.subject}</h4>
              <button
                className="view-btn"
                onClick={() =>
                  navigate("/admin-report/internal/table", {
                    state: {
                      academic: filters.academic,
                      sem: filters.sem,
                      dept: filters.dept,
                      sec: filters.sec,
                      subject: item.subject,
                    },
                  })
                }
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#666" }}>
            No subjects available for selected class
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminInternalReport;
