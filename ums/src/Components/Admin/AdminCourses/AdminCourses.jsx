import React, { useState } from "react";
import "./AdminCourses.css";
import courseData from "../../Student/Courses.js";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import CourseMenu from "./CourseMenu";
import CourseForm from "./CourseForm";
import AssignStaffModal from "./AssignStaffModal";

function AdminCourses() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState(
    courseData.map(c => ({
      ...c,
      id: c.sub,
      disabled: false,
      staffs: []         
    }))
  );

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [assignCourse, setAssignCourse] = useState(null);

  const filteredCourses = courses.filter(c =>
    c.sub.toLowerCase().includes(search.toLowerCase())
  );

  const addCourse = (course) => {
    setCourses(prev => [
      { ...course, staffs: [], disabled: false },
      ...prev
    ]);
    setShowAddForm(false);
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  const toggleCourse = (id) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, disabled: !c.disabled } : c
      )
    );
    setOpenMenuId(null);
  };

  const assignStaff = (staff) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === assignCourse.id
          ? { ...c, staffs: [...c.staffs, staff] }
          : c
      )
    );
    setAssignCourse(null);
    setOpenMenuId(null);
  };

  return (
    <div className="admin-course-page">

      {/* TOP BAR */}
      <div className="admin-course-topbar">
        <div className="course-search">
          <SearchIcon />
          <input
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="add-course-btn" onClick={() => setShowAddForm(true)}>
          <AddIcon /> Add Course
        </button>
      </div>

      <div className="admin-course-container">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className={`admin-course-card ${course.disabled ? "disabled" : ""}`}
          >
            <img src={course.img || "/course-default.jpg"} alt={course.sub} />

            <MoreVertIcon
              className="more-icon"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === course.id ? null : course.id);
              }}
            />

            {openMenuId === course.id && (
              <CourseMenu
                enabled={!course.disabled}
                onAssign={() => setAssignCourse(course)}
                onToggle={() => toggleCourse(course.id)}
                onDelete={() => deleteCourse(course.id)}
              />
            )}

            <div className="admin-course-header">
              <p>{course.sub}</p>
            </div>
          </div>
        ))}
      </div>

      
      <CourseForm
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSave={addCourse}
      />

      <AssignStaffModal
        open={!!assignCourse}
        onClose={() => setAssignCourse(null)}
        onAssign={assignStaff}
      />
    </div>
  );
}

export default AdminCourses;
