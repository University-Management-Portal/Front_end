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


    const handlePayment = (amount) => {
    if (!amount) {
        alert("Please enter the amount to be paid.");
        return;
    }

    const options = {
        key: "", 
        key_secret:"",
        amount: Number(amount) * 100,  
        currency: "INR",
        name: "University Management System",
        description: "Exam Fee Payment",
        handler: function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
            name: "Praveenkumar R",
            email: "praveenraja4493@gmail.com",
            contact: "7548897689"
        },
        notes: {
            address: "University Management System, Coimbatore"
        },
        theme: {
            color: "#16005d"
        }
    };

    const pay = new window.Razorpay(options);
    pay.open();  // ⚠️ YOU FORGOT THIS
};

    

    return (
        <div className='flex p-[40px] gap-[40px] min-h-[calc(100vh-80px)]'>
            <div className='w-[220px] flex flex-col gap-[16px]'>
                <button
                onClick={() => setActiveTab("structure")}
                onMouseEnter={() => setHover1(true)}
                onMouseLeave={() => setHover1(false)}
                style={{
                    padding: "12px 18px",
                    borderRadius: "18px",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "0.3s",
                    width: "100%",

                    backgroundColor:
                    activeTab === "structure" || hover1
                        ? "#16005d"
                        : "#ffffff",

                    color:
                    activeTab === "structure" || hover1
                        ? "#ffffff"
                        : "#16005d",
                }}
                >
                Fee Structure
                </button>

                <button
                onClick={() => setActiveTab("fee")}
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}
                style={{
                    padding: "12px 18px",
                    borderRadius: "18px",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "0.3s",
                    width: "100%",

                    backgroundColor:
                    activeTab === "fee" || hover2
                        ? "#16005d"
                        : "#ffffff",

                    color:
                    activeTab === "fee" || hover2
                        ? "#ffffff"
                        : "#16005d",
                }}
                >
                Fees Payment
                </button>

                <button
                onClick={() => setActiveTab("transaction")}
                onMouseEnter={() => setHover3(true)}
                onMouseLeave={() => setHover3(false)}
                style={{
                    padding: "12px 18px",
                    borderRadius: "18px",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "0.3s",
                    width: "100%",

                    backgroundColor:
                    activeTab === "transaction" || hover3
                        ? "#16005d"
                        : "#ffffff",

                    color:
                    activeTab === "transaction" || hover3
                        ? "#ffffff"
                        : "#16005d",
                }}
                >
                Transaction History
                </button>

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
                            <button
                            onClick={() => setFeeTab("examfee")}
                            onMouseEnter={() => setHover4(true)}
                            onMouseLeave={() => setHover4(false)}
                            style={{
                                padding: "12px 26px",
                                borderRadius: "10px",
                                border: "2px solid #16005d",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginRight: "20px",
                                transition: "0.3s",
                                boxShadow: "0 6px 14px rgba(22,0,93,0.25)",

                                backgroundColor: hover4 ? "#2d1a7a" : "#16005d",
                                color:"#ffffff",
               
                            }}
                            >
                            Exam Fees
                            </button>

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
                                                <button
                                                    onMouseEnter={() => setHover5(true)}
                                                    onMouseLeave={() => setHover5(false)}
                                                    style={{
                                                        marginTop: "14px",
                                                        alignSelf: "flex-start",
                                                        padding: "10px 22px",
                                                        borderRadius: "10px",
                                                        border: "2px solid #16005d",
                                                        cursor: "pointer",
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                        transition: "0.3s",

                                                        backgroundColor: hover5 ? "#2d1a7a" : "#16005d",
                                                        color:"#ffffff",
                                                    }}
                                                    value={items.amount}
                                                    onClick={() => handlePayment(items.amount)}

                                                    >
                                                    Pay Now
                                                    </button>

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
                                                    backgroundColor:  "#16005d",
                                                    color:"#ffffff",
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