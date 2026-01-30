import React from "react";
import "./AdminCourses.css";

function CourseForm({ open, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Add Course</h3>

        <input placeholder="Course Code (CS101)" />
        <input placeholder="Course Name" />
        <input placeholder="Faculty Name" />

        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;
