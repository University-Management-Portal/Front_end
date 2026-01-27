import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './StudentExam.css'
import CircleIcon from '@mui/icons-material/Circle';

function StudentExam() {

    const examfeeDetails = {
        sem1 : { amount: "1450", dueDate: "2023-12-15", fine : " 100 per day", status: "Completed"},
        sem2 : { amount: "3950", dueDate: "2024-05-15", fine : " 100 per day", status: "Completed"},
        sem3 : { amount: "5450", dueDate: "2024-11-15", fine : " 100 per day", status: "Completed"},
        sem4 : { amount: "6950", dueDate: "2025-05-15", fine : " 100 per day", status: "Completed"},
        sem5 : { amount: "8450", dueDate: "2025-11-15", fine : " 100 per day", status: "Completed"},
        sem6 : { amount: "9950", dueDate: "2026-04-15", fine : " 100 per day", status: "Pending"},
        sem7 : { amount: "10,450", dueDate: "2026-11-15", fine : " 100 per day", status: "Not Released"},
        sem8 : { amount: "11,950", dueDate: "2027-01-15", fine : " 100 per day", status: "Not Released"},
    }

    const [activeTab,setActiveTAb] = useState("rules");

    const [Semester,Setsemester] = useState();
    const feeDetails = examfeeDetails[Semester];

    const schedule = true;


  return (
    <div className='exam-page'>
        <div className='exam-left'>
            <button className={activeTab === "rules" ? "activeTab" : ""} onClick={()=>{setActiveTAb("rules")}} >Rules & Regulation</button>
            <button className={activeTab === "schedule" ? "activeTab" : ""} onClick={()=>{setActiveTAb("schedule")}}>Exam Schedule</button>
            <button className={activeTab === "result" ? "activeTab" : ""} onClick={()=>{setActiveTAb("result")}}>Result</button>
            <button className={activeTab === "fee" ? "activeTab" : ""} onClick={()=>{setActiveTAb("fee")}}>Exam Fee Details</button>
        </div>
        <div className='exam-right'>
            {activeTab === "rules" && (
                <div>
                    <h2>Examination Rules & Regulations:</h2>
                    <ul className="rules-list">
                        <li><CircleIcon/>Students must satisfy the minimum attendance requirement and clear all exam fees before appearing for examinations.</li>
                        <li><CircleIcon/>Students must enter the examination hall at least 15 minutes before the commencement of the exam.</li>
                        <li><CircleIcon/>Late entry beyond 30 minutes after the start of the examination is strictly prohibited.</li>
                        <li><CircleIcon/>Carrying a valid hall ticket and college identity card is mandatory for all examinations.</li>
                        <li><CircleIcon/>Students must occupy only their allotted seats and follow the seating arrangement displayed.</li>
                        <li><CircleIcon/>Mobile phones, smart devices, books, notes, and unauthorized materials are strictly prohibited inside the examination hall.</li>
                        <li><CircleIcon/>Students must maintain complete silence and discipline throughout the duration of the examination.</li>
                        <li><CircleIcon/>Any form of copying, communication, or malpractice will result in strict disciplinary action.</li>
                        <li><CircleIcon/>Students must follow the instructions given by invigilators at all times.</li>
                        <li><CircleIcon/>Leaving the examination hall during the first 30 minutes and last 10 minutes of the exam is not permitted.</li>
                        <li><CircleIcon/>Answer scripts must be handed over personally to the invigilator before leaving the hall.</li>
                        <li><CircleIcon/>Students must ensure that all required details are correctly filled in the answer booklet.</li>
                        <li><CircleIcon/>Violation of examination rules may lead to cancellation of the exam or further disciplinary action.</li>
                        <li><CircleIcon/>Students must leave the examination hall quietly after completion of the examination.</li>
                    </ul>
                </div>
            )}
            {activeTab === "schedule" && (
            schedule ? (
                    <a href='/uploads/dummy.pdf' target="_blank" rel="noopener noreferrer" >
                        <div className='exam-schedule'>
                                <p>ESE Sem 5 Schedule</p>
                        </div>
                    </a>
                ) : (
                    <div className="center-content">
                    <p>End Semester Schedule Not Uploaded Yet.</p>
                    </div>
            ) )}
            {activeTab === "result" && (
                <div className="center-content">
                    <p >Results will be published on the university portal.<Link to={"/result"}>Click Here</Link></p>
                </div>
            )}
            {activeTab === "fee" && (
                <div className='exam-fee-details'>
                    <select onChange={(e)=>{Setsemester(e.target.value)}}>
                        <option value="" selected>Select Semester</option>
                        <option value="sem1">Semester 1</option>
                        <option value="sem2">Semester 2</option>
                        <option value="sem3">Semester 3</option>
                        <option value="sem4">Semester 4</option>
                        <option value="sem5">Semester 5</option>
                        <option value="sem6">Semester 6</option>
                        <option value="sem7">Semester 7</option>
                        <option value="sem8">Semester 8</option>
                    </select>

                    {!Semester && (
                        <div className="fee-center-wrapper">
                         <p>Please select a semester to view exam fee details.</p>
                        </div>
                    )}

                    {Semester && feeDetails && (
                        <div className="fee-card">
                            <p><strong>Exam Fee:</strong> ₹{feeDetails.amount}</p>
                            <p><strong>Due Date:</strong> {feeDetails.dueDate}</p>
                            <p><strong>Fine:</strong> {feeDetails.fine}</p>
                            <p>
                            <strong>Status:</strong>{" "}
                            <span className={`fee-status ${feeDetails.status.toLowerCase().replace(" ", "-")}`}>
                                {feeDetails.status}
                            </span>
                            </p>

                            { feeDetails.status === "Pending" && 
                            <button className='pay-now-btn'>Pay Now</button>}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default StudentExam