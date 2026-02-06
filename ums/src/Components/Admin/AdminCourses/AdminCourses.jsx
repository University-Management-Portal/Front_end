import React, { useState } from "react";
import courseData from "../../Student/Courses.js";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import CourseMenu from "./CourseMenu";
import CourseForm from "./CourseForm";

function AdminCourses() {
  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState(
    courseData.map(c => ({
      ...c,
      id: c.sub,
      staffList: [],
      dept: "",
      sec: "",
      disabled: false
    }))
  );

  const [openMenuId, setOpenMenuId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [hover1, setHover1] = useState(false);

  // SEARCH FILTER
  const filteredCourses = courses.filter(c =>
    c.sub.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE COURSE
  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  // ENABLE / DISABLE
  const handleToggle = (id) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, disabled: !c.disabled } : c
      )
    );
    setOpenMenuId(null);
  };

  // ADD NEW COURSE (CODE + NAME ONLY)
  const handleAddCourse = (data) => {
    const newCourse = {
      id: data.code,
      sub: `${data.code} / ${data.name}`,
      staffList: [],
      img: "https://via.placeholder.com/400x250",
      disabled: false,

      // future assign fields
      faculty: "",
      dept: "",
      sec: ""
    };

    setCourses(prev => [...prev, newCourse]);
  };

  // ASSIGN FACULTY + DEPT + SEC
  const handleAssign = (id, data) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id
          ? {
            ...c,
            staffList: [
              ...c.staffList,
              {
                name: data.faculty,
                dept: data.dept,
                sec: data.sec
              }
            ]
          }
          : c
      )
    );

    setOpenMenuId(null);
  };


  return (
    <div className="p-[40px] min-h-[calc(100vh-80px)] bg-[#f6f7fb]">

      {/* TOP BAR */}
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
          className="flex items-center gap-[8px] std-btn p-[14px_20px] rounded-[30px] text-[15px] font-semibold"
          onClick={() => {
            setOpenMenuId(null);
            setOpenForm(true);
          }}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          <AddIcon /> Add Course
        </button>
      </div>

      {/* COURSE GRID */}
      <div className="grid grid-cols-3 gap-[36px] pt-[20px] pb-[40px]">

        {filteredCourses.map((course) => (

          <div
            className={`relative h-[250px] rounded-[22px] overflow-hidden bg-black cursor-pointer shadow-[0_10px_26px_rgba(0,0,0,0.18)] transition-all transform hover:-translate-y-[8px] hover:shadow-[0_18px_36px_rgba(0,0,0,0.3)] group ${course.disabled ? "grayscale opacity-70" : ""
              }`}
            key={course.id}
          >

            <div className="absolute inset-0 bg-gradient-to-t from-[#16005d]/90 to-[#16005d]/20 pointer-events-none z-[4]" />

            <img
              src={course.img}
              alt={course.sub}
              className="w-full h-full object-cover"
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

            {/* MENU */}
            {openMenuId === course.id && (
              <CourseMenu
                enabled={!course.disabled}
                onAssign={(data) => handleAssign(course.id, data)}
                onToggle={() => handleToggle(course.id)}
                onDelete={() => handleDelete(course.id)}
              />
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

    </div>
  );
}

export default AdminCourses;
