import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AdminSchedule() {
  const [academicYear, setAcademicYear] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [timeTable, setTimeTable] = useState(null);
  const [academicCalendar, setAcademicCalendar] = useState(null);
  const [facultyRegNo, setFacultyRegNo] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [hover, setHover] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const menuRef = useRef();

  const [schedules, setSchedules] = useState([]);

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

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axiosInstance.get('/academic/schedules');
      setSchedules(res.data);
    } catch (err) {
      console.error("Failed to fetch schedules", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!facultyRegNo || !timeTable) {
      setSnackbar({ open: true, message: "Faculty ID and Time Table are required", severity: "error" });
      return;
    }

    const formData = new FormData();
    if (academicYear) formData.append("academicYear", academicYear);
    if (year) formData.append("year", parseInt(year));
    if (department) formData.append("department", department);
    if (section) formData.append("section", section);
    formData.append("facultyRegNo", facultyRegNo);
    formData.append("timetable", timeTable);

    if (academicCalendar) {
      formData.append("calendar", academicCalendar);
    }

    try {
      await axiosInstance.post('/academic/schedules', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchSchedules();
      setAcademicYear("");
      setYear("");
      setDepartment("");
      setSection("");
      setFacultyRegNo("");
      setTimeTable(null);
      setAcademicCalendar(null);
      setSnackbar({ open: true, message: "Schedule uploaded successfully", severity: "success" });
    } catch (err) {
      console.error("Upload failed", err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || "Unknown error";
      setSnackbar({ open: true, message: `Upload Failed: ${errMsg}`, severity: "error" });
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axiosInstance.put(`/academic/schedules/${id}/toggle`);
      setOpenMenuId(null);
      fetchSchedules();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axiosInstance.delete(`/academic/schedules/${id}`);
      setOpenMenuId(null);
      fetchSchedules();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl shadow-md"
        style={{ backgroundColor: "#1e0a5a" }}
      >
        <div className="flex justify-between items-center gap-4 px-4">
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="p-2 rounded-lg w-[180px] bg-white text-black border border-gray-300"
          >
            <option value="">Academic Year</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 rounded-lg w-[140px] bg-white text-black border border-gray-300"
          >
            <option value="">Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setSection("");
            }}
            className="p-2 rounded-lg w-[180px] bg-white text-black border border-gray-300"
          >
            <option value="">Department</option>
            {Object.keys(departmentSections).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={section}
            disabled={!department}
            onChange={(e) => setSection(e.target.value)}
            className="p-2 rounded-lg w-[140px] bg-white text-black border border-gray-300 disabled:opacity-50"
          >
            <option value="">Sec</option>
            {department &&
              departmentSections[department].map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
          </select>

          <input
            type="text"
            value={facultyRegNo}
            onChange={(e) => setFacultyRegNo(e.target.value)}
            placeholder="Faculty ID"
            className="p-2 rounded-lg w-[160px] bg-white text-black border border-gray-300"
          />
        </div>

        <div className="flex items-end gap-12 mt-4 px-4">
          <div className="flex flex-col gap-1">
            <span className="text-white text-sm">Time Table</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setTimeTable(e.target.files[0])}
              className="p-2 bg-[#e0e2e7] text-gray-700 rounded-lg w-[280px] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-white text-sm">Academic Calendar</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAcademicCalendar(e.target.files[0])}
              className="p-2 bg-[#e0e2e7] text-gray-700 rounded-lg w-[280px] cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="p-2 rounded-lg font-semibold w-[160px] transition-colors"
            style={{
              backgroundColor: hover ? "#f0f0f0" : "#ffffff",
              color: "#1e0a5a",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Upload
          </button>
        </div>

      </form>





      <div className="mt-10 flex flex-col gap-6">
        {schedules
          .filter(item => academicYear ? item.academicYear === academicYear : true)
          .map((item) => (
            <div
              key={item.id}
              className={`flex justify-between p-6 rounded-xl shadow-md bg-white ${!item.enabled ? "opacity-50" : ""
                }`}
            >
              <div>
                <p className="font-bold text-lg">{item.academicYear}</p>
                <p>Year: {item.year}</p>
                <p>{item.department} - {item.section}</p>
                {item.facultyRegNo && <p>Faculty: {item.facultyRegNo}</p>}

                <div className="div " style={{ flexDirection: "row", display: "flex", gap: "40px" }}>
                  {item.timetableUrl && (
                    <div className="mt-4">
                      <p className="font-semibold">Time Table:</p>
                      <img
                        src={item.timetableUrl}
                        alt="Time Table"
                        className="w-[350px] mt-2 rounded-lg shadow-md object-contain cursor-pointer"
                        style={{ width: "300px", height: "200px" }}
                        onClick={() => window.open(item.timetableUrl, "_blank")}
                      />
                    </div>
                  )}

                  {item.calendarUrl && (
                    <div className="mt-4">
                      <p className="font-semibold">Academic Calendar:</p>
                      <img
                        src={item.calendarUrl}
                        alt="Calendar"
                        className="w-[350px] mt-2 rounded-lg shadow-md object-contain cursor-pointer"
                        style={{ width: "300px", height: "200px" }}
                        onClick={() => window.open(item.calendarUrl, "_blank")}
                      />
                    </div>
                  )}
                </div>

                <p className="mt-3">
                  Status:{" "}
                  <span
                    style={{
                      color: item.enabled ? "green" : "red",
                      fontWeight: "600",
                    }}
                  >
                    {item.enabled ? "Enabled" : "Disabled"}
                  </span>
                </p>
              </div>

              <div className="relative" ref={menuRef}>
                <div
                  className="cursor-pointer text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(item.id);
                  }}
                >
                  ⋮
                </div>

                {openMenuId === item.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border">
                    <p
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleStatus(item.id)}
                    >
                      {item.enabled ? "Disable" : "Enable"}
                    </p>
                    <p
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => deleteSchedule(item.id)}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
