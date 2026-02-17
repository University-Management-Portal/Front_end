import React, { useState } from "react";

function DeptForm({ open, onClose, onSave }) {

  const [form, setForm] = useState({
    name: "",
    hod: ""
  });

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  if (!open) return null;
  

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-[2000]" onClick={onClose}>

      <div className="w-[380px] bg-white rounded-[14px] p-[22px]" onClick={(e) => e.stopPropagation()}>

        <h3 className="mb-[14px] text-lg font-bold">
          Add Department
        </h3>

        <input
          placeholder="Department Name"
          className="w-full p-[10px] mb-[12px] border rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="HOD Name"
          className="w-full p-[10px] mb-[12px] border rounded"
          value={form.hod}
          onChange={(e) =>
            setForm({ ...form, hod: e.target.value })
          }
        />

        <div className="flex justify-end gap-[10px]">

          <button
          onClick={onClose}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",

            backgroundColor: hover1 ? "#16005d" : "#ffffff",
            color: hover1 ? "#ffffff" : "#16005d",
          }}
        >
          Cancel
        </button>


          <button
           onClick={() => {
            if (!form.name || !form.hod) {
              alert("Enter all fields");
              return;
            }

            onSave(form);
            setForm({ name: "", hod: "" });
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",

            backgroundColor: hover2 ? "#16005d" : "#ffffff",
            color: hover2 ? "#ffffff" : "#16005d",
          }}
        >
          Save
        </button>


        </div>

      </div>
    </div>
  );
}

export default DeptForm;
