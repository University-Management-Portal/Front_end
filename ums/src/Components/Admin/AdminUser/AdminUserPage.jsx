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
  const [mode, setMode] = useState("add");
  const [editingUser, setEditingUser] = useState(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  // 🔥 DATE FORMAT SAFE
  const formatDate = (value) => {
    if (!value) return "";

    if (typeof value === "number") {
      const date = XLSX.SSF.parse_date_code(value);
      return `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
    }

    return value;
  };

  // ✅ BULK UPLOAD
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const excelData = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        raw: false   // 🔥 IMPORTANT FOR DOB
      });

      const formatted = excelData.map((row) => {

        // normalize keys (handles case + space issues)
        const normalized = {};
        Object.keys(row).forEach((key) => {
          normalized[key.trim().toLowerCase()] = row[key];
        });

        return {
          id: String(normalized.rollno || Date.now() + Math.random()),
          rollno: String(normalized.rollno || ""),
          name: normalized.name || "",
          year: normalized.year || "",
          dept: normalized.dept || "",
          sec: normalized.sec || normalized.section || "",
          phone: normalized.phone ? String(normalized.phone) : "",
          email: normalized.email || "",
          DOB: formatDate(normalized.dob),   // 🔥 DOB FIXED
          role: normalized.role ? normalized.role.toLowerCase() : "",
          designation: normalized.designation || ""
        };
      });

      setUsers(formatted);
      setSelected([]);
      localStorage.setItem("users", JSON.stringify(formatted));

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

  // FILTER
  const filteredUsers = users.filter((u) => {
    return (
      (!filter.academic_year || u.academic_year === filter.academic_year) &&
      (!filter.year || String(u.year) === filter.year) &&
      (!filter.dept || u.dept === filter.dept) &&
      (!filter.sec || u.sec === filter.sec) &&
      (!filter.user || u.role === filter.user) &&
      (
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  // SELECT ALL
  const handleOnSelectAll = () => {
    if (selected.length === filteredUsers.length) {
      setSelected([]);
      setSelect(true);
    } else {
      setSelected(filteredUsers.map((u) => u.id));
      setSelect(false);
    }
  };

  // ADD ONE
  const handleAddOne = () => {
    setMode("add");
    setEditingUser(null);
    setShowForm(true);
  };

  // EDIT
  const handleEdit = () => {
    if (selected.length !== 1) {
      alert("Please select exactly one row to edit");
      return;
    }

    const userToEdit = users.find((u) => u.id === selected[0]);
    setMode("edit");
    setEditingUser(userToEdit);
    setShowForm(true);
  };

  // SAVE
  const handleSave = (userData) => {

    let updatedUsers;

    if (mode === "edit") {
      updatedUsers = users.map((u) =>
        u.id === userData.id ? userData : u
      );
    } else {
      updatedUsers = [
        ...users,
        { ...userData, id: Date.now().toString() }
      ];
    }

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setFilter({
      academic_year: "",
      year: "",
      dept: "",
      sec: "",
      user: ""
    });

    setShowForm(false);
    setSelected([]);
  };

  return (
    <div className="min-h-screen">
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
