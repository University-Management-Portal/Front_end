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
    <div className="bg-white  overflow-x-auto mb-[30px] mt-[10px]">
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
            <th className="p-[10px] border border-[#ddd]">DOB</th>
            <th className="p-[10px] border border-[#ddd]">Tutor</th>
            <th className="p-[10px] border border-[#ddd]">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10" align="center" className="p-[10px] border border-[#ddd]">No Data</td>
            </tr>
          ) : (
            users.map((u, i) => {

              let displayYear = "null";
              if (u.role && u.role.toUpperCase() === "STUDENT" && u.year) {
                const enrollmentYear = parseInt(u.year, 10);
                if (!isNaN(enrollmentYear)) {
                  const currentYear = new Date().getFullYear();
                  const currentMonth = new Date().getMonth() + 1; // 1-12

                  let academicYear = currentYear - enrollmentYear;
                  if (currentMonth >= 6) {
                    // If we are past June, they have advanced to the next academic year
                    academicYear += 1;
                  }

                  if (academicYear < 1) academicYear = 1;
                  if (academicYear > 4) academicYear = 4;
                  displayYear = academicYear.toString();
                }
              }

              return (
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
                  <td className="p-[10px] border border-[#ddd]">{u.rollno || "-"}</td>
                  <td className="p-[10px] border border-[#ddd]">{displayYear !== "null" ? displayYear : "-"}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.dept && u.dept !== "null" ? u.dept : "-"}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.sec && u.sec !== "null" ? u.sec : "-"}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.phone}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.email}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.DOB}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.tutor || "-"}</td>
                  <td className="p-[10px] border border-[#ddd]">{u.role}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
