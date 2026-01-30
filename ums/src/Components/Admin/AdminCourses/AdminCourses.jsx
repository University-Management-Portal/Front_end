import React, { useState } from "react";
import "./AdminCourses.css";
import courseData from "../../Student/Courses.js";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import CourseMenu from "./CourseMenu";
import CourseForm from "./CourseForm";

function AdminCourses() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState(
    courseData.map(c => ({ ...c, id: c.sub }))
  );
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const filteredCourses = courses.filter(c =>
    c.sub.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  const handleToggle = (id) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, disabled: !c.disabled } : c
      )
    );
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

        <button
          className="add-course-btn"
          onClick={() => {
            setOpenMenuId(null);
            setOpenForm(true);
          }}
        >
          <AddIcon /> Add Course
        </button>
      </div>

      {/* COURSE GRID */}
      <div className="admin-course-container">
        {filteredCourses.map((course) => (
          <div
            className={`admin-course-card ${course.disabled ? "disabled" : ""}`}
            key={course.id}
          >
            <img src={course.img} alt={course.sub} />

            {/* MORE ICON */}
            <MoreVertIcon
              className="more-icon"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(
                  openMenuId === course.id ? null : course.id
                );
              }}
            />

            {/* MENU */}
            {openMenuId === course.id && (
              <CourseMenu
                enabled={!course.disabled}
                onAssign={() => alert("Assign faculty")}
                onToggle={() => handleToggle(course.id)}
                onDelete={() => handleDelete(course.id)}
              />
            )}

            <div className="admin-course-header">
              <p>{course.sub}</p>
            </div>

            <div className="admin-staff">
              <p>{course.staff}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CourseForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={() => {
          alert("Course saved ");
          setOpenForm(false);
        }}
      />
    </div>
  );
}

export default AdminCourses;
