import React, { useState } from "react";

function CourseMenu({ onAssign, enabled, onToggle, onDelete }) {

  const [showAssign, setShowAssign] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [form, setForm] = useState({
    faculty: "",
    dept: "",
    sec: ""
  });

  if (showAssign) {
    return (
      <div className="absolute top-[48px] right-[16px] bg-white rounded-[8px] w-[200px] shadow-[0_8px_20px_rgba(0,0,0,0.25)] z-[20] p-[10px]">

        <input
          placeholder="Faculty Name"
          className="w-full p-[6px] mb-[8px] border border-[#ccc] rounded"
          value={form.faculty}
          onChange={(e) => setForm({ ...form, faculty: e.target.value })}
        />

        <input
          placeholder="Department"
          className="w-full p-[6px] mb-[8px] border border-[#ccc] rounded"
          value={form.dept}
          onChange={(e) => setForm({ ...form, dept: e.target.value })}
        />

        <input
          placeholder="Section"
          className="w-full p-[6px] mb-[8px] border border-[#ccc] rounded"
          value={form.sec}
          onChange={(e) => setForm({ ...form, sec: e.target.value })}
        />

        <button
          className="w-full std-btn p-[6px] rounded"
          onClick={() => {
            onAssign(form);
            setShowAssign(false);
          }}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          Assign
        </button>

      </div>
    );
  }

  return (
    <div className="absolute top-[48px] right-[16px] bg-white rounded-[8px] w-[140px] shadow-[0_8px_20px_rgba(0,0,0,0.25)] z-[20]">
      <p className="p-[10px_14px] m-0 cursor-pointer font-medium hover:bg-[#f1f1f1]" onClick={() => setShowAssign(true)}>
        Assign
      </p>

      <p className="p-[10px_14px] m-0 cursor-pointer font-medium hover:bg-[#f1f1f1]" onClick={onToggle}>
        {enabled ? "Disable" : "Enable"}
      </p>

      <p className="p-[10px_14px] m-0 cursor-pointer font-medium hover:bg-[#f1f1f1] text-[#b00020]" onClick={onDelete}>
        Delete
      </p>
    </div>
  );
}

export default CourseMenu;
