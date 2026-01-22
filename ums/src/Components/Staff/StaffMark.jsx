import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import './StaffMark.css'

export default function StaffMark() {

  const [students, setStudents] = useState([])
  const [editMode, setEditMode] = useState(false)

  // Upload Excel
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

  // Download Excel
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(students)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks")
    XLSX.writeFile(workbook, "Internal_Marks.xlsx")
  }

  // Handle cell edit
  const handleChange = (index, field, value) => {
    const updated = [...students]
    updated[index][field] = value
    setStudents(updated)
  }

  return (
    <div className="staff-mark-container">

      <div className="top-bar"> 
        <div className="academic"> 
          <label>Academic Year</label> <select> <option>2025 - 2026</option> <option>2024 - 2025</option> <option>2023 - 2024</option> </select> </div> <div className="sem"> <label>Semester</label> <select> <option>Semester 5</option> <option>Semester 6</option> </select> </div> <div className="dept"> <label>Department</label> <select> <option>CSE</option> <option>ECE</option> <option>MECH</option> <option>CIVIL</option> </select> </div> <div className="sec"> <label>Section</label> <select> <option>C Section</option> <option>A Section</option> <option>B Section</option> </select> </div> </div>
      <div className="action-bar">
        <label className="upload-btn">
          + Upload Internal Mark
          <input type="file" accept=".xlsx,.xls" hidden onChange={handleUpload} />
        </label>

        <button className="edit-btn" onClick={() => setEditMode(true)}>
          Edit
        </button>

        <button className="save-butn" onClick={() => setEditMode(false)}>
          Save
        </button>

        <button className="download-btn" onClick={handleDownload}>
          Download
        </button>
      </div>

      {/* ===== Table ===== */}
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

                  <td>
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Internal1 || ""}
                        onChange={(e) =>
                          handleChange(i, "Internal1", e.target.value)
                        }
                      />
                    ) : s.Internal1}
                  </td>

                  <td>
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Internal2 || ""}
                        onChange={(e) =>
                          handleChange(i, "Internal2", e.target.value)
                        }
                      />
                    ) : s.Internal2}
                  </td>

                  <td>
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Assignment1 || ""}
                        onChange={(e) =>
                          handleChange(i, "Assignment1", e.target.value)
                        }
                      />
                    ) : s.Assignment1}
                  </td>

                  <td>
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Assignment2 || ""}
                        onChange={(e) =>
                          handleChange(i, "Assignment2", e.target.value)
                        }
                      />
                    ) : s.Assignment2}
                  </td>

                  <td>
                    {editMode ? (
                      <input
                        type="number"
                        value={s["Lab Mark"] || ""}
                        onChange={(e) =>
                          handleChange(i, "Lab Mark", e.target.value)
                        }
                      />
                    ) : s["Lab Mark"]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
