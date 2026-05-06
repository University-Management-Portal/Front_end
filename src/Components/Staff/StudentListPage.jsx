import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import * as XLSX from "xlsx";

export default function StudentListPage() {
  const deptSections = {
    CSE: ["A", "B", "C"],
    IT: ["A", "B"],
    EEE: ["A", "B"],
    ECE: ["A", "B", "C"],
    CD: ["A"],
    CT: ["A"],
    CYBER: ["A"],
    CIVIL: ["A"],
    MECH: ["A"],
    ETE: ["A"],
    AIDS: ["A", "B"],
    AE: ["A"],
  };
  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
  });

  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get('/users');
        // Calculate: joinYear + yearOffset = academicStartYear
        // yearOffset = ceil(semester / 2) - 1 (sem 1-2 → 0, sem 3-4 → 1, sem 5-6 → 2, sem 7-8 → 3)
        const academicStartYear = parseInt(filters.academic.split("-")[0]);
        const sem = parseInt(filters.sem);
        const yearOffset = Math.ceil(sem / 2) - 1;
        const filtered = res.data.filter(u => {
          if (u.role !== 'STUDENT') return false;
          if (u.department !== filters.dept) return false;
          if (u.section !== filters.sec) return false;
          // Check if student's joinYear + yearOffset matches the selected academic year
          const joinYear = parseInt(u.year);
          return (joinYear + yearOffset) === academicStartYear;
        });
        const mapped = filtered.map(u => ({
          roll: u.regNo,
          name: u.name,
          phoneno: u.phone || "-",
          tutor: u.tutor || "-",
        }));
        setStudents(mapped);
      } catch (err) {
        console.error("Failed to fetch students", err);
        setStudents([]);
      }
    };
    fetchStudents();
  }, [filters.academic, filters.sem, filters.dept, filters.sec]);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toString().includes(search) ||
    s.phoneno?.includes(search) ||
    s.tutor.toLowerCase().includes(search.toLowerCase())
  );

  const downloadExcel = () => {
    const wsData = [
      ["Academic Year", filters.academic],
      ["Semester", filters.sem],
      ["Department", filters.dept],
      ["Section", filters.sec],
      [],
      ["S.No", "Roll No", "Name", "Student Phone Number", "Tutor Name"],
    ];

    filteredStudents.forEach((s, i) => {
      wsData.push([i + 1, s.roll, s.name, s.phoneno, s.tutor]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student List");

    XLSX.writeFile(workbook, "Student_List.xlsx");
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
            <option value="2026-2027">2026 - 2027</option>
            <option value="2025-2026">2025 - 2026</option>
            <option value="2024-2025">2024 - 2025</option>
            <option value="2023-2024">2023 - 2024</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[64px]">Semester</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sem}
            onChange={e => setFilters({ ...filters, sem: e.target.value })}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={String(n)}>Semester {n}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[54px]">Department</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[52px] text-black"
            value={filters.dept}
            onChange={e => {
              const newDept = e.target.value;
              const sections = deptSections[newDept] || ["A"];
              setFilters({ ...filters, dept: newDept, sec: sections[0] });
            }}
          >
            {Object.keys(deptSections).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[68px]">Section</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sec}
            onChange={e => setFilters({ ...filters, sec: e.target.value })}
          >
            {(deptSections[filters.dept] || []).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="mt-[15px] flex justify-between items-center w-[1480px]">
        <div className="relative">
          <svg
            className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#6b7280]"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            className="w-[400px] p-[12px_14px_12px_42px] text-[14px] bg-[#eef0f4] rounded-full outline-none border-none placeholder-[#8a8fa0]"
            placeholder="Search Here"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-[20px] mr-[50px]">
          <button
            onClick={downloadExcel}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "500",
              border: "2px solid #16005d",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Download
          </button>

          <button
            onClick={printList}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "500",
              border: " 2px solid #16005d",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Print
          </button>

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
