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
    <div className="bg-white rounded-[10px] overflow-x-auto mb-[30px] mt-[10px]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-[10px] border border-[#ddd]"></th>
            <th className="p-[10px] border border-[#ddd]">S.No</th>
            <th className="p-[10px] border border-[#ddd]">Name</th>
            <th className="p-[10px] border border-[#ddd]">Roll No</th>
            <th className="p-[10px] border border-[#ddd]">Year</th>
            <th className="p-[10px] border border-[#ddd]">Dept</th>
            <th className="p-[10px] border border-[#ddd]">Section</th>
            <th className="p-[10px] border border-[#ddd]">Phone</th>
            <th className="p-[10px] border border-[#ddd]">Email</th>
            <th className="p-[10px] border border-[#ddd]">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10" align="center" className="p-[10px] border border-[#ddd]">No Data</td>
            </tr>
          ) : (
            users.map((u, i) => (
              <tr key={u.id}>
                <td className="p-[10px] border border-[#ddd]">
                  <input className="w-[18px] h-[18px] cursor-pointer"
                    type="checkbox"
                    checked={selected.includes(u.id)}
                    onChange={() => toggle(u.id)}
                  />
                </td>
                <td className="p-[10px] border border-[#ddd]">{i + 1}</td>
                <td className="p-[10px] border border-[#ddd]">{u.name}</td>
                <td className="p-[10px] border border-[#ddd]">{u.rollno}</td>
                <td className="p-[10px] border border-[#ddd]">{u.year}</td>
                <td className="p-[10px] border border-[#ddd]">{u.dept}</td>
                <td className="p-[10px] border border-[#ddd]">{u.sec}</td>
                <td className="p-[10px] border border-[#ddd]">{u.phone}</td>
                <td className="p-[10px] border border-[#ddd]">{u.email}</td>
                <td className="p-[10px] border border-[#ddd]">{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
