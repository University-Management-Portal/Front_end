import React, { useState } from "react";

function CourseForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    code: "",
    name: ""
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-[2000]" onClick={onClose}>
      <div className="w-[380px] bg-white rounded-[14px] p-[22px]" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-[14px] text-lg font-bold">Add Course</h3>

        <input
          placeholder="Course Code (CS101)"
          className="w-full p-[10px] mb-[12px] rounded-[6px] border border-[#ccc] outline-none"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <input
          placeholder="Course Name"
          className="w-full p-[10px] mb-[12px] rounded-[6px] border border-[#ccc] outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="flex justify-end gap-[10px]">
          <button className="bg-[#ccc] text-black px-4 py-2 rounded cursor-pointer border-none" onClick={onClose}>
            Cancel
          </button>

          <button
            className="std-btn px-4 py-2 rounded"
            onClick={() => {
              if (!form.code || !form.name) {
                alert("Enter course code & name");
                return;
              }

              onSave(form);
              setForm({ code: "", name: "" });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;
