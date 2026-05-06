import React from 'react'
import { useState } from 'react'
import DownloadIcon from "@mui/icons-material/Download";
import { Snackbar, Alert } from "@mui/material";
import axiosInstance from '../../api/axiosInstance';

function StudentFees() {

    const [activeTab, setActiveTab] = useState("structure");
    const [feeTab, setFeeTab] = useState("examfee");
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);
    const [hover4, setHover4] = useState(false);
    const [hover5, setHover5] = useState(false);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });


    const [fees, setFees] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [pendingExamFees, setPendingExamFees] = useState([]);
    const [pendingArrearFees, setPendingArrearFees] = useState([]);
    const studentId = localStorage.getItem("userId") || 1; // Used for user service only
    const registerNo = localStorage.getItem("userRegNo");

    React.useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // First get student profile to know their Batch Year
                const studentRes = await axiosInstance.get(`/users/${studentId}`);
                const batchYear = studentRes.data.year;

                // Pass batchYear into the Fee Structure endpoint
                const [feeRes, txnRes, pendingRes] = await Promise.all([
                    axiosInstance.get(`/assessment/fee-structure/batch/${batchYear}`),
                    axiosInstance.get(`/assessment/payments/student/${registerNo}`),
                    axiosInstance.get(`/assessment/exam-fees/student/${registerNo}/pending`)
                ]);

                setFees(feeRes.data);
                setTransactions(txnRes.data);

                // Split exam and arrear
                const allPending = pendingRes.data;
                setPendingExamFees(allPending.filter(f => f.feeType === 'REGULAR'));
                setPendingArrearFees(allPending.filter(f => f.feeType === 'ARREAR'));

            } catch (error) {
                console.error("Failed to load fee data", error);
                setSnackbar({ open: true, message: "Error loading fee details", type: "error" });
            }
        };
        fetchInitialData();
    }, [studentId]);

    const handlePayment = async (fee) => {
        try {
            const res = await axiosInstance.post(`/assessment/payments/create-order/${fee.id}`);
            const orderId = res.data;

            if (!window.Razorpay) {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => openRazorpay(fee, orderId);
                document.body.appendChild(script);
            } else {
                openRazorpay(fee, orderId);
            }
        } catch (error) {
            console.error("Order creation failed", error);
            setSnackbar({ open: true, message: "Failed to create payment order. Try again.", type: "error" });
        }
    };

    const openRazorpay = (fee, orderId) => {

        const options = {
            key: "rzp_test_SHf9twQFbaQrbs",
            amount: fee.amount * 100,
            currency: "INR",
            name: "Best Engineering College",
            description: `${fee.feeType} Fee Payment`,
            image: "/University Logo.png",
            order_id: orderId,

            handler: async function (response) {
                try {
                    await axiosInstance.post('/assessment/payments/verify', {
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    });

                    setSnackbar({ open: true, message: "Payment Successful. Payment ID: " + response.razorpay_payment_id, type: "success" });

                    // Remove from pending lists
                    if (fee.feeType === 'REGULAR') {
                        setPendingExamFees(prev => prev.filter(f => f.id !== fee.id));
                    } else {
                        setPendingArrearFees(prev => prev.filter(f => f.id !== fee.id));
                    }

                    // Refresh transaction history
                    const txnRes = await axiosInstance.get(`/assessment/payments/student/${registerNo}`);
                    setTransactions(txnRes.data);

                } catch (err) {
                    console.error("Verification failed", err);
                    setSnackbar({ open: true, message: "Payment verification failed.", type: "error" });
                }
            },

            modal: {
                ondismiss: function () {
                    setSnackbar({ open: true, message: "Payment Cancelled", type: "warning" });
                }
            },
            theme: {
                color: "#16005d"
            }
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
            console.log(response.error);
            setSnackbar({ open: true, message: "Payment Failed: " + response.error.description, type: "error" });
        });

        rzp.open();
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
                                        <td className="p-[14px_18px] text-left">{fee.category} {fee.academicYear ? `(Batch: ${fee.academicYear})` : ''}</td>
                                        <td className="p-[14px_18px] text-left font-semibold">₹{fee.amount}</td>
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

                                    backgroundColor: feeTab === "examfee" || hover4 ? "#2d1a7a" : "#ffffff",
                                    color: feeTab === "examfee" || hover4 ? "#ffffff" : "#16005d",

                                }}
                            >
                                Exam Fees
                            </button>

                            <button
                                onClick={() => setFeeTab("arrearfee")}
                                onMouseEnter={() => setHover5(true)}
                                onMouseLeave={() => setHover5(false)}
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

                                    backgroundColor: feeTab === "arrearfee" || hover5 ? "#2d1a7a" : "#ffffff",
                                    color: feeTab === "arrearfee" || hover5 ? "#ffffff" : "#16005d",

                                }}
                            >
                                Arrear Fees
                            </button>
                        </div>
                        <div className='fee-down'>
                            {feeTab === "examfee" && (
                                <div className='mt-[20px] flex flex-col w-full min-h-[70vh]'>

                                    {pendingExamFees.length === 0 ? (
                                        <div>
                                            <div className="w-full min-h-[300px] flex items-center justify-center text-center">
                                                <p className="text-[18px] font-medium text-black">No Pending Exam Fees.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        pendingExamFees.map((items) => (
                                            <div className="w-[400px] bg-white rounded-[28px] p-[28px_32px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] flex flex-col gap-[14px] mt-[24px] ml-[40px]" key={items.id}>
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
                                                    onMouseEnter={() => setHoveredCardId(items.id)}
                                                    onMouseLeave={() => setHoveredCardId(null)}
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

                                                        backgroundColor: hoveredCardId === items.id ? "#2d1a7a" : "#16005d",
                                                        color: "#ffffff",
                                                    }}
                                                    onClick={() => handlePayment(items)}

                                                >
                                                    Pay Now
                                                </button>

                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {feeTab === "arrearfee" && (
                                <div className='mt-[20px] flex flex-col w-full min-h-[70vh]'>

                                    {pendingArrearFees.length === 0 ? (
                                        <div>
                                            <div className="w-full min-h-[300px] flex items-center justify-center text-center">
                                                <p className="text-[18px] font-medium text-black">No Pending Arrear Fees.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        pendingArrearFees.map((items) => (
                                            <div className="w-[400px] bg-white rounded-[28px] p-[28px_32px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] flex flex-col gap-[14px] mt-[24px] ml-[40px]" key={items.id}>
                                                <p className="text-[15px] text-[#333]"><strong>Semester :</strong> {items.semester}</p>
                                                <p className="text-[15px] text-[#333]"><strong>Arrear Fee :</strong> ₹{items.amount}</p>
                                                <p className="text-[15px] text-[#333]"><strong>Due Date :</strong> {items.dueDate}</p>
                                                <p className="text-[15px] text-[#333]"><strong>Fine :</strong> ₹{items.finePerDay || 0}</p>
                                                <p className="text-[15px] text-[#333]">
                                                    <strong>Status :</strong>{" "}
                                                    <span style={{ color: '#b36b00' }}>Pending</span>
                                                </p>
                                                <button
                                                    onMouseEnter={() => setHoveredCardId(items.id)}
                                                    onMouseLeave={() => setHoveredCardId(null)}
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
                                                        backgroundColor: hoveredCardId === items.id ? "#2d1a7a" : "#16005d",
                                                        color: "#ffffff",
                                                    }}
                                                    onClick={() => handlePayment(items)}
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
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.semester || '-'}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.paymentDate ? txn.paymentDate.split('T')[0] : 'N/A'}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">{txn.transactionId || txn.razorpayPaymentId}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">₹{txn.amount}</td>
                                        <td className="p-[14px_16px] text-left text-[15px]">
                                            <span className={`p-[6px_12px] rounded-[20px] text-[13px] font-semibold ${txn.status === 'Completed' || txn.status === 'SUCCESS' ? 'bg-[#e6f4ea] text-[#1b7f3c]' : 'bg-red-100 text-red-600'}`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="p-[14px_16px] text-left text-[15px]">
                                            <a href={'/uploads/dummy.pdf'} download>
                                                <button className="inline-flex items-center gap-[6px] p-[6px_12px] rounded-[20px] text-[13px] std-btn"

                                                    style={{
                                                        backgroundColor: "#16005d",
                                                        color: "#ffffff",
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

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default StudentFees