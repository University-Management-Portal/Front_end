import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Snackbar, Alert } from '@mui/material';
import * as XLSX from 'xlsx';

function AdminAttendanceReport() {
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
    date: new Date().toISOString().split('T')[0],
  });

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoverDl, setHoverDl] = useState(false);
  const [hoverEd, setHoverEd] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [studentsList, setStudentsList] = useState([]);
  const [snack, setSnack] = useState({ open: false, text: "", type: "success" });

  const updateFilter = (field, value) => {
    if (field === "dept") {
      const sections = deptSections[value] || ["A"];
      setFilters(prev => ({ ...prev, dept: value, sec: sections[0] }));
    } else {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  // Fetch attendance for all 7 hours and merge into one table
  const fetchAllHours = async () => {
    if (!filters.date) {
      setSnack({ open: true, text: "Please select a date", type: "warning" });
      return;
    }
    setLoading(true);
    try {
      const hours = ["h1", "h2", "h3", "h4", "h5", "h6", "h7"];
      const results = await Promise.all(
        hours.map(h => {
          const qs = `?academicYear=${filters.batch}&semester=${filters.sem}&department=${filters.dept}&section=${filters.sec}&date=${filters.date}&hour=${h}`;
          return axiosInstance.get(`/academic/attendance/report${qs}`)
            .then(res => ({ hour: h, data: res.data }))
            .catch(() => ({ hour: h, data: [] }));
        })
      );

      // Merge: build a map of rollNo → { studentName, rollNo, h1, h2, ...h7 }
      const studentMap = {};
      results.forEach(({ hour, data }) => {
        data.forEach(record => {
          if (!studentMap[record.rollNo]) {
            studentMap[record.rollNo] = {
              studentName: record.studentName || "",
              rollNo: record.rollNo,
              h1: null, h2: null, h3: null, h4: null, h5: null, h6: null, h7: null,
            };
          }
          studentMap[record.rollNo][hour] = record.status;
        });
      });

      // Also fetch students to show all students even if no attendance is marked
      try {
        const usersRes = await axiosInstance.get('/users');
        const filtered = usersRes.data.filter(u =>
          u.role === 'STUDENT' &&
          u.department === filters.dept &&
          u.section === filters.sec &&
          String(u.currentSemester) === filters.sem &&
          u.year === filters.batch
        );
        setStudentsList(filtered);

        filtered.forEach(s => {
          if (!studentMap[s.regNo]) {
            studentMap[s.regNo] = {
              studentName: s.name || "",
              rollNo: s.regNo,
              h1: null, h2: null, h3: null, h4: null, h5: null, h6: null, h7: null,
            };
          }
        });

      } catch (err) {
        console.warn("Could not fetch student list for complete view", err);
      }

      const merged = Object.values(studentMap).sort((a, b) => a.rollNo.localeCompare(b.rollNo));
      setReportData(merged);
    } catch (err) {
      console.error("Failed to fetch attendance report", err);
      setSnack({ open: true, text: "Failed to load report", type: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllHours();
  }, [filters.batch, filters.sem, filters.dept, filters.sec, filters.date]);

  const handleEditToggle = () => {
    setIsEditing(true);
    const newAtt = {};
    reportData.forEach(r => {
      newAtt[r.rollNo] = {
        h1: r.h1 || "-", h2: r.h2 || "-", h3: r.h3 || "-",
        h4: r.h4 || "-", h5: r.h5 || "-", h6: r.h6 || "-", h7: r.h7 || "-"
      };
    });
    setAttendance(newAtt);
  };

  const handleAttChange = (rollNo, hour, val) => {
    setAttendance(p => ({
      ...p,
      [rollNo]: {
        ...p[rollNo],
        [hour]: val
      }
    }));
  };

  const handleDownload = () => {
    const wsData = [
      ["S.No", "Name", "Roll No", "H1", "H2", "H3", "H4", "H5", "H6", "H7"]
    ];
    reportData.forEach((r, i) => {
      wsData.push([
        i + 1, r.studentName, r.rollNo,
        r.h1 || "-", r.h2 || "-", r.h3 || "-", r.h4 || "-",
        r.h5 || "-", r.h6 || "-", r.h7 || "-"
      ]);
    });
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws['!cols'] = [
      { wch: 5 }, { wch: 25 }, { wch: 15 },
      { wch: 5 }, { wch: 5 }, { wch: 5 }, { wch: 5 },
      { wch: 5 }, { wch: 5 }, { wch: 5 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, `Attendance_${filters.dept}_${filters.sem}_${filters.sec}_${filters.date}.xlsx`);
  };

  const handleSaveAttendance = async () => {
    if (!filters.date) {
      setSnack({ open: true, text: "Please select a date first", type: "warning" });
      return;
    }

    if (studentsList.length === 0) return;

    setLoading(true);
    try {
      const hours = ["h1", "h2", "h3", "h4", "h5", "h6", "h7"];

      const payloadPromises = hours.map(h => {
        const payload = {
          academicYear: filters.batch,
          semester: parseInt(filters.sem),
          department: filters.dept,
          section: filters.sec,
          hour: h,
          date: filters.date,
          courseId: null, // Admin override
          students: studentsList.map(s => ({
            studentId: s.id,
            studentName: s.name,
            rollNo: s.regNo,
            status: attendance[s.regNo]?.[h] || "-"
          })).filter(s => s.status !== "-") // Only send valid statuses
        };

        if (payload.students.length === 0) return Promise.resolve();
        return axiosInstance.post('/academic/attendance/mark', payload);
      });

      await Promise.all(payloadPromises);
      setSnack({ open: true, text: "Attendance Saved Successfully", type: "success" });
      setIsEditing(false);
      fetchAllHours();
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Failed to save attendance";
      setSnack({ open: true, text: errMsg, type: "error" });
    }
    setLoading(false);
  };

  const selectStyle = "h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[140px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_10px_center] bg-[length:20px] pl-[14px] text-black";

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#f6f7fb]">

      <div className="flex items-center text-[18px] font-bold text-[#16005D] mb-[16px]">
        <p>Attendance Report</p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-[1499px] bg-[#16005D] p-[20px_40px] rounded-[12px] text-white flex justify-between items-center flex-wrap gap-y-4">

        <div>
          <label className="block text-[14px] mb-[6px] font-medium">JoinYear</label>
          <select className={selectStyle} value={filters.batch} onChange={e => updateFilter("batch", e.target.value)}>
            {["2029", "2028", "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020"].map(y => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium">Semester</label>
          <select className={selectStyle} value={filters.sem} onChange={e => updateFilter("sem", e.target.value)}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>Semester {n}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium">Department</label>
          <select className={selectStyle} value={filters.dept} onChange={e => updateFilter("dept", e.target.value)}>
            {Object.keys(deptSections).map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium">Section</label>
          <select className={selectStyle} value={filters.sec} onChange={e => updateFilter("sec", e.target.value)}>
            {(deptSections[filters.dept] || ["A"]).map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium">Date</label>
          <input type="date"
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] bg-white text-black"
            value={filters.date}
            onChange={e => updateFilter("date", e.target.value)}
          />
        </div>

      </div>

      {/* Actions */}
      <div className="text-end mt-4 flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                border: "2px solid #666",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
                backgroundColor: "#fff",
                color: "#666",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAttendance}
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                border: "2px solid #16005d",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
                backgroundColor: "#16005d",
                color: "#fff",
              }}
            >
              Save Changes
            </button>
          </>
        ) : (
          <>
            {reportData.length > 0 && (
              <button
                onClick={handleDownload}
                onMouseEnter={() => setHoverDl(true)}
                onMouseLeave={() => setHoverDl(false)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "2px solid #16005d",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor: hoverDl ? "#ffffff" : "#16005d",
                  color: hoverDl ? "#16005d" : "#ffffff",
                }}
              >
                Download Excel
              </button>
            )}
            {reportData.length > 0 && (
              <button
                onClick={handleEditToggle}
                onMouseEnter={() => setHoverEd(true)}
                onMouseLeave={() => setHoverEd(false)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "2px solid #16005d",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor: hoverEd ? "#ffffff" : "#16005d",
                  color: hoverEd ? "#16005d" : "#ffffff",
                }}
              >
                Edit Attendance
              </button>
            )}
          </>
        )}
      </div>

      {/* Attendance Table */}
      <div className="mt-4">
        {loading ? (
          <p className="text-center text-gray-500 text-[16px]">Loading...</p>
        ) : isEditing ? (
          /* EDIT MODE TABLE (All Hours Grid) */
          reportData.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#16005d] text-white">
                  <th className="p-3 border border-[#ccc] w-[60px]">S.No</th>
                  <th className="p-3 border border-[#ccc]">Name</th>
                  <th className="p-3 border border-[#ccc]">Roll No</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H1</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H2</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H3</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H4</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H5</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H6</th>
                  <th className="p-3 border border-[#ccc] w-[70px]">H7</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((r, i) => (
                  <tr key={r.rollNo} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 border border-[#ccc] text-center">{i + 1}</td>
                    <td className="p-3 border border-[#ccc] text-center font-medium">{r.studentName}</td>
                    <td className="p-3 border border-[#ccc] text-center">{r.rollNo}</td>
                    {["h1", "h2", "h3", "h4", "h5", "h6", "h7"].map(h => (
                      <td key={h} className="p-3 border border-[#ccc] text-center">
                        <select
                          className="w-[50px] mx-auto p-1 border font-semibold outline-none bg-white text-black"
                          value={attendance[r.rollNo]?.[h] || "-"}
                          onChange={(e) => handleAttChange(r.rollNo, h, e.target.value)}
                        >
                          <option value="-">-</option>
                          <option value="P" className="text-green-600">P</option>
                          <option value="A" className="text-red-600">A</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[#666] text-[16px] text-center mt-8">No students found.</p>
          )
        ) : reportData.length > 0 ? (
          /* READ ONLY FULL REPORT TABLE (All Hours) */
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#16005D] text-white">
                <th className="p-3 border border-[#ccc] w-[60px]">S.No</th>
                <th className="p-3 border border-[#ccc]">Name</th>
                <th className="p-3 border border-[#ccc]">Roll No</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H1</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H2</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H3</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H4</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H5</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H6</th>
                <th className="p-3 border border-[#ccc] w-[70px]">H7</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((r, i) => (
                <tr key={r.rollNo} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 border border-[#ccc] text-center">{i + 1}</td>
                  <td className="p-3 border border-[#ccc] text-center font-medium">{r.studentName}</td>
                  <td className="p-3 border border-[#ccc] text-center">{r.rollNo}</td>
                  {["h1", "h2", "h3", "h4", "h5", "h6", "h7"].map(h => (
                    <td key={h} className={`p-3 border border-[#ccc] text-center font-semibold ${r[h] === "P" ? "text-green-600" : r[h] === "A" ? "text-red-600" : "text-gray-400"
                      }`}>
                      {r[h] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-[#666] text-[16px] text-center mt-8">No attendance records found</p>
        )}
      </div>

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

    </div>
  );
}

export default AdminAttendanceReport;
