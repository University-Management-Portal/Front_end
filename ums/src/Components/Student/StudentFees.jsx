import React from 'react'
import { useState } from 'react'
import "./StudentFees.css"
import "./StudentExam.css"
import DownloadIcon from "@mui/icons-material/Download";


function StudentFees() {

    const [activeTab,setActiveTab] = useState("structure");
    const [feeTab,setFeeTab] = useState("examfee");

    const fees = [
    { name: "Tuition Fee (Per Semester)", amount: "₹1,00,000" },
    { name: "Hostel Fee (Per Year)", amount: "₹85,000" },
    { name: "Laboratory Fee", amount: "₹15,000" },
    { name: "Library Fee", amount: "₹2,000" },
    { name: "Internal Assessment Fee", amount: "₹1,500" },
    { name: "Development Fee", amount: "₹4,000" },
    { name: "Computer & Internet Fee", amount: "₹2,500" },
    { name: "Student Activity Fee", amount: "₹1,500" },
    { name: "Maintenance Fee", amount: "₹2,000" }
    ];

    const transactions = [
    {
      semester: "Semester I",
      date: "15 Dec 2023",
      txnId: "TXN1001",
      amount: "₹1450",
      status: "Paid",
    },
    {
      semester: "Semester II",
      date: "18 Jun 2024",
      txnId: "TXN1043",
      amount: "₹3950",
      status: "Paid",
    },
    {
      semester: "Semester III",
      date: "12 Dec 2024",
      txnId: "TXN1098",
      amount: "₹5450",
      status: "Paid",
    },
    {
      semester: "Semester IV",
      date: "20 Jun 2025",
      txnId: "TXN1156",
      amount: "₹6950",
      status: "Paid",
    },
    {
      semester: "Semester V",
      date: "25 Dec 2025",
      txnId: "TXN1219",
      amount: "₹8450",
      status: "Paid",
    },
    ];

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

    const feeDetails = Object.entries(examfeeDetails).filter(([ ,details]) => details.status === "Pending").map(
        ([sem,details]) => ({
            semester : sem,
            ...details
        }));

  return (
    <div className='fee-page'>
        <div className='fee-left'>
            <button onClick={()=>{setActiveTab("structure")}} className={activeTab === "structure" ? "activeTab" :" " }>Fee Structure</button>
            <button onClick={()=>{setActiveTab("fee")}} className={activeTab === "fee" ? "activeTab" :" " }>Fees Payment</button>
            <button onClick={()=>{setActiveTab("transaction")}} className={activeTab === "transaction" ? "activeTab" :" " }>Transaction History</button>
        </div>
        <div className='fee-right'>
            {activeTab === "structure" && (
                <div className="fee-structure">
                <h2>Fee Structure</h2>

                    <table className="fee-structure-table">
                        <thead>
                        <tr>
                            <th>Fee Description</th>
                            <th>Amount</th>
                        </tr>
                        </thead>

                        <tbody>
                        {fees.map((fee, index) => (
                            <tr key={index}>
                            <td>{fee.name}</td>
                            <td>{fee.amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="fee-structure-notes">
                        <p>⚠️ All fees must be paid before appearing for examinations.</p>
                    </div>
                </div>
            )}
            {activeTab === "fee" && (
                <div className='fee-payment'>
                    <div className='fee-up'>
                        <button onClick={()=>{setFeeTab("examfee")}} className={feeTab === "examfee" ? "activeTab" :" "}>Exam Fees</button>
                    </div>
                    <div className='fee-down'>
                        {feeTab === "examfee" && (
                            <div className='exam-fee-details'>

                            {feeDetails.length ===0  ? (
                                <div>
                                    <div className="fee-center-wrapper">   {/* css from exam */}
                                    <p>No Pending Exam Fees.</p>
                                    </div>
                                </div>
                                ) : (
                                    feeDetails.map((items)=>(
                                        <div className="examfee-card" key={items.semester}>
                                        <p><strong>Semester :</strong> {items.semester}</p>
                                        <p><strong>Exam Fee :</strong> ₹{items.amount}</p>
                                        <p><strong>Due Date :</strong> {items.dueDate}</p>
                                        <p><strong>Fine :</strong> {items.fine}</p>
                                        <p>
                                        <strong>Status :</strong>{" "}
                                        <span style={{color:'#b36b00'}}>
                                            {items.status}
                                        </span>
                                        </p>
                                        <button className='pay-now-btn'>Pay Now</button>   {/* css from exam */}
                                    </div>
                                    ))
                            )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {activeTab === "transaction" && (
                <div className="transaction-container">
                    <h2>Transaction History</h2>

                    <table className="transaction-table">
                        <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Receipt</th>
                        </tr>
                        </thead>

                        <tbody>
                            {transactions.map((txn, index) => (
                                <tr key={index}>
                                <td>{txn.semester}</td>
                                <td>{txn.date}</td>
                                <td>{txn.txnId}</td>
                                <td>{txn.amount}</td>
                                <td>
                                    <span className={`status ${txn.status.toLowerCase()}`}>
                                    {txn.status}
                                    </span>
                                </td>
                                <td>
                                    <a href={'/uploads/dummy.pdf'} download>
                                    <button className="receipt-btn">
                                    <DownloadIcon fontSize="small" />
                                    Receipt
                                    </button>
                                    </a>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  )
}

export default StudentFees