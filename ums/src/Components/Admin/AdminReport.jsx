import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminReport.css";

function AdminReport() {
  const navigate = useNavigate();

  return (
    <div className="admin-report-page">
      <h2 className="report-title">Report Dashboard</h2>

      <div className="report-card-grid">
        <div
          className="report-card"
          onClick={() => navigate("/admin-report/internal")}
        >
          <h3>Internal Mark<br />Report</h3>
        </div>

        <div
          className="report-card"
          onClick={() => navigate("/admin-report/assignment")}
        >
          <h3>Assignment<br />Report</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminReport;
