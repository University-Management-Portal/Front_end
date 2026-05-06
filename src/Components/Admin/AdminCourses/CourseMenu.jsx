import React, { useState } from "react";

function CourseMenu({ onAssign, enabled, onToggle, onDelete }) {

  const [showAssign, setShowAssign] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [form, setForm] = useState({
    staffId: "",
    semester: "",
    academicYear: ""
  });

  if (showAssign) {
    return (
      <div className="absolute top-[48px] right-[16px] bg-white rounded-[8px] w-[240px] shadow-[0_8px_20px_rgba(0,0,0,0.25)] z-[100] p-[14px]">

        <input
          placeholder="Faculty ID "
          className="w-full p-[8px] mb-[10px] border border-[#ccc] rounded-[6px] outline-none text-[14px]"
          value={form.staffId}
          onChange={(e) => setForm({ ...form, staffId: e.target.value })}
        />

        <input
          placeholder="Semester"
          className="w-full p-[8px] mb-[10px] border border-[#ccc] rounded-[6px] outline-none text-[14px]"
          value={form.semester}
          onChange={(e) => setForm({ ...form, semester: e.target.value })}
        />

        <input
          placeholder="Academic Year (2023-2024)"
          className="w-full p-[8px] mb-[12px] border border-[#ccc] rounded-[6px] outline-none text-[14px]"
          value={form.academicYear}
          onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
        />

        <button
          className="w-full border-none p-[10px] rounded-[6px] font-bold cursor-pointer transition-colors"
          onClick={() => {
            onAssign(form);
            setShowAssign(false);
          }}
          style={{
            backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
            color: "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          Assign Course
        </button>

      </div>
    );
  }

  return (
    <div className="absolute top-[48px] right-[19px] bg-white rounded-[8px] w-[140px] shadow-[0_8px_20px_rgba(0,0,0,0.25)] z-[100]">
      <div className="p-[10px_14px] cursor-pointer text-left font-medium hover:bg-[#f1f1f1] rounded-t-[8px]" onClick={() => setShowAssign(true)}>
        Assign
      </div>

      <div className="p-[10px_14px] cursor-pointer text-left font-medium hover:bg-[#f1f1f1]" onClick={onToggle}>
        {enabled ? "Disable" : "Enable"}
      </div>

      <div className="p-[10px_14px] cursor-pointer text-left font-medium hover:bg-[#f1f1f1] text-[#b00020] rounded-b-[8px]" onClick={onDelete}>
        Delete
      </div>
    </div>
  );
}

export default CourseMenu;
