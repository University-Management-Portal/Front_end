import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import axiosInstance from '../../api/axiosInstance'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function StaffMark() {

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

  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover5, setHover5] = useState(false);
  const [hoverFetch, setHoverFetch] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [academicYear, setAcademicYear] = useState("")
  const [semester, setSemester] = useState("")
  const [department, setDepartment] = useState("")
  const [section, setSection] = useState("")
  const [courseId, setCourseId] = useState("")

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const facultyName = localStorage.getItem("userName");
      if (!facultyName) return;
      const res = await axiosInstance.get(`/academic/courses/faculty/${encodeURIComponent(facultyName)}`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  }


  const handleDownload = () => {

    if (filteredStudents.length === 0) {
      alert("No data available to download")
      return
    }

    const courseObj = courses.find(c => String(c.id) === courseId);
    const subjectName = courseObj ? courseObj.courseName : "";

    const exportData = filteredStudents.map((s) => ({
      AcademicYear: academicYear,
      Semester: semester,
      Department: department,
      Section: section,
      Subject: subjectName,
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

  const handleFetch = async () => {
    if (!academicYear || !semester || !department || !section || !courseId) {
      setSnackbar({ open: true, message: "Please select all filters", severity: "error" });
      return;
    }

    try {
      const courseObj = courses.find(c => String(c.id) === courseId);
      const subjectName = courseObj ? courseObj.courseName : "";

      const qs = new URLSearchParams({
        academicYear,
        semester,
        department,
        section,
        subject: subjectName,
      }).toString();
      const marksRes = await axiosInstance.get(`/academic/marks?${qs}`);

      if (marksRes.data.length > 0) {
        const mapped = marksRes.data.map(m => ({
          id: m.id,
          studentId: m.studentId, // might not be in response, but that's ok for update
          Name: m.studentName,
          "Roll No": m.rollNo,
          Internal1: m.internal1,
          Internal2: m.internal2,
          Assignment1: m.assignment1,
          Assignment2: m.assignment2,
          "Lab Mark": m.labMark
        }));
        setStudents(mapped);
      } else {
        const usersRes = await axiosInstance.get('/users');
        const filteredUsers = usersRes.data.filter(u =>
          u.role === 'STUDENT' &&
          u.department === department &&
          u.section === section &&
          String(u.currentSemester) === semester
        );

        const mapped = filteredUsers.map(u => ({
          id: null,
          studentId: u.id,
          Name: u.name,
          "Roll No": u.regNo,
          Internal1: "", Internal2: "", Assignment1: "", Assignment2: "", "Lab Mark": ""
        }));
        setStudents(mapped);
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to fetch data", severity: "error" });
    }
  };

  const filteredStudents = students;

  const handleSaveMarks = async () => {
    try {
      const courseObj = courses.find(c => String(c.id) === courseId);
      const subjectName = courseObj ? courseObj.courseName : "";

      const toUpload = [];

      for (let s of students) {
        if (s.id) {
          // Update existing
          await axiosInstance.put(`/academic/marks/${s.id}`, {
            internal1: parseInt(s.Internal1) || 0,
            internal2: parseInt(s.Internal2) || 0,
            assignment1: parseInt(s.Assignment1) || 0,
            assignment2: parseInt(s.Assignment2) || 0,
            labMark: parseInt(s["Lab Mark"]) || 0,
          });
        } else {
          // New record
          toUpload.push({
            studentId: s.studentId,
            studentName: s.Name,
            rollNo: s["Roll No"],
            academicYear: academicYear,
            semester: parseInt(semester),
            department: department,
            section: section,
            subject: subjectName,
            courseId: parseInt(courseId),
            internal1: parseInt(s.Internal1) || 0,
            internal2: parseInt(s.Internal2) || 0,
            assignment1: parseInt(s.Assignment1) || 0,
            assignment2: parseInt(s.Assignment2) || 0,
            labMark: parseInt(s["Lab Mark"]) || 0,
          });
        }
      }

      if (toUpload.length > 0) {
        await axiosInstance.post(`/academic/marks/upload`, toUpload);
      }

      setSnackbar({ open: true, message: "Marks Saved Successfully", severity: "success" });
      setEditMode(false);
      handleFetch(); // Refresh grid
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save marks", severity: "error" });
    }
  };



  return (
    <div className="w-full h-screen p-[15px] bg-[#f5f6fa] overflow-y-hidden">

      <div className="max-w-[1499px] bg-[#16005D] p-[20px_25px] rounded-[12px] text-white mr-[20px] flex gap-[105px] items-center flex-wrap">

        <div className="academic">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Academic Year</label>
          <select value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)} className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black">
            <option value="">Select</option>
            <option value="2026 - 2027">2026 - 2027</option>
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={String(n)}>Semester {n}</option>
            ))}
          </select>
        </div>

        <div className="dept">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Department</label>
          <select value={department}
            onChange={(e) => { setDepartment(e.target.value); setSection((deptSections[e.target.value] || ["A"])[0]); }}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black">
            <option value="">Select</option>
            {Object.keys(deptSections).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="sec">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Section</label>
          <select value={section}
            onChange={(e) => setSection(e.target.value)}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px] pl-[29px] text-black">
            <option value="">Select</option>
            {(deptSections[department] || []).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="sub">
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Course</label>
          <select value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px] text-black">
            <option value="">Select Course</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
          </select>
        </div>

      </div>

      <div className="w-full flex justify-between items-center my-[25px]">

        <button
          onClick={handleFetch}
          onMouseEnter={() => setHoverFetch(true)}
          onMouseLeave={() => setHoverFetch(false)}
          style={{
            width: "150px",
            height: "44px",
            marginLeft: "20px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
            backgroundColor: hoverFetch ? "#2d1a7a" : "#16005d",
            color: "#ffffff",
          }}
        >
          Fetch
        </button>


        <div className="flex items-center gap-4 mr-[20px]">
          <button
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              width: "100px",
              height: "44px",
              borderRadius: "10px",
              border: "2px solid #16005d",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Edit
          </button>


          <button
            onClick={handleSaveMarks}
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
              color: "#ffffff",
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
              borderRadius: "10px",
              border: "2px solid #16005d",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover3 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Download
          </button>
        </div>


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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="standard"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
