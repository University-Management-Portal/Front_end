import React, { useState } from "react";
import studentsData from "./StudentList";

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
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

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
    csv += "S.No,Roll No,Name,Student Phone,Parent Phone,Tutor\n";

    filteredStudents.forEach((s, i) => {
      csv += `${i + 1},${s.roll},${s.name},${s.phoneno},${s.parentphone},${s.tutor}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_list.csv";
    a.click();
  };

  const printList = () => {
    const tableHTML = document.getElementById("student-table").outerHTML;
    const win = window.open("", "", "width=900,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Student List</title>
          <style>
            table { width:100%; border-collapse:collapse }
            th,td { border:1px solid #000; padding:8px; text-align:center }
          </style>
        </head>
        <body>
          <h3 style="text-align:center">Student List</h3>
          <p><b>Academic Year:</b> ${filters.academic}</p>
          <p>
            <b>Semester:</b> ${filters.sem} |
            <b>Department:</b> ${filters.dept} |
            <b>Section:</b> ${filters.sec}
          </p>
          ${tableHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="min-h-screen flex flex-col p-4">

      <div className="max-w-[1499px] bg-[#16005D] p-[25px] rounded-[12px] text-white flex gap-[190px] items-center flex-wrap">
        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Academic Year</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black"
            value={filters.academic}
            onChange={e => setFilters({ ...filters, academic: e.target.value })}
          >
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[64px]">Semester</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sem}
            onChange={e => setFilters({ ...filters, sem: e.target.value })}
          >
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[54px]">Department</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[52px] text-black"
            value={filters.dept}
            onChange={e => setFilters({ ...filters, dept: e.target.value })}
          >
            <option>CSE</option>
            <option>IT</option>
            <option>EEE</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[68px]">Section</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sec}
            onChange={e => setFilters({ ...filters, sec: e.target.value })}
          >
            <option value="A">A Section</option>
            <option value="B">B Section</option>
            <option value="C">C Section</option>
          </select>
        </div>

      </div>

      <div className="mt-[15px] flex justify-between items-center w-[1480px]">
        <div className="flex">
          <input
            type="text"
            className="w-[200px] p-[10px_14px] text-[14px] border-2 border-[#16005D] rounded-[10px] outline-none placeholder-[#6b7280]"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-[20px] mr-[50px]">
          <button className="std-btn p-[8px_16px] rounded-[8px] font-medium" onClick={downloadCSV}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          >Download</button>
          <button className="std-btn p-[8px_16px] rounded-[8px] font-medium" onClick={printList}
          style={{
            backgroundColor: hover2 ? "#ffffff" : "#16005d",
            color: hover2 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          >Print</button>
        </div>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="mt-[20px] border border-[#ccc] rounded-[6px] w-[1435px]">
          <table id="student-table" className="w-full text-center border-collapse">
            <thead className="bg-[#16005D] sticky top-0 z-[1] text-white">
              <tr>
                <th className="p-[10px] border border-[#ddd]">S.No</th>
                <th className="p-[10px] border border-[#ddd]">Roll No</th>
                <th className="p-[10px] border border-[#ddd]">Name</th>
                <th className="p-[10px] border border-[#ddd]">Student Phone Number</th>
                <th className="p-[10px] border border-[#ddd]">Parent Phone Number</th>
                <th className="p-[10px] border border-[#ddd]">Tutor Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr key={s.roll} className="hover:bg-[#f9f9f9]">
                  <td className="p-[10px] border border-[#ddd]">{i + 1}</td>
                  <td className="p-[10px] border border-[#ddd]">{s.roll}</td>
                  <td className="p-[10px] border border-[#ddd]">{s.name}</td>
                  <td className="p-[10px] border border-[#ddd]">{s.phoneno}</td>
                  <td className="p-[10px] border border-[#ddd]">{s.parentphone}</td>
                  <td className="p-[10px] border border-[#ddd]">{s.tutor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-[40px] p-[40px] text-center w-[1480px] bg-white rounded-[16px] text-black shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
          Record Not Found
        </div>
      )}

    </div>
  );
}
