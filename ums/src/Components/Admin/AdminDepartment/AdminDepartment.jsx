import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import "./AdminDepartment.css";

function AdminDepartment() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "COMPUTER SCIENCE AND ENGINEERING", enabled: true },
    { id: 2, name: "INFORMATION TECHNOLOGY", enabled: true },
    { id: 3, name: "ELECTRICAL AND ELECTRONICS ENGINEERING", enabled: true },
    { id: 4, name: "ELECTRONICS AND COMMUNICATION ENGINEERING", enabled: false },
    { id: 5, name: "MECHANICAL ENGINEERING", enabled: true }
  ]);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newDept, setNewDept] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const addDepartment = () => {
    if (!newDept.trim()) return;
    setDepartments([
      ...departments,
      { id: Date.now(), name: newDept.toUpperCase(), enabled: true }
    ]);
    setNewDept("");
    setShowAdd(false);
  };

  const toggleEnable = (id) => {
    setDepartments(departments.map(d =>
      d.id === id ? { ...d, enabled: !d.enabled } : d
    ));
    setOpenMenu(null);
  };

  const deleteDept = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="dept-page">

      <div className="dept-topbar">
        <div className="dept-search">
          <SearchIcon />
          <input
            placeholder="Search Department"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="dept-btn-primary" onClick={() => setShowAdd(true)}>
          <AddIcon /> Add
        </button>
      </div>

      <div className="dept-grid">
        {filtered.map((d) => (
          <div key={d.id} className={`dept-card ${!d.enabled ? "dept-disabled" : ""}`}>
            <div className="dept-name">{d.name}</div>

            <div className="dept-menu">
              <button onClick={() => setOpenMenu(openMenu === d.id ? null : d.id)}>
                <MoreVertIcon />
              </button>

              {openMenu === d.id && (
                <div className="dept-dropdown">
                  <button onClick={() => toggleEnable(d.id)}>
                    {d.enabled ? "Disable" : "Enable"}
                  </button>
                  <button className="dept-danger" onClick={() => deleteDept(d.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="dept-modal">
          <div className="dept-modal-box">
            <h3>Add Department</h3>
            <input
              placeholder="Department Name"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
            />
            <div className="dept-modal-actions">
              <button className="dept-btn-primary" onClick={addDepartment}>Add</button>
              <button className="dept-btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDepartment;
