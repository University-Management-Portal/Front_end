import React, { useState } from 'react'
import * as XLSX from 'xlsx'

export default function StaffMark() {

  const [students, setStudents] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover5, setHover5] = useState(false);

  const [academicYear, setAcademicYear] = useState("")
  const [semester, setSemester] = useState("")
  const [department, setDepartment] = useState("")
  const [section, setSection] = useState("")
  const [subject, setSubject] = useState("")


  const handleDownload = () => {

  if (filteredStudents.length === 0) {
    alert("No data available to download")
    return
  }

  const exportData = filteredStudents.map((s) => ({
    AcademicYear: s.academicYear,
    Semester: s.semester,
    Department: s.department,
    Section: s.section,
    Subject: s.subject,
    Name: s.Name,
    "Roll No": s["Roll No"],
    Internal1: s.Internal1,
    Internal2: s.Internal2,
    Assignment1: s.Assignment1,
    Assignment2: s.Assignment2,
    "Lab Mark": s["Lab Mark"],
  }))

  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "Marks")

  XLSX.writeFile(workbook, "Internal_Marks.xlsx")
}


  const handleChange = (rollNo, field, value) => {
  const updated = students.map((student) =>
    student["Roll No"] === rollNo
      ? { ...student, [field]: value }
      : student
  )

  setStudents(updated)
}


  const filteredStudents = students.filter(
  (s) =>
    s.academicYear === academicYear &&
    s.semester === semester &&
    s.department === department &&
    s.section === section &&
    s.subject === subject
)

const handleUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (!academicYear || !semester || !department || !section || !subject) {
    alert("Please select all filters before uploading")
    return
  }

  const reader = new FileReader()

  reader.onload = (evt) => {
    const data = evt.target.result
    const workbook = XLSX.read(data, { type: "array" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const parsedData = XLSX.utils.sheet_to_json(sheet)

    if (parsedData.length === 0) {
      alert("Excel file is empty")
      return
    }

    const requiredColumns = [
      "Name",
      "Roll No",
      "Internal1",
      "Internal2",
      "Assignment1",
      "Assignment2",
      "Lab Mark",
    ]

    const fileColumns = Object.keys(parsedData[0])

    const missingColumns = requiredColumns.filter(
      (col) => !fileColumns.includes(col)
    )

    if (missingColumns.length > 0) {
      alert("Missing Columns: " + missingColumns.join(", "))
      return
    }

    const updatedData = parsedData.map((student) => ({
      ...student,
      academicYear,
      semester,
      department,
      section,
      subject,
    }))

    setStudents((prev) => [...prev, ...updatedData])
  }

  reader.readAsArrayBuffer(file)
}



  return (
    <div className="w-full h-screen p-[15px] bg-[#f5f6fa] overflow-y-hidden">

      <div className="max-w-[1499px] bg-[#16005D] p-[20px_25px] rounded-[12px] text-white mr-[20px] flex gap-[105px] items-center flex-wrap">

        <div className="academic">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Academic Year</label>
          <select value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)} className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black">
            <option value="">Select</option>
            <option value="2025 - 2026">2025 - 2026</option>
            <option value="2024 - 2025">2024 - 2025</option>
            <option value="2023 - 2024">2023 - 2024</option>
          </select>
        </div>

        <div className="sem">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Semester</label>
          <select value={semester}
          onChange={(e) => setSemester(e.target.value)}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black">
            <option value="">Select</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option> </select>
        </div>

        <div className="dept">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Department</label>
          <select value={department}
          onChange={(e) => setDepartment(e.target.value)}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[57px] text-black">
            <option value="">Select</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option> </select>
        </div>

        <div className="sec">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Section</label>
          <select value={section}
          onChange={(e) => setSection(e.target.value)}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px] pl-[57px] text-black">
            <option value="">Select</option>
            <option value="C Section">C Section</option>
            <option value="A Section">A Section</option>
            <option value="B Section">B Section</option> </select>
        </div>

        <div className="sub">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Subject</label>
          <select value={subject}
          onChange={(e) => setSubject(e.target.value)}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px] pl-[57px] text-black">
            <option value="">Select</option>
            <option value="JAVA">JAVA</option>
            <option value="DBMS">DBMS</option>
            <option value="DSA">DSA</option>
            <option value="AA">AA</option>
            <option value="CN">CN</option> </select>
        </div>

      </div>

      <div className="w-full flex justify-between items-center my-[25px]">

        <label
          onMouseEnter={() => setHover5(true)}
          onMouseLeave={() => setHover5(false)}
          style={{
          width: "210px",
          height: "38px",
          display: "block",
          textAlign: "center",
          border: "2px solid #16005d",
          paddingTop: "5px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "0.3s",

          backgroundColor: hover5 ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
            }}
          >
            + Upload Internal Mark

          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={handleUpload}
          />
        </label>


        <button
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              width: "100px",
              height: "44px",
              marginLeft: "750px",
              borderRadius: "10px",
              border: "2px solid #16005d",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
                      color:"#ffffff",
            }}
          >
            Edit
          </button>


                  <button
            onClick={() => setEditMode(false)}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={{
              width: "100px",
              height: "44px",
              borderRadius: "10px",
              border: "2px solid #16005d",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
                      color:"#ffffff",
            }}
          >
            Save
          </button>


        <button
        onClick={handleDownload}
        onMouseEnter={() => setHover3(true)}
        onMouseLeave={() => setHover3(false)}
        style={{
          width: "150px",
          height: "44px",
          marginRight: "20px",
          borderRadius: "10px",
          border: "2px solid #16005d",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",

        backgroundColor: hover3 ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
        }}
      >
        Download
      </button>


      </div>

      <div className="w-full bg-white rounded-[12px] p-[15px] overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#16005D] color-white">
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Name</th>
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Roll No</th>
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Internal 1</th>
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Internal 2</th>
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Assignment 1</th>
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Assignment 2</th>
              <th className="p-[12px] text-[14px] font-semibold border border-[#c9c9c9] text-white">Lab Mark</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", fontSize: "15px", color: "#1320b4" }}>
                  Upload Excel to view data
                </td>
              </tr>
            ) : (
              filteredStudents.map((s, i) => (
                <tr key={i}>
                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">{s.Name}</td>
                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">{s["Roll No"]}</td>

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Internal1 || ""}
                        onChange={(e) =>
                          handleChange(s["Roll No"], "Internal1", e.target.value)
                        }
                      />
                    ) : s.Internal1}
                  </td>

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Internal2 || ""}
                        onChange={(e) =>
                          handleChange(s["Roll No"], "Internal2", e.target.value)
                        }
                      />
                    ) : s.Internal2}
                  </td>

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Assignment1 || ""}
                        onChange={(e) =>
                          handleChange(s["Roll No"], "Assignment1", e.target.value)
                        }
                      />
                    ) : s.Assignment1}
                  </td>

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
                    {editMode ? (
                      <input
                        type="number"
                        value={s.Assignment2 || ""}
                        onChange={(e) =>
                          handleChange(s["Roll No"], "Assignment2", e.target.value)
                        }
                      />
                    ) : s.Assignment2}
                  </td>

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
                    {editMode ? (
                      <input
                        type="number"
                        value={s["Lab Mark"] || ""}
                        onChange={(e) =>
                          handleChange(s["Roll No"], "Lab Mark", e.target.value)
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
