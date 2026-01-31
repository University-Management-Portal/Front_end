import React, { useState } from "react";
import UserFilterBar from "./UserFilterBar";
import UserActionBar from "./UserActionBar";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import * as XLSX from "xlsx";
import "./AdminUser.css";

function AdminUserPage() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [filter, setFilter] = useState({
    academic_year: "",
    year: "",
    dept: "",
    sec: "",
    user: ""
  });

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [select, setSelect] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingUser, setEditingUser] = useState(null);

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = new Uint8Array(ev.target.result);
      const wb = XLSX.read(data, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      const formatted = rows.map(r => ({
        id: String(r.rollno).trim(),
        rollno: String(r.rollno).trim(),
        name: r.name || "",
        year: r.year || "",
        dept: r.dept || "",
        sec: r.sec || "",
        phone: r.phone ? String(r.phone) : "",
        email: r.email || "",
        role: r.role ? r.role.toLowerCase() : ""
      }));

      setUsers(formatted);
      localStorage.setItem("users", JSON.stringify(formatted));
      setSelected([]);
      e.target.value = "";
    };
    reader.readAsArrayBuffer(file);
  };

  const filteredUsers = users.filter(u =>
    (!filter.year || String(u.year) === filter.year) &&
    (!filter.dept || u.dept === filter.dept) &&
    (!filter.sec || u.sec === filter.sec) &&
    (!filter.user || u.role === filter.user) &&
    (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSelectAll = () => {
    if (selected.length === filteredUsers.length) {
      setSelected([]);
      setSelect(true);
    } else {
      setSelected(filteredUsers.map(u => u.id));
      setSelect(false);
    }
  };

  const handleDelete = () => {
    const remaining = users.filter(u => !selected.includes(u.id));
    setUsers(remaining);
    localStorage.setItem("users", JSON.stringify(remaining));
    setSelected([]);
    setSelect(true);
  };

  const handleAddOne = () => {
    setMode("add");
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = () => {
    if (selected.length !== 1) return alert("Select one user");
    setMode("edit");
    setEditingUser(users.find(u => u.id === selected[0]));
    setShowForm(true);
  };

  const handleSave = (data) => {
    const updated = mode === "add"
      ? [...users, data]
      : users.map(u => u.id === data.id ? data : u);

    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setShowForm(false);
    setSelected([]);
  };

  return (
    <div className="au-page">
      <UserFilterBar filter={filter} setFilter={setFilter} />

      <UserActionBar
        search={search}
        setSearch={setSearch}
        onBulkUpload={handleBulkUpload}
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
        onAddOne={handleAddOne}
        onEdit={handleEdit}
        hasSelection={selected.length > 0}
        select={select}
      />

      {showForm && (
        <UserForm
          mode={mode}
          editingUser={editingUser}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      <UserTable
        users={filteredUsers}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

export default AdminUserPage;
