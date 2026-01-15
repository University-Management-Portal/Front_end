import React from 'react'
import './StaffMark.css'

export default function StaffMark() {
  return (
    <div>
      <div className="top-bar">

        <div className="Academic">
            <p>Academic Year</p>
            <select name="year" id="year">
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
            </select>
        </div>

        <div className="Semester">
            <p>Semester</p>
            <select name="sem" id="sem">
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
            </select>

        </div>

        <div className="Department">
            <p>Department</p>
            <select name="dept" id="dept">
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>   
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option> 
            </select>

        </div>

        <div className="Section">
            <p>Section</p>
            <select name="sec" id="sec">
                <option value="A">A</option>
                <option value="B">B</option>   
                <option value="C">C</option>
            </select>

        </div>

      </div>
    </div>
  )
}
