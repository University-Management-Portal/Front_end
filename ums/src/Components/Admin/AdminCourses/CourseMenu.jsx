import React from "react";
import "./AdminCourses.css";

function CourseMenu({ onAssign, enabled, onToggle, onDelete }) {
  return (
    <div className="course-menu" onClick={e => e.stopPropagation()}>
      <p onClick={onAssign}>Assign Staff</p>
      <p onClick={onToggle}>{enabled ? "Disable" : "Enable"}</p>
      <p className="danger" onClick={onDelete}>Delete</p>
    </div>
  );
}

export default CourseMenu;
