import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AssignmentData from "./AssignmentData";

function AssignmentReportTable() {
  const { state } = useLocation();
  const { academic, sem, dept, sec, assignment } = state;

  const assignmentData =
    AssignmentData[academic][sem][dept][sec].find(
      (a) => a.assignment === assignment
    );

  const [editMode, setEditMode] = useState(false);
  const [students, setStudents] = useState(assignmentData.students);

  const handleMarkChange = (index, value) => {
    const updated = [...students];
    updated[index].mark = value;
    setStudents(updated);
  };

  return (
    <div className="admin-report-page">
      <h2>
        {assignment} – Assignment Marks ({dept}-{sec})
      </h2>

      <div style={{ marginTop: "20px" }}>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="admin-buttons">
            Edit
          </button>
        ) : (
          <button onClick={() => setEditMode(false)} className="admin-buttons">
            Save
          </button>
        )}

        <button style={{ marginLeft: "10px" }} className="admin-buttons">
          Download
        </button>
      </div>

      <br />

      <table className="mark-table">
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, i) => (
            <tr key={i}>
              <td>{stu.regNo}</td>
              <td>{stu.name}</td>
              <td>
                {editMode ? (
                  <input
                    type="number"
                    value={stu.mark}
                    onChange={(e) =>
                      handleMarkChange(i, e.target.value)
                    }
                  />
                ) : (
                  stu.mark
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentReportTable;
