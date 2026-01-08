import React, { useState } from 'react'
import CalendarData from './CalendarData'
import './StaffDashBoards.css'

export default function StaffDashboard() {

  const currentHour = new Date().getHours(); 

  let greetings='';

  if (currentHour < 12) {
      greetings = 'GOOD MORNING';
    } 
  else if (currentHour < 16) {
      greetings = 'GOOD AFTERNOON';
    } 
  else {
      greetings = 'GOOD EVENING';
    }

   const [currentIndex, setCurrentIndex] = useState(0);

   const prevMonth = () => {
    setCurrentIndex(
      currentIndex === 0 ? CalendarData.length - 1 : currentIndex - 1
    );
  };

  const nextMonth = () => {
    setCurrentIndex(
      currentIndex === CalendarData.length - 1 ? 0 : currentIndex + 1
    );
  };



  return (
    <div className='main'>

      <div className="name-cart">
        <p className='greeting'>{greetings}!!! PRAVEENKUMAR R (23P341)</p>
        <p className='role'>Assistant Professor</p>
        <p className='dept'>CSE Department</p>
      </div>
      <br />

      <div className="content">

      <div className="calendar-card">
          <button className='prev' onClick={prevMonth}>⬅</button>

          <div className="calendar-content">
            <p className='month'>{CalendarData[currentIndex].month}</p>
            <img src={CalendarData[currentIndex].img} alt="calendar"/>
          </div>

          <button className='next' onClick={nextMonth}>➡</button>
      </div>

      <div className="schedule-card">
          <div className="head">Teaching Schedule</div>
          
          <div className="inner-cart">
          <div className="today-class">Today Class</div>
           <br />
          <div className="event">DBMS</div>
          <br />
          <div className="timing">10:00 AM to 11:00 AM</div>
          </div>
      </div>


      </div>
      <br />

    </div>
  )
}
