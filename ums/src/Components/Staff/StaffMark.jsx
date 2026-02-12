import React, { useState } from 'react'
import * as XLSX from 'xlsx'

export default function StaffMark() {

  const [students, setStudents] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

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

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(students)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks")
    XLSX.writeFile(workbook, "Internal_Marks.xlsx")
  }

  const handleChange = (index, field, value) => {
    const updated = [...students]
    updated[index][field] = value
    setStudents(updated)
  }

  return (
    <div className="w-full h-screen p-[15px] bg-[#f5f6fa] overflow-y-hidden">

      <div className="max-w-[1499px] bg-[#16005D] p-[20px_25px] rounded-[12px] text-white mr-[20px] flex gap-[105px] items-center flex-wrap">

        <div className="academic">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Academic Year</label>
          <select className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black">
            <option>2025 - 2026</option>
            <option>2024 - 2025</option>
            <option>2023 - 2024</option>
          </select>
        </div>

        <div className="sem">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Semester</label>
          <select className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black">
            <option>Semester 5</option>
            <option>Semester 6</option> </select>
        </div>

        <div className="dept">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Department</label>
          <select className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[52px] text-black">
            <option>CSE</option>
            <option>ECE</option>
            <option>MECH</option>
            <option>CIVIL</option> </select>
        </div>

        <div className="sec">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Section</label>
          <select className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black">
            <option>C Section</option>
            <option>A Section</option>
            <option>B Section</option> </select>
        </div>

        <div className="sub">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Subject</label>
          <select className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[49px] text-black">
            <option>JAVA</option>
            <option>DBMS</option>
            <option>DSA</option>
            <option>AA</option>
            <option>CN</option> </select>
        </div>

      </div>

      <div className="w-full flex justify-between items-center my-[25px]">

        <label className="p-0 w-[210px] rounded-[10px] h-[38px] text-center font-medium pt-[5px] block std-btn">
          + Upload Internal Mark
          <input type="file" accept=".xlsx,.xls" hidden onChange={handleUpload} />
        </label>

        <button className="p-0 w-[100px] rounded-[10px] h-[44px] ml-[750px] std-btn" onClick={() => setEditMode(true)}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          Edit
        </button>

        <button className="p-0 w-[100px] rounded-[10px] h-[44px] std-btn" onClick={() => setEditMode(false)}
          style={{
            backgroundColor: hover2 ? "#ffffff" : "#16005d",
            color: hover2 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
        >
          Save
        </button>

        <button className="p-0 w-[150px] rounded-[10px] h-[44px] mr-[20px] std-btn" onClick={handleDownload}
          style={{
            backgroundColor: hover3 ? "#ffffff" : "#16005d",
            color: hover3 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
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
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", fontSize: "15px", color: "#1320b4" }}>
                  Upload Excel to view data
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr key={i}>
                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">{s.Name}</td>
                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">{s["Roll No"]}</td>

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
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

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
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

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
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

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
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

                  <td className="p-[10px] text-[14px] border border-[#c9c9c9]">
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
