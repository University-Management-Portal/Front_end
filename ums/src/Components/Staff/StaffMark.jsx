import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import './StaffMark.css'

export default function StaffMark() {

  const [students, setStudents] = useState([])

  // Excel Upload
  const handleUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (evt) => {
      const data = evt.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      setStudents(parsedData)
    }

    reader.readAsBinaryString(file)
  }

  // Excel Download
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(students)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks")
    XLSX.writeFile(workbook, "Internal_Marks.xlsx")
  }

  return (
    <div className="staff-mark-container">

      {/* TOP BAR */}
      <div className="top-bar">

        <div className="field">
          <label>Academic Year</label>
          <select>
            <option>2025 - 2026</option>
            <option>2024 - 2025</option>
            <option>2023 - 2024</option>
          </select>
        </div>

        <div className="field">
          <label>Semester</label>
          <select>
            <option>Semester 5</option>
            <option>Semester 6</option>
          </select>
        </div>

        <div className="field">
          <label>Department</label>
          <select>
            <option>CSE</option>
            <option>ECE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>
        </div>

        <div className="field">
          <label>Section</label>
          <select>
            <option>C Section</option>
            <option>A Section</option>
            <option>B Section</option>
          </select>
        </div>

      </div>

      {/* ACTION BAR */}
      <div className="action-bar">
        <label className="upload-btn">
          + Upload Internal Mark
          <input type="file" accept=".xlsx,.xls" hidden onChange={handleUpload} />
        </label>

        <button className="download-btn" onClick={handleDownload}>
          Download
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Internal 1</th>
              <th>Internal 2</th>
              <th>Assignment 1</th>
              <th>Assignment 2</th>
              <th>Lab Mark</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Upload Excel to view data
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr key={i}>
                  <td>{s.Name}</td>
                  <td>{s["Roll No"]}</td>
                  <td>{s.Internal1}</td>
                  <td>{s.Internal2}</td>
                  <td>{s.Assignment1}</td>
                  <td>{s.Assignment2}</td>
                  <td>{s["Lab Mark"]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
