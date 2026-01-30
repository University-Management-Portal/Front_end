import React, { useState } from "react";
import "./StaffAttendance.css";
import studentsData from "./StudentList";

export default function StaffAttendance() {
  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
    date: "",
  });

  const [selectedHours, setSelectedHours] = useState(["h1", "h5"]);
  const [attendance, setAttendance] = useState({});
  const [showReport, setShowReport] = useState(false);

  const key = `${filters.dept}-${filters.sem}-${filters.sec}`;
  const students = studentsData[key] || [];

  /* ===== FILTER UPDATE ===== */
  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setAttendance({});
    setShowReport(false);
  };

  /* ===== MARK ATTENDANCE ===== */
  const markAttendance = (roll, hour, status) => {
    setAttendance(prev => ({
      ...prev,
      [roll]: { ...prev[roll], [hour]: status },
    }));
  };

  const handleSave = () => {
    for (let s of students) {
      for (let h of selectedHours) {
        if (!attendance[s.roll]?.[h]) {
          alert("Please mark Present / Absent for all students & hours");
          return;
        }
      }
    }
    alert("Attendance Saved Successfully !!!");
  };

  const downloadCSV = () => {
    let csv = "Roll No," + selectedHours.join(",") + "\n";

    Object.entries(attendance).forEach(([roll, hours]) => {
      csv += `${roll},${selectedHours.map(h => hours[h]).join(",")}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container" style={{ padding: "20px" }}>
      <div className="ad-top-bar">
        <div className="ad-academic">
          <label>Academic Year</label>
          <select onChange={e => updateFilter("academic", e.target.value)}>
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        <div className="ad-sem">
          <label>Semester</label>
          <select onChange={e => updateFilter("sem", e.target.value)}>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div className="ad-dept">
          <label>Department</label>
          <select onChange={e => updateFilter("dept", e.target.value)}>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="Mech">Mech</option>
          </select>
        </div>

        <div className="ad-sec">
          <label>Section</label>
          <select onChange={e => updateFilter("sec", e.target.value)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="ad-hour">
          <label>Hours</label>
          <select
            onChange={e =>
              setSelectedHours(
                [...e.target.selectedOptions].map(o => o.value)
              )
            }
          >
            <option value="h1">Hour 1</option>
            <option value="h2">Hour 2</option>
          </select>
        </div>

        <div className="ad-date"> 
          <label>Date</label> 
          <input type="date" min={new Date().toISOString().split("T")[0]} onChange={e => updateFilter("date", e.target.value)} /> 
        </div>


      </div>

      {!showReport && (
        <div className="att-buttons">
          <button onClick={handleSave} className="att-save-butn">Save Attendance</button>
          <button onClick={() => setShowReport(true)} className="att-rep-butn">Report</button>
        </div>
      )}

      {!showReport && students.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "30px", fontWeight: "600" }}>
          No Data Found
        </p>
      )}

      {!showReport && students.length > 0 && (
        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Roll No</th>
                {selectedHours.map(h => (
                  <th key={h}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.roll}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>

                  {selectedHours.map(h => (
                    <td key={h}>
                      <label>
                        <input
                          type="radio"
                          name={`${s.roll}-${h}`}
                          onChange={() => markAttendance(s.roll, h, "Present")}
                        /> Present
                      </label>
                      &nbsp;
                      <label>
                        <input
                          type="radio"
                          name={`${s.roll}-${h}`}
                          onChange={() => markAttendance(s.roll, h, "Absent")}
                        /> Absent
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showReport && (
  <>
    <div className="att-buttons">
      <button onClick={downloadCSV} className="att-down-butn">
        Download
      </button>
      <button
        onClick={() => setShowReport(false)}
        className="att-back-butn"
      >
        Back
      </button>
    </div>

    <div className="report-section" style={{ marginTop: "20px" }}>
      <h3 style={{ textAlign: "center" }}>Attendance Report</h3>

      {/* ===== REPORT DETAILS ===== */}
      <div style={{ marginBottom: "15px", fontWeight: "600" }}>
        <p>Academic Year : {filters.academic}</p>
        <p>Semester : {filters.sem}</p>
        <p>Department : {filters.dept}</p>
        <p>Section : {filters.sec}</p>
        <p>Date : {filters.date || "-"}</p>
        <p>
          Hours :
          {selectedHours.map(h => ` ${h.toUpperCase()}`).join(",")}
        </p>
      </div>

      {/* ===== REPORT TABLE ===== */}
      {Object.keys(attendance).length === 0 ? (
        <p>No attendance data available</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Roll No</th>
              {selectedHours.map(h => (
                <th key={h}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendance).map(([roll, hours]) => (
              <tr key={roll}>
                <td>{roll}</td>
                {selectedHours.map(h => (
                  <td key={h}>{hours[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </>
)}

    </div>
  );
}
