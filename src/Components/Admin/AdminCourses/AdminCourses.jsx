import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../api/axiosInstance";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import CourseMenu from "./CourseMenu";
import CourseForm from "./CourseForm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AdminCourses() {
  const COMMON_BG =
    "Advancednet.jpg";
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const res = await axiosInstance.get("/users/role/staff");
      setStaffList(res.data);
    } catch (err) {
      console.error("Failed to fetch staff list:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get("/academic/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/academic/courses");
      const formattedCourses = res.data.map(c => ({
        id: c.id,
        sub: `${c.courseCode} / ${c.courseName}`,
        staffList: c.staffList || [],
        disabled: !c.enabled,
        img: COMMON_BG
      }));
      setCourses(formattedCourses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const menuRef = useRef(null);





  const [openMenuId, setOpenMenuId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [hover1, setHover1] = useState(false);

  // SEARCH FILTER
  const filteredCourses = courses.filter(c =>
    c.sub.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE COURSE
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/academic/courses/${id}`);
      fetchCourses();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  // ENABLE / DISABLE
  const handleToggle = async (id) => {
    try {
      await axiosInstance.put(`/academic/courses/${id}/toggle`);
      fetchCourses();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to toggle course", err);
    }
  };

  // ADD NEW COURSE
  const handleAddCourse = async (data) => {
    const deptExists = departments.some(d => d.code && d.code.toLowerCase() === data.departmentCode.toLowerCase());

    if (!deptExists) {
      setSnackbar({ open: true, message: "department is not exist", severity: "error" });
      return;
    }

    try {
      await axiosInstance.post("/academic/courses", {
        code: data.code,
        name: data.name,
        departmentCode: data.departmentCode,
        credits: data.credits || 3.0
      });
      fetchCourses();
      setSnackbar({ open: true, message: "Course added successfully", severity: "success" });
    } catch (err) {
      console.error("Failed to add course", err);
      // Wait, let's also alert to inform the user if the backend rejected it
      setSnackbar({ open: true, message: "Failed to add course", severity: "error" });
    }
  };

  // ASSIGN FACULTY + SEC
  const handleAssign = async (id, data) => {

    const matchedStaff = staffList.find(
      s => (s.regNo && String(s.regNo).toLowerCase() === String(data.staffId || "").toLowerCase())
    );

    if (!matchedStaff) {
      setSnackbar({ open: true, message: "Staff ID does not exist!", severity: "error" });
      return;
    }

    try {
      await axiosInstance.post(`/academic/courses/${id}/assign`, {
        faculty: matchedStaff.name,
        staffId: data.staffId,
        semester: parseInt(data.semester) || 1,
        academicYear: data.academicYear
      });
      fetchCourses();
      setSnackbar({ open: true, message: "Faculty assigned successfully", severity: "success" });
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to assign faculty", err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || "Unknown error";
      setSnackbar({ open: true, message: `Assignment Failed: ${errMsg}`, severity: "error" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="p-[40px] min-h-[calc(100vh-80px)] bg-[#f6f7fb]">

      <div className="flex justify-between items-center mb-[30px]">

        <div className="flex items-center gap-[10px] bg-white p-[10px_14px] rounded-[30px] w-[320px] shadow-[0_6px_14px_rgba(0,0,0,0.12)]">
          <SearchIcon />
          <input
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none outline-none w-full text-[15px]"
          />
        </div>

        <button
          onClick={() => {
            setOpenMenuId(null);
            setOpenForm(true);
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 20px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            transition: "0.3s",

            backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
            color: "#ffffff"
          }}
        >
          <AddIcon style={{ color: "inherit" }} />
          Add Course
        </button>

      </div>

      <div className="grid grid-cols-3 gap-[36px] pt-[20px] pb-[40px]">

        {filteredCourses.map((course) => (

          <div
            className={`relative h-[250px] rounded-[22px] bg-black cursor-pointer shadow-[0_10px_26px_rgba(0,0,0,0.18)] transition-all transform hover:-translate-y-[8px] hover:shadow-[0_18px_36px_rgba(0,0,0,0.3)] group ${course.disabled ? "grayscale opacity-70" : ""
              } ${openMenuId === course.id ? "z-[100]" : "z-[1]"}`}
            key={course.id}
          >

            <div className="absolute inset-0 rounded-[22px] bg-gradient-to-t from-[#16005d]/90 to-[#16005d]/20 pointer-events-none z-[4]" />

            <img
              src={course.img}
              alt={course.sub}
              className="w-full h-full object-cover rounded-[22px]"
            />

            {/* MORE ICON */}
            <div
              className="absolute top-[16px] right-[16px] z-[6] text-white cursor-pointer hover:opacity-85"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(
                  openMenuId === course.id ? null : course.id
                );
              }}
            >
              <MoreVertIcon />
            </div>

            {openMenuId === course.id && (
              <div ref={menuRef}>
                <CourseMenu
                  enabled={!course.disabled}
                  onAssign={(data) => handleAssign(course.id, data)}
                  onToggle={() => handleToggle(course.id)}
                  onDelete={() => handleDelete(course.id)}
                />
              </div>
            )}

            {/* TEXT */}
            <div className="absolute bottom-[64px] w-full px-[22px] z-[5] text-white">
              <p className="text-[24px] font-bold m-0">
                {course.sub}
              </p>
            </div>

            <div className="absolute bottom-[26px] px-[22px] z-[5] text-white">
              <p className="text-[16px] opacity-90 m-0">
                {course.staffList.length === 0
                  ? "Not Assigned"
                  : course.staffList.map(s => s.name).join(", ")
                }
              </p>
            </div>

          </div>
        ))}

      </div>

      {/* ADD COURSE MODAL */}
      <CourseForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={(data) => {
          handleAddCourse(data);
          setOpenForm(false);
        }}
      />

      {/* SNACKBAR ALERTS */}
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

export default AdminCourses;
