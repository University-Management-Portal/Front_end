import React, { useState } from "react";
import studentsData from "./StudentList";
import "../Staff/StudentListPage.css";

export default function StudentListPage() {
  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
  });

  const [search, setSearch] = useState("");

  const key = `${filters.dept}-${filters.sem}-${filters.sec}`;
  const students = studentsData[key] || [];

  const filteredStudents = students.filter(s =>
  s.name.toLowerCase().includes(search.toLowerCase()) ||
  s.roll.toString().includes(search) ||
  s.phoneno?.includes(search) ||
  s.parentphone?.includes(search) ||
  s.tutor.toLowerCase().includes(search.toLowerCase())
);
  

  const downloadCSV = () => {
    let csv = "";
    csv += `Academic Year,${filters.academic}\n`;
    csv += `Semester,${filters.sem}\n`;
    csv += `Department,${filters.dept}\n`;
    csv += `Section,${filters.sec}\n\n`;
    csv += "S.No,Roll No,Name\n";

    students.forEach(s => {
      csv += `${s.roll},${s.name}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "student_list.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  /* ===== PRINT ===== */
  const printList = () => {
    const tableHTML = document.getElementById("student-table").outerHTML;

    const win = window.open("", "", "width=900,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Student List</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            h3 { text-align: center; }
          </style>
        </head>
        <body>
          <h3>Student List</h3>
          <p><b>Academic Year:</b> ${filters.academic}</p>
          <p>
            <b>Semester:</b> ${filters.sem} |
            <b>Department:</b> ${filters.dept} |
            <b>Section:</b> ${filters.sec}
          </p>
          <br/>
          ${tableHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="st-page-container">
      <div className="st-top-bar">
        <div className="st-academic">
          <label>Academic Year</label>
          <select
            value={filters.academic}
            onChange={e =>
              setFilters({ ...filters, academic: e.target.value })
            }
          >
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        <div className="st-sem">
          <label>Semester</label>
          <select
            value={filters.sem}
            onChange={e => setFilters({ ...filters, sem: e.target.value })}
          >
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div className="st-dept">
          <label>Department</label>
          <select
            value={filters.dept}
            onChange={e => setFilters({ ...filters, dept: e.target.value })}
          >
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="Mech">Mech</option>
          </select>
        </div>

        <div className="st-sec">
          <label>Section</label>
          <select
            value={filters.sec}
            onChange={e => setFilters({ ...filters, sec: e.target.value })}
          >
            <option value="A">A Section</option>
            <option value="B">B Section</option>
            <option value="C">C Section</option>
          </select>
        </div>
      </div>

      {students.length > 0 && (
        <div className="st-action-row">
      <div className="student-search-box">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>

      
    <div className="st-buttons">
      <button onClick={downloadCSV} className="st-download-btn">Download</button>
      <button onClick={printList} className="st-print-btn">Print</button>
    </div>
  </div>
)}


      {filteredStudents.length > 0 ? (
  <div className="student-table-container">
    <table id="student-table" className="student-table">
      <thead className="student-table-head">
        <tr>
          <th>S.No</th>
          <th>Roll No</th>
          <th>Name</th>
          <th>Student Phone Number</th>
          <th>Parent Phone Number</th>
          <th>Tutor Name</th>
        </tr>
      </thead>

      <tbody className="student-table-body">
        {filteredStudents.map((s, i) => (
          <tr key={s.roll}>
            <td>{i + 1}</td>
            <td>{s.roll}</td>
            <td>{s.name}</td>
            <td>{s.phoneno}</td>
            <td>{s.parentphone}</td>
            <td>{s.tutor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className='student-not-found'>Record Not Found</div>
)}

    </div>
  );
}
