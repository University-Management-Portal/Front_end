import React from 'react'
import "./AdminDashboard.css"
import ProfCalender from '../Common/ProfCalender'

function AdminDashboard() {
  return (
    <div className='admin-dashboard'>
        <div className='admin-profile-card'>
          <p>Admin Dashboard</p>
        </div>

          <div className='admin-card'>
            <p>Total Student</p>
            <p>7456</p>
          </div>
          <div className='admin-card'>
            <p>Total Faculties</p>
            <p>753</p>
          </div>
          <div className='admin-card'>
            <p>Departments</p>
            <p>14</p>
          </div>
          <div className='admin-card'>
            <p>Total Courses</p>
            <p>187</p>
          </div>

          <div className='admin-calendar'>
            <ProfCalender/>
          </div>
          
    </div>
  )
}

export default AdminDashboard