import React, { useState } from "react";
import "./StudentList.css";

const studentsData = [
  {
    id: 1,
    name: "Praveen",
    roll: "111",
    phone: "1234567890",
    parent: "Raja",
    parentPhone: "9876543210",
    native: "Namakkal",
    tutor: "Vidya Prabha",
    hd: "H",
    year: "2025-2026",
    semester: "5",
    dept: "CSE",
    section: "C",
  },
  {
    id: 2,
    name: "Naveen",
    roll: "112",
    phone: "1234567890",
    parent: "Murugesan",
    parentPhone: "9876543210",
    native: "Erode",
    tutor: "Vidya Prabha",
    hd: "H",
    year: "2025-2026",
    semester: "5",
    dept: "CSE",
    section: "A",
  },
  {
    id: 3,
    name: "Sachin",
    roll: "113",
    phone: "1234567890",
    parent: "Ramu",
    parentPhone: "9876543210",
    native: "Covai",
    tutor: "Vidya Prabha",
    hd: "D",
    year: "2025-2026",
    semester: "5",
    dept: "CSE",
    section: "C",
  },
];

export default function StudentList() {
  const [filters, setFilters] = useState({
    year: "2025-2026",
    semester: "5",
    dept: "CSE",
    section: "C",
  });

  const filteredStudents = studentsData.filter(
    (s) =>
      s.year === filters.year &&
      s.semester === filters.semester &&
      s.dept === filters.dept &&
      s.section === filters.section
  );

  return (
    <div className="student-container">
      {/* TOP FILTER BAR */}
      <div className="filter-bar">
        <div>
          <label>Academic Year</label>
          <select onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        <div>
          <label>Semester</label>
          <select onChange={(e) => setFilters({ ...filters, semester: e.target.value })}>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div>
          <label>Department</label>
          <select onChange={(e) => setFilters({ ...filters, dept: e.target.value })}>
            <option>CSE</option>
            <option>ECE</option>
          </select>
        </div>

        <div>
          <label>Section</label>
          <select onChange={(e) => setFilters({ ...filters, section: e.target.value })}>
            <option value="A">A Section</option>
            <option value="C">C Section</option>
          </select>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <table className="student-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Roll no</th>
            <th>Phone Number</th>
            <th>Parent Name</th>
            <th>Parent Ph.No</th>
            <th>Native</th>
            <th>Tutor Name</th>
            <th>H / D</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.phone}</td>
                <td>{s.parent}</td>
                <td>{s.parentPhone}</td>
                <td>{s.native}</td>
                <td>{s.tutor}</td>
                <td>{s.hd}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
