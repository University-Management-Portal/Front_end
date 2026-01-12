import React from 'react'
import './StaffAssignments.css'
import { BsPlusLg } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function StaffAssignment() {
  return (
    <div className='div'>

        <p>CS104 / Advanced Networking / Assignment </p>

        <button className='buttons'>{<BsPlusLg/>}Add Assignment</button>

        <table border={1}>
            <tr className='table-odd'>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
            </tr>
            <tr className='table-even'>
                <td>Assignment 1</td>
                <td>2023-05-15</td>
                <td>OPEN   <BsThreeDotsVertical/></td>
                
            </tr>
            <tr className='table-odd'>
                <td>Assignment 2</td>
                <td>2023-05-20</td>
                <td>CLOSE  <BsThreeDotsVertical/></td>
            </tr>
        </table>
      
    </div>
  )
}
