import React, {useState } from "react";
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

  const key = `${filters.dept}-${filters.sem}-${filters.sec}`;
  const students = studentsData[key] || [];
  const [attendance, setAttendance] = useState({});
  const [showReport, setShowReport] = useState(false);

//   useEffect(() => {
//   setAttendance({});
//   setShowReport(false);
// }, [filters]);

  const markAttendance = (roll, hour, status) => {
    setAttendance(prev => ({
      ...prev,
      [roll]: { ...prev[roll], [hour]: status }
    }));
  };

  const handleSave = () => {
    console.log("Saved Attendance:", attendance);
    alert("Attendance Saved Successfully ✅");
  };

  return (
    <div style={{ padding: "20px" }}  className="page-container">
      <div className="ad-top-bar">

        <div className="ad-academic">
          <label>Academic Year</label>
          <select onChange={e => setFilters({ ...filters, academic: e.target.value })}>
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        <div className="ad-sem">
          <label>Semester</label>
          <select onChange={e => setFilters({ ...filters, sem: e.target.value })}>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div className="ad-dept">
          <label>Department</label>
          <select onChange={e => setFilters({ ...filters, dept: e.target.value })}>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="Mech">Mech</option>
          </select>
        </div>

        <div className="ad-sec">
          <label>Section</label>
          <select onChange={e => setFilters({ ...filters, sec: e.target.value })}>
            <option value="A">A Section</option>
            <option value="B">B Section</option>
            <option value="C">C Section</option>
          </select>
        </div>

        <div className="ad-date">
          <label>Date</label>
          <input
            type="date"
            onChange={e => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

      </div>

    <div className="att-buttons">
            <button onClick={handleSave} style={{ marginTop: "15px" }} className="att-save-butn">
            Save Attendance
            </button>

            <button onClick={() => setShowReport(true)} style={{ marginLeft: "10px" }} className="att-rep-butn">
            Report
            </button>
    </div>

      {!showReport && students.length > 0 && (
        <div className="table-wrapper">
          <table border="1" width="100%" style={{ marginTop: "20px" }} className="attendance-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Hour 1</th>
                <th>Hour 5</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={s.roll}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>

                  {["h1", "h5"].map(hour => (
                    <td key={hour}>
                      <label>
                        <input
                          type="radio"
                          name={`${s.roll}-${hour}`}
                          onChange={() => markAttendance(s.roll, hour, "Present")}
                        /> Present
                      </label>
                      &nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name={`${s.roll}-${hour}`}
                          onChange={() => markAttendance(s.roll, hour, "Absent")}
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
    </div>
  );
}
