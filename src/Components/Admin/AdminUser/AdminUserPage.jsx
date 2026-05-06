import React, { useState, useEffect } from "react";
import UserFilterBar from "./UserFilterBar";
import UserActionBar from "./UserActionBar";
import UserTable from "./UserTable";
import * as XLSX from "xlsx";
import UserForm from "./UserForm";
import axiosInstance from "../../../api/axiosInstance";
import { Snackbar, Alert, Backdrop, CircularProgress } from "@mui/material";

function AdminUserPage() {
  const [users, setUsers] = useState([]);
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ open: false, text: "", type: "success" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users');
      // frontend table relies on specific keys (rollno, dept, sec, DOB)
      const mapped = response.data.map(u => ({
        ...u,
        rollno: u.regNo || "",
        dept: u.department || "",
        sec: u.section || "",
        DOB: u.dateOfBirth || ""
      }));
      setUsers(mapped);
    } catch (err) {
      console.error(err);
      setMessage({ open: true, text: "Failed to fetch users", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DATE FORMAT SAFE
  const formatDate = (value) => {
    if (!value) return null;
    if (typeof value === "number") {
      const date = XLSX.SSF.parse_date_code(value);
      return `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
    }

    if (typeof value === "string") {
      // if value is DD-MM-YYYY
      const parts = value.split("-");
      if (parts.length === 3) {
        // If first part is > 12, it's definitely the day or year. 
        // If length is 4, it's year. Let's strictly handle DD-MM-YYYY or DD/MM/YYYY
        if (parts[2].length === 4) {
          return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        }
      }
    }

    // Fallback for native Date parsing
    try {
      return new Date(value).toISOString().split('T')[0];
    } catch (e) {
      return null;
    }
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
        const normalized = {};
        Object.keys(row).forEach((key) => {
          normalized[key.trim().toLowerCase()] = row[key];
        });

        return {
          regNo: String(normalized["roll no"] || normalized.rollno || ""),
          name: normalized.name || "",
          year: normalized.batch || normalized.year ? String(normalized.batch || normalized.year) : null,
          department: normalized.department || normalized.dept || null,
          section: normalized.section || normalized.sec || null,
          phone: normalized.phone ? String(normalized.phone) : "",
          email: normalized.email || "",
          dateOfBirth: formatDate(normalized["date of birth"] || normalized.dob),
          tutor: normalized.tutor || null,
          currentSemester: normalized["current semester"] || normalized.currentsemester || normalized.semester || null,
          role: normalized.role ? normalized.role.toUpperCase() : "STUDENT"
        };
      });

      setLoading(true);
      axiosInstance.post('/users/bulk', formatted)
        .then(res => {
          setMessage({ open: true, text: `Bulk upload successful! Added ${res.data} users.`, type: "success" });
          fetchUsers();
        })
        .catch(err => {
          console.error(err);
          setMessage({ open: true, text: "Failed to bulk upload users.", type: "error" });
        })
        .finally(() => {
          setLoading(false);
          setSelected([]);
          e.target.value = "";
        });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        "Roll No": "717821P123",
        "Name": "John Doe",
        "Batch": "2023",
        "Department": "CSE",
        "Section": "A",
        "Phone": "9876543210",
        "Email": "john@example.com",
        "Date of Birth": "21-05-2005",
        "Tutor": "Dr. Smith",
        "Current Semester": "5",
        "Role": "STUDENT"
      }
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "Bulk_Upload_Template.xlsx");
  };

  // DELETE
  const handleDelete = async () => {
    if (selected.length === 0) return;

    setLoading(true);
    try {
      if (selected.length === 1) {
        await axiosInstance.delete(`/users/${selected[0]}`);
      } else {
        await axiosInstance.delete('/users/bulk', { data: selected });
      }
      setMessage({ open: true, text: "Users deleted successfully!", type: "success" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage({ open: true, text: "Failed to delete users.", type: "error" });
    } finally {
      setLoading(false);
      setSelected([]);
      setSelect(true);
    }
  };

  // FILTER
  const filteredUsers = users.filter((u) => {
    let academicYear = "null";
    if (u.role && u.role.toUpperCase() === "STUDENT" && u.year) {
      const enrollmentYear = parseInt(u.year, 10);
      if (!isNaN(enrollmentYear)) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        academicYear = currentYear - enrollmentYear;
        if (currentMonth >= 6) academicYear += 1;
        if (academicYear < 1) academicYear = 1;
        if (academicYear > 4) academicYear = 4;
        academicYear = String(academicYear);
      }
    }

    return (
      (!filter.academic_year || u.academic_year === filter.academic_year) &&
      (!filter.year || academicYear === filter.year) &&
      (!filter.dept || u.dept === filter.dept) &&
      (!filter.sec || u.sec === filter.sec) &&
      (!filter.user || (u.role && u.role.toLowerCase() === filter.user.toLowerCase())) &&
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
      setMessage({ open: true, text: "Please select exactly one row to edit", type: "warning" });
      return;
    }
    const userToEdit = users.find((u) => u.id === selected[0]);
    setMode("edit");
    setEditingUser(userToEdit);
    setShowForm(true);
  };

  // SAVE
  const handleSave = async (userData) => {
    setLoading(true);
    const payloadUpdate = {
      name: userData.name,
      phone: userData.phone,
      year: userData.year || null,
      department: userData.dept || null,
      section: userData.sec || null,
      tutor: userData.tutor || null,
      currentSemester: userData.currentSemester || null
    };

    try {
      if (mode === "edit") {
        await axiosInstance.put(`/users/${userData.id}`, payloadUpdate);
        setMessage({ open: true, text: "User updated successfully!", type: "success" });
      } else {
        const payloadCreate = {
          ...payloadUpdate,
          regNo: userData.rollno,
          email: userData.email,
          dateOfBirth: userData.DOB,
          role: String(userData.role).toUpperCase()
        };
        await axiosInstance.post('/users', payloadCreate);
        setMessage({ open: true, text: "User created successfully!", type: "success" });
      }
      fetchUsers();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      let errorMsg = "Failed to save user.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }
      setMessage({ open: true, text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <UserFilterBar filter={filter} setFilter={setFilter} />

      <UserActionBar
        search={search}
        setSearch={setSearch}
        onBulkUpload={handleBulkUpload}
        onDownloadTemplate={handleDownloadTemplate}
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
          setMessage={setMessage}
        />
      )}

      <UserTable
        users={filteredUsers}
        selected={selected}
        setSelected={setSelected}
      />

      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: "100%" }}>
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminUserPage;
