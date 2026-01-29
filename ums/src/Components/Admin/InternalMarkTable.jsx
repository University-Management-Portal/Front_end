import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InternalMarksData from "./InternalMarksData";

function InternalMarkTable() {
  const { state } = useLocation();
  const { academic, sem, dept, sec, subject } = state;

  const subjectData =
    InternalMarksData[academic][sem][dept][sec].find(
      (s) => s.subject === subject
    );

  const [editMode, setEditMode] = useState(false);
  const [students, setStudents] = useState(subjectData.students);

  const handleMarkChange = (index, value) => {
    const updated = [...students];
    updated[index].mark = value;
    setStudents(updated);
  };

  return (
    <div className="admin-report-page">
      <h2>
        {subject} – Internal Marks ({dept}-{sec})
      </h2>


      <div style={{ marginTop: "20px" }}>
        {!editMode ? (
          <button onClick={() => setEditMode(true)}  className="admin-buttons" >Edit</button>
        ) : (
          <button onClick={() => setEditMode(false)}  className="admin-buttons">Save</button>
        )}

        <button style={{ marginLeft: "10px" }}  className="admin-buttons">
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

export default InternalMarkTable;
