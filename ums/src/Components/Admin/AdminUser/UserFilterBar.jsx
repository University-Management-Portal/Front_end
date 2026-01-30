import React from 'react'
import './AdminUser.css'

function UserFilterBar({ filter, setFilter }) {
  return (
    <div className='userfilter-bar'>

      <div className='drop'>
        <p>Academic Year</p>
        <select
          value={filter.academic_year}
          onChange={(e) => setFilter({ ...filter, academic_year: e.target.value })}
        >
          <option value="">Select year</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
          <option value="2026-2027">2026-2027</option>
        </select>
      </div>

      <div className='drop'>
        <p>Year</p>
        <select
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
        >
          <option value="">ALL</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className='drop'>
        <p>Department</p>
        <select
          value={filter.dept}
          onChange={(e) => setFilter({ ...filter, dept: e.target.value })}
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

      <div className='drop'>
        <p>Section</p>
        <select
          value={filter.sec}
          onChange={(e) => setFilter({ ...filter, sec: e.target.value })}
        >
          <option value="">ALL</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div className='drop'>
        <p>Users</p>
        <select
          value={filter.user}
          onChange={(e) => setFilter({ ...filter, user: e.target.value })}>
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
