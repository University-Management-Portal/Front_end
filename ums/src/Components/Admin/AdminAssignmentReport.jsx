import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentData from "./AssignmentData";
import "./AdminReport.css";

function AdminAssignmentReport() {
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

  const assignments =
    AssignmentData?.[filters.academic]?.[filters.sem]?.[filters.dept]?.[
      filters.sec
    ] || [];

  return (
    <div className="admin-report-page">
      <h2 className="report-title">Report / Assignment</h2>

      {/* FILTER BAR */}
      <div className="admin-filter-bar">
        <div className="filter-item">
          <label>Academic Year</label>
          <select name="academic" value={filters.academic} onChange={handleChange}>
            <option value="2025-2026">2025 - 2026</option>
            <option value="2024-2025">2024 - 2025</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Semester</label>
          <select name="sem" value={filters.sem} onChange={handleChange}>
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Department</label>
          <select name="dept" value={filters.dept} onChange={handleChange}>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="Mech">Mech</option>
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
        {assignments.length > 0 ? (
          assignments.map((item, index) => (
            <div className="subject-card" key={index}>
              <h4>{item.assignment}</h4>
              <button
                className="view-btn"
                onClick={() =>
                  navigate("/admin-report/assignment/table", {
                    state: {
                      academic: filters.academic,
                      sem: filters.sem,
                      dept: filters.dept,
                      sec: filters.sec,
                      assignment: item.assignment,
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
            No assignments available for selected class
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminAssignmentReport;
