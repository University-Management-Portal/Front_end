import React, { useState } from 'react'
import CalendarData from './CalendarData'
import './StaffDashBoards.css'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import ProfileData from './ProfileData.js';

export default function StaffDashboard() {

  const name = ProfileData.find(item => item.label === "Name")?.value;
  const regNo = ProfileData.find(item => item.label === "Reg No")?.value;
  const dept = ProfileData.find(item => item.label === "Department")?.value;

  const currentHour = new Date().getHours(); 

  let greetings='';

  if (currentHour < 12) {
      greetings = 'Good Morning';
    } 
  else if (currentHour < 16) {
      greetings = 'Good Afternoon';
    } 
  else {
      greetings = 'Good Evening';
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

  const scheduleData = [
  {
    subject: "DBMS",
    time: "10:00 AM to 11:00 AM"
  }
];



  return (
    <div className='main'>

      <div className="name-cart">
          <div className="profile-item">
            <p className='greeting'><pre>{greetings} !  {name}</pre></p>
            <p className='role'>{regNo}</p>
            <p className='dept'>{dept} Department</p>
          </div>
      </div>
      <br />

      <div className="content">

      <div className="calendar-card">
          <button className='prev' onClick={prevMonth}><FaArrowLeft size={25} color="#ffffff" /></button>

          <div className="calendar-content">
            <p className='month'>{CalendarData[currentIndex].month}</p>
            <img src={CalendarData[currentIndex].img} alt="calendar"/>
          </div>

          <button className='next' onClick={nextMonth}><FaArrowRight size={25} color="#ffffff" /></button>
      </div>

      <div className="schedule-card">
      {scheduleData.map((item, index) => (
        <div key={index}>
        <div className="head">Teaching Schedule</div>

        <div className="inner-cart">
        <div className="today-class">Today Class</div>
        <br />
        <div className="event">{item.subject}</div>
        <br />
        <div className="timing">{item.time}</div>
      </div>
    </div>
  ))}
      </div>



      </div>
      <br />

    </div>
  )
}
