import React from 'react'
import { useState } from 'react'
import DownloadIcon from "@mui/icons-material/Download";


function StudentFees() {

    const [activeTab, setActiveTab] = useState("structure");
    const [feeTab, setFeeTab] = useState("examfee");
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);
    const [hover4, setHover4] = useState(false);
    const [hover5, setHover5] = useState(false);

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
        sem1: { amount: "1450", dueDate: "2023-12-15", fine: " 100 per day", status: "Completed" },
        sem2: { amount: "3950", dueDate: "2024-05-15", fine: " 100 per day", status: "Completed" },
        sem3: { amount: "5450", dueDate: "2024-11-15", fine: " 100 per day", status: "Completed" },
        sem4: { amount: "6950", dueDate: "2025-05-15", fine: " 100 per day", status: "Completed" },
        sem5: { amount: "8450", dueDate: "2025-11-15", fine: " 100 per day", status: "Completed" },
        sem6: { amount: "9950", dueDate: "2026-04-15", fine: " 100 per day", status: "Pending" },
        sem7: { amount: "10,450", dueDate: "2026-11-15", fine: " 100 per day", status: "Not Released" },
        sem8: { amount: "11,950", dueDate: "2027-01-15", fine: " 100 per day", status: "Not Released" },
    }

    const feeDetails = Object.entries(examfeeDetails).filter(([, details]) => details.status === "Pending").map(
        ([sem, details]) => ({
            semester: sem,
            ...details
        }));

    return (
        <div className='flex p-[40px] gap-[40px] min-h-[calc(100vh-80px)]'>
            <div className='w-[220px] flex flex-col gap-[16px]'>
                <button onClick={() => { setActiveTab("structure") }} className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "structure" ? "bg-[#16005d] text-white" : "bg-transparent hover:bg-[#d9d9d9]"}`}
                    style={{
                        backgroundColor: hover1 ? "#ffffff" : "#16005d",
                        color: hover1 ? "#16005d" : "#ffffff"
                    }}
                    onMouseEnter={() => setHover1(true)}
                    onMouseLeave={() => setHover1(false)}
                >Fee Structure</button>
                <button onClick={() => { setActiveTab("fee") }} className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "fee" ? "bg-[#16005d] text-white" : "bg-transparent hover:bg-[#d9d9d9]"}`}
                    style={{
                        backgroundColor: hover2 ? "#ffffff" : "#16005d",
                        color: hover2 ? "#16005d" : "#ffffff"
                    }}
                    onMouseEnter={() => setHover2(true)}
                    onMouseLeave={() => setHover2(false)}
                >Fees Payment</button>
                <button onClick={() => { setActiveTab("transaction") }} className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "transaction" ? "bg-[#16005d] text-white" : "bg-transparent hover:bg-[#d9d9d9]"}`}
                    style={{
                        backgroundColor: hover3 ? "#ffffff" : "#16005d",
                        color: hover3 ? "#16005d" : "#ffffff"
                    }}
                    onMouseEnter={() => setHover3(true)}
                    onMouseLeave={() => setHover3(false)}
                >Transaction History</button>
            </div>
            <div className='flex-1 border-l-2 border-[#ddd] pl-[60px] text-[16px]'>
                {activeTab === "structure" && (
                    <div className="p-[20px]">
                        <h2 className="mb-[20px] text-[26px] font-bold">Fee Structure</h2>

                        <table className="w-full border-collapse bg-white rounded-[10px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.1)]">
                            <thead>
                                <tr>
                                    <th className="p-[14px_18px] text-left bg-[#16005d] text-white text-[16px]">Fee Description</th>
                                    <th className="p-[14px_18px] text-left bg-[#16005d] text-white text-[16px]">Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {fees.map((fee, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-[#f4f4f4] hover:bg-[#e8e8e8]">
                                        <td className="p-[14px_18px] text-left">{fee.name}</td>
                                        <td className="p-[14px_18px] text-left font-semibold">{fee.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-[16px] text-[14px] text-[#b00020]">
                            <p>⚠️ All fees must be paid before appearing for examinations.</p>
                        </div>
                    </div>
                )}
                {activeTab === "fee" && (
                    <div className='flex flex-col w-full min-h-[70vh]'>
                        <div className='flex items-center p-[10px_0_20px_0] border-b border-[#e6e6e6]'>
                            <button onClick={() => { setFeeTab("examfee") }} className={`p-[12px_26px] rounded-[10px] border-none cursor-pointer text-[16px] font-semibold shadow-[0_6px_14px_rgba(22,0,93,0.25)] mr-[20px] ${feeTab === "examfee" ? "bg-[#16005d] text-white" : "bg-transparent text-black"}`}
                                style={{
                                    backgroundColor: hover4 ? "#ffffff" : "#16005d",
                                    color: hover4 ? "#16005d" : "#ffffff"
                                }}
                                onMouseEnter={() => setHover4(true)}
                                onMouseLeave={() => setHover4(false)}
                                >Exam Fees</button>
                        </div>
                        <div className='fee-down'>
                            {feeTab === "examfee" && (
                                <div className='mt-[20px] flex flex-col w-full min-h-[70vh]'>

                                    {feeDetails.length === 0 ? (
                                        <div>
                                            <div className="w-full min-h-[300px] flex items-center justify-center text-center">
                                                <p className="text-[18px] font-medium text-black">No Pending Exam Fees.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        feeDetails.map((items) => (
                                            <div className="w-[400px] bg-white rounded-[28px] p-[28px_32px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] flex flex-col gap-[14px] mt-[24px] ml-[40px]" key={items.semester}>
                                                <p className="text-[15px] text-[#333]"><strong>Semester :</strong> {items.semester}</p>
                                                <p className="text-[15px] text-[#333]"><strong>Exam Fee :</strong> ₹{items.amount}</p>
                                                <p className="text-[15px] text-[#333]"><strong>Due Date :</strong> {items.dueDate}</p>
                                                <p className="text-[15px] text-[#333]"><strong>Fine :</strong> {items.fine}</p>
                                                <p className="text-[15px] text-[#333]">
                                                    <strong>Status :</strong>{" "}
                                                    <span style={{ color: '#b36b00' }}>
                                                        {items.status}
                                                    </span>
                                                </p>
                                                <button className='mt-[14px] self-start p-[10px_22px] rounded-[20px] text-[14px] font-semibold std-btn'
                                                style={{
                                                    backgroundColor: hover5 ? "#ffffff" : "#16005d",
                                                    color: hover5 ? "#16005d" : "#ffffff"
                                                }}
                                                onMouseEnter={() => setHover5(true)}
                                                onMouseLeave={() => setHover5(false)}
                                                >Pay Now</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === "transaction" && (
                    <div className="mt-[30px]">
                        <h2 className="text-[24px] font-bold mb-[16px]">Transaction History</h2>

                        <table className="w-full border-collapse bg-white rounded-[12px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.1)]">
                            <thead>
                                <tr>
                                    <th className="p-[14px_16px] text-left text-[15px] bg-[#16005d] text-white">Semester</th>
                                    <th className="p-[14px_16px] text-left text-[15px] bg-[#16005d] text-white">Date</th>
                                    <th className="p-[14px_16px] text-left text-[15px] bg-[#16005d] text-white">Transaction ID</th>
                                    <th className="p-[14px_16px] text-left text-[15px] bg-[#16005d] text-white">Amount</th>
                                    <th className="p-[14px_16px] text-left text-[15px] bg-[#16005d] text-white">Status</th>
                                    <th className="p-[14px_16px] text-left text-[15px] bg-[#16005d] text-white">Receipt</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((txn, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-[#f4f4f4] hover:bg-[#ececec]">
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.semester}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.date}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.txnId}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.amount}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">
                                            <span className={`p-[6px_12px] rounded-[20px] text-[13px] font-semibold ${txn.status === 'Paid' ? 'bg-[#e6f4ea] text-[#1b7f3c]' : ''}`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="p-[14px_16px] text-left text-[15px]">
                                            <a href={'/uploads/dummy.pdf'} download>
                                                <button className="inline-flex items-center gap-[6px] p-[6px_12px] rounded-[20px] text-[13px] std-btn"
                                                style={{
                                                    backgroundColor: "#16005d",
                                                    color: "#ffffff"
                                                }}
                                                >
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