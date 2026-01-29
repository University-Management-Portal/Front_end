import React, { useState } from "react";
import "./AdminUser.css"

const EMPTY_FORM = {
  id: "",
  rollno: "",
  name: "",
  year: "",
  dept: "",
  sec: "",
  phone: "",
  email: "",
  role: ""
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
      id: mode === "add" ? form.rollno : form.id
    });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <div className="userform-title">
          <h3>{mode === "add" ? "Add User" : "Edit User"}</h3>
        </div>

        <div className="userform-fields">
            {Object.keys(form).map((key) =>
              key !== "id" && (
                key === "role" ? (
                  <select
                    key={key}
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
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
                  />
                )
              )
            )}
          </div>
        <div className="userform-actions">
          <button className="btn primary userform-save" onClick={handleSubmit}>Save</button>
          <button className="btn cancel userform-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
