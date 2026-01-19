import React, { useState } from 'react'
import './StaffAssignments.css'
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { useLocation } from "react-router-dom";


export default function StaffAssignment() {

  const location = useLocation();
  const { subject, dept } = location.state || {};

  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
 

  const getStatus = (due) => {
    const today = new Date();
    return new Date(due) >= today ? "OPEN" : "CLOSED";
  };

  const handleAdd = () => {
    if (!title || !dueDate || !file) {
      alert("All fields required");
      return;
    }

    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        title,
        dueDate,
        file,
        enabled: true
      }
    ]);

    setTitle('');
    setDueDate('');
    setFile(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const toggleEnable = (id) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  return (
    <div className="assignment-container">
      <div className="assignment-wrapper">

        <div className="top-bar">
          <p className="title">
          {subject} / {dept} / Assignment
          </p>

          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <BsPlusLg /> Add Assignment
          </button>
        </div>


        {/* FORM */}
        {showForm && (
          <div className="form-card">
            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setFile(e.target.files[0])}
            />

            <button className="save-btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {assignments.length === 0 ? (
          <div className="empty">No assignments here 📄</div>
        ) : (
          <table className="tables">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a, index) => (
                <tr key={a.id} className={!a.enabled ? "disabled" : ""}>
                  <td>{a.title}</td>
                  <td>{a.dueDate}</td>

                  <td className={getStatus(a.dueDate) === "OPEN" ? "Open" : "closed"}>
                    {getStatus(a.dueDate)}
                  </td>

                  <td className="menu">
                    <BsThreeDotsVertical
                      onClick={() =>
                        setActiveMenu(activeMenu === index ? null : index)
                      }
                    />

                    {activeMenu === index && (
                      <div className="dropdown">
                        <p onClick={() => toggleEnable(a.id)}>
                          {a.enabled ? "Disable" : "Enable"}
                        </p>
                        <p onClick={() => handleDelete(a.id)}>Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  )
}
