import React, { useState } from "react";
import UserFilterBar from "./UserFilterBar";
import UserActionBar from "./UserActionBar";
import UserTable from "./UserTable";
import * as XLSX from "xlsx";
import UserForm from "./UserForm";

function AdminUserPage() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const [filter, setFilter] = useState({
    academic_year: "",
    year: "",
    dept: "",
    sec: "",
    user: ""
  });

  const [select, setSelect] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [editingUser, setEditingUser] = useState(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  // ✅ BULK UPLOAD (FIXED)
  const handleBulkUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const excelData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const formatted = excelData.map((row) => ({
      id: String(row.rollno).trim(),
      rollno: String(row.rollno).trim(),
      name: row.name || "",
      year: row.year || "",
      dept: row.dept || "",
      sec: row.sec || "",
      phone: row.phone ? String(row.phone) : "",
      email: row.email || "",
      role: row.role ? row.role.toLowerCase() : ""
    }));

    setUsers(formatted);
    setSelected([]);
    localStorage.setItem("users", JSON.stringify(formatted));

    //  IMPORTANT FIX: reset file input
    e.target.value = "";
  };

  reader.readAsArrayBuffer(file);
};


  // DELETE
  const handleDelete = () => {
    const remaining = users.filter((u) => !selected.includes(u.id));
    setUsers(remaining);
    setSelected([]);
    setSelect(true);
    localStorage.setItem("users", JSON.stringify(remaining));
  };

  // FILTER + SEARCH (SAFE)
  const filteredUsers = users.filter((u) => {
    const name = u.name || "";
    const email = u.email || "";

    return (
      (!filter.dept || u.dept === filter.dept) &&
      (!filter.user || u.role === filter.user) &&
      (!filter.year || String(u.year) === filter.year) &&
      (!filter.sec || u.sec === filter.sec) &&
      (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  //Select-Deselect
  const handleOnSelectAll=()=>{
    if (selected.length === filteredUsers.length) {
    setSelected([]); // deselect all
    setSelect(true);
  } else {
    setSelected(filteredUsers.map((u) => u.id)); // select all
    setSelect(false);
  }
  }

  //AddOne
  const handleAddOne = () => {
    setMode("add");
    setEditingUser(null);
    setShowForm(true);
  };


  //Edit
  const handleEdit = () => {
    if (selected.length !== 1) {
      alert("Please select exactly one row to edit");
      return;
    }

    const userToEdit = users.find(u => u.id === selected[0]);
    setMode("edit");
    setEditingUser(userToEdit);
    setShowForm(true);
  };


  //SAVE
  const handleSave = (userData) => {
    let updatedUsers;

    if (mode === "add") {
      updatedUsers = [...users, userData];
    } else {
      updatedUsers = users.map(u =>
        u.id === userData.id ? userData : u
      );
    }

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setSelected([]);
    setShowForm(false);
  };


  return (
    <div className="adminpage">
      <UserFilterBar filter={filter} setFilter={setFilter} />

      <UserActionBar
        search={search}
        setSearch={setSearch}
        onBulkUpload={handleBulkUpload}
        onSelectAll={handleOnSelectAll}
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
