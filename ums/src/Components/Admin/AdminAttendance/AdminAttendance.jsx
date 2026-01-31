import React, { useState } from "react";
import UserFilterBar from "../AdminUser/UserFilterBar";
import AttendanceActionBar from "./AttendanceActionBar";
import "./AdminAttendance.css";

const HOURS = ["Hour1","Hour2","Hour3","Hour4","Hour5","Hour6","Hour7"];

function AdminAttendance() {
  const [users] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const [filter, setFilter] = useState({
    academic_year: "",
    year: "",
    dept: "",
    sec: "",
    user: "student"
  });

  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState({});

  const filteredUsers = users.filter((u) => {
    const name = u.name?.toLowerCase() || "";
    const roll = u.rollno?.toLowerCase() || "";

    return (
      (!filter.year || String(u.year) === filter.year) &&
      (!filter.dept || u.dept === filter.dept) &&
      (!filter.sec || u.sec === filter.sec) &&
      (!filter.user || u.role === filter.user) &&
      (name.includes(search.toLowerCase()) || roll.includes(search.toLowerCase()))
    );
  });

  const updateAttendance = (rollno, hour, value) => {
    setAttendance((prev) => ({
      ...prev,
      [rollno]: {
        ...prev[rollno],
        [hour]: value
      }
    }));
  };

  const downloadCSV = () => {
    let csv = "Name,Roll No," + HOURS.join(",") + "\n";

    filteredUsers.forEach((u) => {
      const row = [
        u.name,
        u.rollno,
        ...HOURS.map(h => attendance[u.rollno]?.[h] || "P")
      ];
      csv += row.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="att-page">
      <UserFilterBar filter={filter} setFilter={setFilter} />

      <AttendanceActionBar
        search={search}
        setSearch={setSearch}
        onDownload={downloadCSV}
      />

      <div className="att-table-wrapper">
        <table className="att-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Roll No</th>
              {HOURS.map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={HOURS.length + 3} align="center">No Data</td>
              </tr>
            ) : (
              filteredUsers.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.rollno}</td>

                  {HOURS.map(h => {
                    const value = attendance[u.rollno]?.[h] || "P";
                    return (
                      <td key={h}>
                        <div className="att-radio-group">
                          <label className={`att-radio ${value === "P" ? "active-p" : ""}`}>
                            <input
                              type="radio"
                              name={`${u.rollno}-${h}`}
                              checked={value === "P"}
                              onChange={() => updateAttendance(u.rollno, h, "P")}
                            />
                            P
                          </label>
                          <label className={`att-radio ${value === "A" ? "active-a" : ""}`}>
                            <input
                              type="radio"
                              name={`${u.rollno}-${h}`}
                              checked={value === "A"}
                              onChange={() => updateAttendance(u.rollno, h, "A")}
                            />
                            A
                          </label>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAttendance;
