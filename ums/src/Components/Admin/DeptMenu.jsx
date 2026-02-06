import React, { useState, useEffect } from "react";

function DeptMenu({ onEdit, enabled, onToggle, onDelete, hod }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [hover1, setHover1] = useState(false);

  useEffect(() => {
    setValue(hod || "");
  }, [hod]);

  if (edit) {
    return (
      <div
        className="absolute top-[48px] right-[16px] bg-white p-[12px] rounded-[12px] w-[220px] shadow-lg z-[50]"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter HOD name"
          className="w-full p-[8px] border rounded mb-[10px] outline-none"
        />

        <button
          className="w-full bg-[#16005d] text-white p-[8px] rounded font-semibold"
          onClick={() => {
            onEdit(value);
            setEdit(false);
          }}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div
      className="absolute top-[48px] right-[16px] bg-white rounded-[12px] w-[160px] shadow-lg z-[50]"
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className="px-[14px] py-[10px] cursor-pointer hover:bg-gray-100"
        onClick={() => setEdit(true)}
      >
        Edit HOD
      </p>

      <p
        className="px-[14px] py-[10px] cursor-pointer hover:bg-gray-100"
        onClick={onToggle}
      >
        {enabled ? "Disable" : "Enable"}
      </p>

      <p
        className="px-[14px] py-[10px] cursor-pointer text-red-600 hover:bg-gray-100"
        onClick={onDelete}
      >
        Delete
      </p>
    </div>
  );
}

export default DeptMenu;
