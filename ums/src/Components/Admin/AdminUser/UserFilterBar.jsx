import React from 'react'

function UserFilterBar({ filter, setFilter }) {
  return (
    <div className='mt-[10px] p-[40px] bg-[#16025d] grid grid-cols-5 gap-[22px] rounded-[14px] items-center'>

      <div className='flex flex-col items-center justify-center gap-[10px]'>
        <p className="text-white font-medium text-[18px] text-center">Academic Year</p>
        <select
          value={filter.academic_year}
          onChange={(e) => setFilter({ ...filter, academic_year: e.target.value })}
          className="w-[220px] h-[45px] p-[12px_44px_12px_16px] text-[16px] font-medium rounded-[16px] border border-[#ccc] outline-none cursor-pointer bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px]"
        >
          <option value="">Select year</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
          <option value="2026-2027">2026-2027</option>
        </select>
      </div>

      <div className='flex flex-col items-center justify-center gap-[10px]'>
        <p className="text-white font-medium text-[18px] text-center">Year</p>
        <select
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
          className="w-[220px] h-[45px] p-[12px_44px_12px_16px] text-[16px] font-medium rounded-[16px] border border-[#ccc] outline-none cursor-pointer bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px]"
        >
          <option value="">ALL</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className='flex flex-col items-center justify-center gap-[10px]'>
        <p className="text-white font-medium text-[18px] text-center">Department</p>
        <select
          value={filter.dept}
          onChange={(e) => setFilter({ ...filter, dept: e.target.value })}
          className="w-[220px] h-[45px] p-[12px_44px_12px_16px] text-[16px] font-medium rounded-[16px] border border-[#ccc] outline-none cursor-pointer bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px]"
        >
          <option value="">ALL</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="EEE">EEE</option>
          <option value="ECE">ECE</option>
          <option value="CD">CD</option>
          <option value="CT">CT</option>
          <option value="CYBER">CYBER</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MECH">MECH</option>
          <option value="ETE">ETE</option>
          <option value="AIDS">AIDS</option>
          <option value="AE">AE</option>
        </select>
      </div>

      <div className='flex flex-col items-center justify-center gap-[10px]'>
        <p className="text-white font-medium text-[18px] text-center">Section</p>
        <select
          value={filter.sec}
          onChange={(e) => setFilter({ ...filter, sec: e.target.value })}
          className="w-[220px] h-[45px] p-[12px_44px_12px_16px] text-[16px] font-medium rounded-[16px] border border-[#ccc] outline-none cursor-pointer bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px]"
        >
          <option value="">ALL</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div className='flex flex-col items-center justify-center gap-[10px]'>
        <p className="text-white font-medium text-[18px] text-center">Users</p>
        <select
          value={filter.user}
          onChange={(e) => setFilter({ ...filter, user: e.target.value })}
          className="w-[220px] h-[45px] p-[12px_44px_12px_16px] text-[16px] font-medium rounded-[16px] border border-[#ccc] outline-none cursor-pointer bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:18px]"
        >
          <option value="">ALL</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

    </div>
  )
}

export default UserFilterBar
