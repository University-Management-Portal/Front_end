import React, { useState } from "react";

const EMPTY_FORM = {
  id: "",
  rollno: "",
  name: "",
  year: "",
  dept: "",
  sec: "",
  phone: "",
  email: "",
  role: "student"
};


function UserForm({ mode, editingUser, onSave, onClose }) {

  const [form, setForm] = useState(() => {
    if (mode === "edit" && editingUser) {
      return editingUser;
    }
    return EMPTY_FORM;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!form.rollno || !form.name) {
      alert("Roll No and Name are required");
      return;
    }

    onSave({
      ...form,
      id: mode === "add" ? String(form.rollno).trim() : form.id,
      role: form.role || "student"
    });

  };

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-[1000]">
      <div className="bg-white w-[440px] max-w-[92%] p-[22px_24px] rounded-[16px] shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all">
        <div className="text-center mb-[18px]">
          <h3 className="text-[20px] font-semibold text-[#2b2b2b]">{mode === "add" ? "Add User" : "Edit User"}</h3>
        </div>

        <div className="grid grid-cols-2 gap-[14px]">
          {Object.keys(form).map((key) =>
            key !== "id" && (
              key === "role" ? (
                <select
                  key={key}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full p-[10px_12px] text-[14px] rounded-[10px] border border-[#d1d1d1] outline-none bg-white transition-all focus:border-[#3a1a78] focus:shadow-[0_0_0_2px_rgba(58,26,120,0.15)] col-span-2"
                >
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                <input
                  key={key}
                  name={key}
                  placeholder={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full p-[10px_12px] text-[14px] rounded-[10px] border border-[#d1d1d1] outline-none transition-all focus:border-[#3a1a78] focus:shadow-[0_0_0_2px_rgba(58,26,120,0.15)] placeholder:capitalize last:nth-[2n+1]:col-span-2"
                />
              )
            )
          )}
        </div>
        <div className="flex justify-end gap-[12px] mt-[22px]">
          <button className="std-btn p-[8px_20px] rounded-[20px] font-medium" onClick={handleSubmit}>Save</button>
          <button className="bg-[#e5e5e5] text-[#333] p-[8px_18px] rounded-[20px] hover:bg-[#d6d6d6] cursor-pointer border-none" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
