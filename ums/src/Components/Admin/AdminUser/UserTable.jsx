import React from "react";

function UserTable({ users, selected, setSelected }) {
  const toggle = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th></th>
            <th>S.No</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Year</th>
            <th>Dept</th>
            <th>Section</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10" align="center">No Data</td>
            </tr>
          ) : (
            users.map((u, i) => (
              <tr key={u.id}>
                <td>
                  <input className="checkbox"
                    type="checkbox"
                    checked={selected.includes(u.id)}
                    onChange={() => toggle(u.id)}
                  />
                </td>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.rollno}</td>
                <td>{u.year}</td>
                <td>{u.dept}</td>
                <td>{u.sec}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
