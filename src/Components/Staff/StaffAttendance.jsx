import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Snackbar, Alert } from '@mui/material';

export default function StaffAttendance() {
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
    batch: "2023",
    sem: "5",
    dept: "CSE",
    sec: "A",
    hour: "h1",
    date: new Date().toISOString().split('T')[0],
    courseId: ""
  });

  const [attendance, setAttendance] = useState({});
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [snack, setSnack] = useState({ open: false, text: "", type: "success" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const facultyName = localStorage.getItem("userName");
      console.log("ATTENDANCE - Faculty name from localStorage:", JSON.stringify(facultyName));
      if (!facultyName) {
        console.warn("ATTENDANCE - No userName in localStorage, skipping course fetch");
        return;
      }

      const url = `/academic/courses/faculty/${encodeURIComponent(facultyName)}`;
      console.log("ATTENDANCE - Fetching courses from:", url);
      const res = await axiosInstance.get(url);
      console.log("ATTENDANCE - Courses returned:", res.status, res.data);
      setCourses(res.data);
    } catch (err) {
      console.error("ATTENDANCE - Failed to load courses:", err.response?.status, err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!showReport) {
      fetchStudents();
    }
  }, [filters.dept, filters.sec, filters.sem, filters.batch]);

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get('/users');
      const filtered = res.data.filter(u =>
        u.role === 'STUDENT' &&
        u.department === filters.dept &&
        u.section === filters.sec &&
        String(u.currentSemester) === filters.sem &&
        u.year === filters.batch
      );
      setStudents(filtered);
      // Default all students to "P" (Present)
      const defaultAttendance = {};
      filtered.forEach(s => { defaultAttendance[s.regNo] = "P"; });
      setAttendance(defaultAttendance);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);

  const updateFilter = (field, value) => {
    if (field === "dept") {
      const sections = deptSections[value] || ["A"];
      setFilters(prev => ({ ...prev, dept: value, sec: sections[0] }));
    } else {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
    setAttendance({});
    setShowReport(false);
  };

  const markAttendance = (roll, status) => {
    setAttendance(prev => ({
      ...prev,
      [roll]: status,
    }));
  };

  const fetchReport = async () => {
    try {
      const qs = `?academicYear=${filters.batch}&semester=${filters.sem}&department=${filters.dept}&section=${filters.sec}&date=${filters.date}&hour=${filters.hour}`;
      console.log("REPORT - Fetching:", `/academic/attendance/report${qs}`);
      const res = await axiosInstance.get(`/academic/attendance/report${qs}`);
      console.log("REPORT - Data received:", res.data);
      setReportData(res.data);
      setShowReport(true);
    } catch (err) {
      console.error("REPORT - Error:", err.response?.status, err.response?.data || err.message);
      setSnack({ open: true, text: err.response?.data?.message || "Failed to load report", type: "error" });
    }
  };

  const handleSave = async () => {
    if (!filters.date) {
      setSnack({ open: true, text: "Please select a date first", type: "warning" });
      return;
    }
    if (!filters.courseId) {
      setSnack({ open: true, text: "Please select a course", type: "warning" });
      return;
    }

    for (let s of students) {
      if (!attendance[s.regNo]) {
        setSnack({ open: true, text: "All students must be marked", type: "warning" });
        return;
      }
    }

    const payload = {
      academicYear: filters.batch,
      semester: parseInt(filters.sem),
      department: filters.dept,
      section: filters.sec,
      hour: filters.hour,
      date: filters.date,
      courseId: parseInt(filters.courseId),
      students: students.map(s => ({
        studentId: s.id,
        studentName: s.name,
        rollNo: s.regNo,
        status: attendance[s.regNo]
      }))
    };

    try {
      await axiosInstance.post('/academic/attendance/mark', payload);
      setSnack({ open: true, text: "Attendance Saved Successfully", type: "success" });
      // Auto-show the report from DB after saving
      await fetchReport();
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Failed to save attendance";
      setSnack({ open: true, text: errMsg, type: "error" });
    }
  };

  const handleDownload = () => {
    let content = `
Batch         : ${filters.batch}
Semester      : ${filters.sem}
Department    : ${filters.dept}
Section       : ${filters.sec}
Date          : ${filters.date}
Hour          : ${filters.hour.toUpperCase()}

Attendance Report
-----------------------------
Roll No       Status
-----------------------------
`;

    reportData.forEach(r => {
      content += `${r.rollNo}        ${r.status}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Attendance_${filters.dept}_${filters.sem}_${filters.sec}_${filters.date}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#f6f7fb]">

      <div className="max-w-[1499px] bg-[#16005D] p-[20px_25px] rounded-[12px] text-white flex gap-[55px] items-center flex-wrap">
        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[54px]">JoinYear</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black"
            value={filters.batch}
            onChange={e => updateFilter("batch", e.target.value)}
          >
            <option>2029</option>
            <option>2028</option>
            <option>2027</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[64px]">Course</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.courseId}
            onChange={e => updateFilter("courseId", e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.courseName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[64px]">Semester</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sem}
            onChange={e => updateFilter("sem", e.target.value)}
          >
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[54px]">Department</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black"
            value={filters.dept}
            onChange={e => updateFilter("dept", e.target.value)}
          >
            {Object.keys(deptSections).map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[68px]">Section</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sec}
            onChange={e => updateFilter("sec", e.target.value)}
          >
            {(deptSections[filters.dept] || ["A"]).map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[68px]">Hours</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.hour}
            onChange={e => updateFilter("hour", e.target.value)}
          >
            <option value="h1">1</option>
            <option value="h2">2</option>
            <option value="h3">3</option>
            <option value="h4">4</option>
            <option value="h5">5</option>
            <option value="h6">6</option>
            <option value="h7">7</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[65px]">Date</label>
          <input type="date"
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] bg-white text-black"
            onChange={e => updateFilter("date", e.target.value)}
          />
        </div>
      </div>

      {!showReport && (
        <div className="flex flex-row m-[10px] ml-[1160px] gap-[10px]">
          <button
            onClick={handleSave}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              width: "150px",
              height: "44px",
              margin: "10px",
              marginRight: "20px",
              borderRadius: "8px",
              border: "2px solid #16005d",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Save
          </button>

          <button
            onClick={fetchReport}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={{
              width: "150px",
              height: "44px",
              margin: "10px",
              marginRight: "20px",
              borderRadius: "8px",
              border: "2px solid #16005d",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",

              backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Report
          </button>

        </div>
      )
      }

      {
        !showReport && students.length > 0 && (
          <div className="overflow-x-auto w-full px-[20px] mb-[20px]">
            <table className="w-full table-auto border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-[#16005D] text-white">
                  <th className="w-[80px] text-center border border-[#ccc] p-4 text-[15px]">S.No</th>
                  <th className="text-center border border-[#ccc] p-4 text-[15px]">Name</th>
                  <th className="text-center border border-[#ccc] p-4 text-[15px]">Roll No</th>
                  <th className="text-center border border-[#ccc] p-4 text-[15px]">{filters.hour.toUpperCase()}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.regNo} className="hover:bg-gray-50 transition-colors">
                    <td className="w-[80px] text-center border border-[#ccc] p-4">{i + 1}</td>
                    <td className="text-center border border-[#ccc] p-4 font-medium">{s.name}</td>
                    <td className="text-center border border-[#ccc] p-4 text-gray-700">{s.regNo}</td>
                    <td className="text-center border border-[#ccc] p-4">
                      <label className="mr-4 cursor-pointer">
                        <input
                          type="radio"
                          name={s.regNo}
                          checked={attendance[s.regNo] === "P"}
                          onChange={() => markAttendance(s.regNo, "P")}
                        />{" "}
                        P
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={s.regNo}
                          checked={attendance[s.regNo] === "A"}
                          onChange={() => markAttendance(s.regNo, "A")}
                        />{" "}
                        A
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }



      {
        showReport && (
          <div className="mt-4">
            <h4 className="text-center text-xl font-bold">Attendance Report</h4>

            <div className="text-end mt-4">
              <button
                onClick={handleDownload}
                onMouseEnter={() => setHover3(true)}
                onMouseLeave={() => setHover3(false)}
                style={{
                  width: "150px",
                  height: "44px",
                  margin: "10px",
                  marginRight: "20px",
                  borderRadius: "8px",
                  border: "2px solid #16005d",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s",

                  backgroundColor: hover3 ? "#16005d" : "#ffffff",
                  color: hover3 ? "#ffffff" : "#16005d",
                }}
              >
                Download
              </button>

              <button
                onClick={() => setShowReport(false)}
                onMouseEnter={() => setHover4(true)}
                onMouseLeave={() => setHover4(false)}
                style={{
                  width: "150px",
                  height: "44px",
                  margin: "10px",
                  marginRight: "20px",
                  borderRadius: "8px",
                  border: "2px solid #16005d",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s",

                  backgroundColor: hover4 ? "#16005d" : "#ffffff",
                  color: hover4 ? "#ffffff" : "#16005d",
                }}
              >
                Back
              </button>

            </div>



            <table className="w-full border-collapse mt-3">
              <thead>
                <tr className="bg-[#16005D] text-white">
                  <th className="p-3 border border-[#ccc]">Roll No</th>
                  <th className="p-3 border border-[#ccc]">{filters.hour.toUpperCase()}</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((record) => (
                    <tr key={record.rollNo}>
                      <td className="p-3 border border-[#ccc] text-center">{record.rollNo}</td>
                      <td className="p-3 border border-[#ccc] text-center">{record.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-3 border border-[#ccc] text-center">No attendance recorded</td>
                  </tr>
                )}
              </tbody>
            </table>


          </div>
        )
      }

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.type} sx={{ width: '100%' }}>
          {snack.text}
        </Alert>
      </Snackbar>

    </div >
  );
}
