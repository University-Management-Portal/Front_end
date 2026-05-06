import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExamRules from "./ExamRules";
import axiosInstance from "../../api/axiosInstance";
import CircleIcon from "@mui/icons-material/Circle";
import { Snackbar, Alert } from "@mui/material";

function StudentExam() {


  const [activeTab, setActiveTab] = useState("rules");
  const [showImage, setShowImage] = useState(false);
  const [semester, setSemester] = useState("");

  const [schedules, setSchedules] = useState([]);
  const [examFees, setExamFees] = useState([]);

  useEffect(() => {
    fetchPendingFees();
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const semStr = localStorage.getItem("currentSemester");
      const dept = localStorage.getItem("userDepartment");
      if (semStr && dept) {
        const year = Math.ceil(parseInt(semStr, 10) / 2);
        const res = await axiosInstance.get(`/assessment/exams/schedules/year/${year}`);
        const filtered = res.data.filter(s => s.department === dept);
        setSchedules(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingFees = async () => {
    try {
      const registerNo = localStorage.getItem("userRegNo");
      if (registerNo) {
        const res = await axiosInstance.get(`/assessment/exam-fees/student/${registerNo}/pending`);
        setExamFees(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const semInt = semester ? parseInt(semester.replace("sem", ""), 10) : null;
  const feeDetails = examFees.find(f => f.semester === semInt);
  const schedule = true;
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [hover5, setHover5] = useState(false);
  const [hover6, setHover6] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  const statusColor = (status) => {
    if (status === "Completed") return "text-[#1e7e34]";
    if (status === "Pending") return "text-[#b36b00]";
    return "text-[#777]";
  };

  const handlePayment = async (examFeeId, amount) => {

    const cleanAmount = Number(amount.toString().replace(/,/g, ""));

    if (!cleanAmount || cleanAmount <= 0) {
      setSnackbar({ open: true, message: "Invalid amount", type: "error" });
      return;
    }

    try {
      const orderRes = await axiosInstance.post(`/assessment/payments/create-order/${examFeeId}`);
      const orderData = orderRes.data;

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => openRazorpay(orderData.id, cleanAmount);
        document.body.appendChild(script);
      } else {
        openRazorpay(orderData.id, cleanAmount);
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to initialize payment", type: "error" });
    }
  };

  const openRazorpay = (orderId, amount) => {

    const options = {
      key: "rzp_test_SHf9twQFbaQrbs",
      amount: amount * 100,
      currency: "INR",
      name: "Best Engineering College",
      description: "Exam Fee Payment",
      image: "/University Logo.png",
      order_id: orderId,

      handler: async function (response) {
        try {
          const verifyData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          };
          await axiosInstance.post(`/assessment/payments/verify`, verifyData);

          setSnackbar({ open: true, message: "Payment Successful!", type: "success" });
          fetchPendingFees();
        } catch (err) {
          console.error(err);
          setSnackbar({ open: true, message: "Payment Verification Failed", type: "error" });
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
    <div className="flex p-[40px] gap-[40px] min-h-[calc(100vh-80px)]">

      <div className="w-[220px] flex flex-col gap-[16px]">

        <button
          onClick={() => setActiveTab("rules")}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            padding: "12px 18px",
            borderRadius: "18px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.1s",
            width: "100%",

            backgroundColor:
              activeTab === "rules" || hover1
                ? "#16005d"
                : "#ffffff",

            color:
              activeTab === "rules" || hover1
                ? "#ffffff"
                : "#16005d",
          }}
        >
          Rules & Regulation
        </button>


        <button
          onClick={() => setActiveTab("schedule")}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          style={{
            padding: "12px 18px",
            borderRadius: "18px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.1s",
            width: "100%",

            backgroundColor:
              activeTab === "schedule" || hover2
                ? "#16005d"
                : "#ffffff",

            color:
              activeTab === "schedule" || hover2
                ? "#ffffff"
                : "#16005d",
          }}
        >
          Exam Schedule
        </button>


        <button
          onClick={() => setActiveTab("result")}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
          style={{
            padding: "12px 18px",
            borderRadius: "18px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.1s",
            width: "100%",

            backgroundColor:
              activeTab === "result" || hover3
                ? "#16005d"
                : "#ffffff",

            color:
              activeTab === "result" || hover3
                ? "#ffffff"
                : "#16005d",
          }}
        >
          Result
        </button>


        <button
          onClick={() => setActiveTab("fee")}
          onMouseEnter={() => setHover4(true)}
          onMouseLeave={() => setHover4(false)}
          style={{
            padding: "12px 18px",
            borderRadius: "18px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "0.1s",
            width: "100%",

            backgroundColor:
              activeTab === "fee" || hover4
                ? "#16005d"
                : "#ffffff",

            color:
              activeTab === "fee" || hover4
                ? "#ffffff"
                : "#16005d",
          }}
        >
          Exam Fee Details
        </button>

      </div>

      <div className="flex-1 border-l-2 border-[#ddd] pl-[60px] text-[16px]">
        {activeTab === "rules" && (
          <>
            <h3 className="mb-[12px] text-[26px] text-[#16005d] font-bold">Examination Rules & Regulations</h3>
            <ul className="pl-[20px] mt-[20px] list-none">
              {ExamRules.map((rule, index) => (
                <li key={index} className="mb-[12px] text-[#333] flex items-start gap-[10px]">
                  <CircleIcon style={{ color: "#16005d", fontSize: "12px" }} />
                  <span className="mb-[10px]">{rule}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "schedule" && (
          schedules.length > 0 ? (
            <div className="flex flex-col gap-[20px] mr-[20px]">
              {schedules.map((sched) => (
                <div key={sched.id}>
                  <button
                    onClick={() => setShowImage(showImage === sched.id ? null : sched.id)}
                    className="no-underline font-semibold w-full text-center"
                    style={{
                      backgroundColor: hover5 === sched.id ? "#2d1a7a" : "#16005d",
                      color: "#ffffff",
                      padding: "10px",
                      borderRadius: "8px"
                    }}
                    onMouseEnter={() => setHover5(sched.id)}
                    onMouseLeave={() => setHover5(null)}
                  >
                    <h4 className="text-center m-0">
                      {sched.title}
                    </h4>
                  </button>

                  {showImage === sched.id && (
                    <div className="mt-3">
                      <img
                        src={sched.imageUrl}
                        className="w-full border rounded border-[#16005d]"
                        alt={sched.title}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full mt-[60px] text-[17px] font-medium text-black text-center">
              End Semester Schedule Not Uploaded Yet.
            </div>
          )
        )}


        {activeTab === "result" && (
          <div className="h-full  text-[17px] font-medium text-black text-center mt-[60px]">
            Results will be published on university portal.{" "}
            <Link to="/result" className="font-semibold text-[#16005d] hover:underline ml-1">Click Here</Link>
          </div>
        )}

        {activeTab === "fee" && (
          <div className="mt-[20px] flex flex-col w-full min-h-[70vh]">

            <div className="w-full min-h-[300px] flex items-center justify-center text-center">

              {/* Dropdown ALWAYS visible */}
              <div className="flex flex-col items-center">

                <select
                  className="w-[320px] p-[12px_44px_12px_16px] text-[16px] font-medium rounded-[10px] border border-[#ccc] outline-none cursor-pointer bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:24px]"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  <option value="sem1">Semester 1</option>
                  <option value="sem2">Semester 2</option>
                  <option value="sem3">Semester 3</option>
                  <option value="sem4">Semester 4</option>
                  <option value="sem5">Semester 5</option>
                  <option value="sem6">Semester 6</option>
                  <option value="sem7">Semester 7</option>
                  <option value="sem8">Semester 8</option>
                </select>

                {!semester && (
                  <div className="text-center font-medium mt-4">
                    Please select a semester to view exam fee details.
                  </div>
                )}

                {/* Details section */}
                {semester && feeDetails && (
                  <div className="mt-6">
                    <div className="w-[480px] bg-white rounded-[28px] p-[28px_32px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] flex flex-col gap-[14px]">

                      <p className="text-[15px] text-[#333]">
                        <strong>Exam Fee:</strong> ₹{feeDetails.amount}
                      </p>

                      <p className="text-[15px] text-[#333]">
                        <strong>Due Date:</strong> {feeDetails.dueDate}
                      </p>

                      <p className="text-[15px] text-[#333]">
                        <strong>Fine:</strong> {feeDetails.finePerDay}
                      </p>

                      <p className="text-[15px] text-[#333]">
                        <strong>Status:</strong>{" "}
                        <span className={`font-semibold ${statusColor(feeDetails.status)}`}>
                          {feeDetails.status}
                        </span>
                      </p>

                      {feeDetails.status === "Pending" && (
                        <button className="mt-[14px] self-start p-[10px_22px] rounded-[20px] text-[14px] font-semibold std-btn"
                          onMouseEnter={() => setHover6(true)}
                          onMouseLeave={() => setHover6(false)}
                          style={{
                            backgroundColor: hover6 ? "#2d1a7a" : "#16005d",
                            color: "#ffffff",
                          }}
                          onClick={() => handlePayment(feeDetails.id, feeDetails.amount)}
                        >
                          Pay Now
                        </button>
                      )}

                    </div>
                  </div>
                )}

              </div>
            </div>
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
  );
}

export default StudentExam;
