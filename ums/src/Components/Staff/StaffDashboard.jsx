import React from 'react'
import './StaffDashBoards.css'

export default function StaffDashboard() {
  return (
    <div className='main'>

      <div className="name-cart">
        <p className='greeting'>WELCOME ! PRAVEENKUMAR R (23P341)</p>
        <p className='role'>Assistant Professor</p>
        <p className='dept'>CSE Department</p>
      </div>

      <div className="content">
        <div className="calendar">
            <img className='imagec' src="calendar1.jpg" alt="Calendar" width={400} height={400}/>

        </div>

        <div className="schedule">


        </div>
      </div>

    </div>
  )
}
