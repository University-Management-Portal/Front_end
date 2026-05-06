import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import * as XLSX from "xlsx";

const departmentSections = {
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

function AdminInternalReport() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
  });

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);

  useEffect(() => {
    const fetchMarksAndStudents = async () => {
      setLoading(true);
      try {
        // 1. Fetch ALL marks for this specific class
        const marksRes = await axiosInstance.get("/academic/marks", {
          params: {
            academicYear: filters.academic,
            semester: parseInt(filters.sem),
            department: filters.dept,
            section: filters.sec,
          },
        });
        const existingMarks = marksRes.data;

        // 2. Fetch Assigned Courses as a baseline
        const courseRes = await axiosInstance.get(
          `/academic/courses/department/${filters.dept}/filter`,
          { params: { semester: filters.sem, academicYear: filters.academic } }
        );
        const assignedCourses = courseRes.data.filter(c => c.enabled).map(c => c.courseName);

        // Combine assigned courses WITH database mark courses dynamically
        const uniqueSubjects = new Set(assignedCourses);
        existingMarks.forEach(m => {
          if (m.subject) uniqueSubjects.add(m.subject);
        });
        const allCourseNames = Array.from(uniqueSubjects).sort();
        setCourses(allCourseNames);

        // 3. Fetch ALL theoretical students for this class via user service
        const usersRes = await axiosInstance.get('/users');
        const academicStartYear = parseInt(filters.academic.split("-")[0]);
        const sem = parseInt(filters.sem);
        const yearOffset = Math.ceil(sem / 2) - 1;

        const classStudents = usersRes.data.filter(u => {
          if (u.role !== 'STUDENT') return false;
          if (u.department !== filters.dept) return false;
          // Note: If you want cross-section marks, verify against section.
          if (u.section !== filters.sec) return false;

          const joinYear = parseInt(u.year);
          return (joinYear + yearOffset) === academicStartYear;
        });

        // 4. Combine theoretical students WITH any student who has a Mark in the DB (safeguard)
        const studentRegistrations = new Map();
        classStudents.forEach(stu => {
          studentRegistrations.set(stu.regNo, stu.name);
        });
        existingMarks.forEach(m => {
          if (!studentRegistrations.has(m.rollNo)) {
            studentRegistrations.set(m.rollNo, m.studentName || "-");
          }
        });

        // 5. Map every verified valid student into the pivot table
        const mergedStudents = [];
        studentRegistrations.forEach((name, rollNo) => {
          const studentMarkMap = {};

          allCourseNames.forEach(cName => {
            const m = existingMarks.find(mark => mark.rollNo === rollNo && mark.subject === cName);
            studentMarkMap[cName] = m && m.totalMark !== null ? parseFloat(m.totalMark).toFixed(1) : "-";
          });

          mergedStudents.push({
            rollNo: rollNo,
            studentName: name,
            marks: studentMarkMap
          });
        });

        // Sort alphabetically by Roll No
        mergedStudents.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
        setStudents(mergedStudents);

      } catch (err) {
        console.error("Failed to fetch internal report data", err);
        setStudents([]);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (filters.academic && filters.sem && filters.dept && filters.sec) {
      fetchMarksAndStudents();
    }
  }, [filters.academic, filters.sem, filters.dept, filters.sec]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dept") {
      setFilters({ ...filters, dept: value, sec: departmentSections[value]?.[0] || "A" });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleDownload = () => {
    const headerRow1 = [
      "Academic Year", filters.academic,
      "", "Semester", filters.sem,
      "", "Department", filters.dept,
      "", "Section", filters.sec
    ];

    const headerRow2 = []; // Empty row for spacing

    const columnsRow = ["S.No", "Roll No", "Name"];
    courses.forEach(cName => {
      columnsRow.push(cName);
    });

    const wsData = [headerRow1, headerRow2, columnsRow];

    students.forEach((stu, idx) => {
      const row = [
        idx + 1,
        stu.rollNo,
        stu.studentName
      ];
      courses.forEach(cName => {
        row.push(stu.marks[cName]);
      });
      wsData.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Internal Marks");

    const wscols = [
      { wch: 6 },  // S.No
      { wch: 15 }, // Roll No
      { wch: 25 }, // Name
    ];
    courses.forEach(() => wscols.push({ wch: 20 }));
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `Consolidated_Internal_Marks_${filters.dept}_${filters.sec}.xlsx`);
  };

  return (
    <div className="p-[30px] min-h-screen">
      <div className="flex items-center text-[18px] font-medium text-[#16005D] mb-[20px]">
        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          Report
        </span>
        <span className="mx-2">/</span>
        <span>
          Internal Mark
        </span>
      </div>

      <div className="bg-gradient-to-r from-[#1b0066] to-[#12004d] h-[100px] rounded-[14px] flex items-center justify-around px-[30px] w-full max-w-[1458px] mx-auto my-[20px]">
        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Academic Year</label>
          <select name="academic" value={filters.academic} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            <option value="2023-2024">2023 - 2024</option>
            <option value="2024-2025">2024 - 2025</option>
            <option value="2025-2026">2025 - 2026</option>
            <option value="2026-2027">2026 - 2027</option>
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Semester</label>
          <select name="sem" value={filters.sem} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Department</label>
          <select name="dept" value={filters.dept} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {Object.keys(departmentSections).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Section</label>
          <select name="sec" value={filters.sec} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {(departmentSections[filters.dept] || []).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-[15px] gap-[10px]">
        <button
          onClick={handleDownload}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
            backgroundColor: hover3 ? "#16005d" : "#16005d",
            color: "#ffffff"
          }}
        >
          Download
        </button>

        <button
          onClick={() => window.print()}
          onMouseEnter={() => setHover4(true)}
          onMouseLeave={() => setHover4(false)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
            backgroundColor: hover4 ? "#16005d" : "#16005d",
            color: "#ffffff"
          }}
        >
          Print
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border mt-[10px] shadow">
          <thead className="bg-[#16005d] text-white whitespace-nowrap">
            <tr>
              <th className="p-[10px] border-r border-[#ffffff40]">S.No</th>
              <th className="p-[10px] border-r border-[#ffffff40]">Roll No</th>
              <th className="p-[10px] text-left border-r border-[#ffffff40]">Name</th>
              {courses.map((cName, i) => (
                <th key={i} className="p-[10px] border-r border-[#ffffff40]">{cName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3 + courses.length} className="text-center p-[20px] text-gray-500">Loading Report...</td>
              </tr>
            ) : students.length > 0 ? (
              students.map((stu, i) => (
                <tr key={i} className="text-center border-b hover:bg-gray-50">
                  <td className="p-[10px] border-r border-gray-200">{i + 1}</td>
                  <td className="p-[10px] border-r border-gray-200 font-medium">{stu.rollNo}</td>
                  <td className="p-[10px] text-left border-r border-gray-200">{stu.studentName}</td>
                  {courses.map((cName, idx) => (
                    <td key={idx} className={`p-[10px] border-r border-gray-200 font-semibold ${stu.marks[cName] < 20 && stu.marks[cName] !== '-' ? 'text-red-500' : 'text-green-700'}`}>
                      {stu.marks[cName]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3 + courses.length} className="text-center p-[20px] text-gray-500">No students found for this class.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminInternalReport;
