import React, { useState } from "react";
import "./AdminCourses.css";

function AssignStaffModal({ open, onClose, onAssign }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const submit = () => {
    if (!name || !email) return alert("Fill all fields");

    onAssign({ name, email });

    setName("");
    setEmail("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3>Assign Staff</h3>

        <input
          placeholder="Staff Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Staff Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={submit}>Assign</button>
        </div>
      </div>
    </div>
  );
}

export default AssignStaffModal;
