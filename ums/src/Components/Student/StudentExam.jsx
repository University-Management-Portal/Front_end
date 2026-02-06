import React, { useState } from "react";
import { Link } from "react-router-dom";

function StudentExam() {
  const examfeeDetails = {
    sem1: { amount: "1450", dueDate: "2023-12-15", fine: "100 per day", status: "Completed" },
    sem2: { amount: "3950", dueDate: "2024-05-15", fine: "100 per day", status: "Completed" },
    sem3: { amount: "5450", dueDate: "2024-11-15", fine: "100 per day", status: "Completed" },
    sem4: { amount: "6950", dueDate: "2025-05-15", fine: "100 per day", status: "Completed" },
    sem5: { amount: "8450", dueDate: "2025-11-15", fine: "100 per day", status: "Completed" },
    sem6: { amount: "9950", dueDate: "2026-04-15", fine: "100 per day", status: "Pending" },
    sem7: { amount: "10,450", dueDate: "2026-11-15", fine: "100 per day", status: "Not Released" },
    sem8: { amount: "11,950", dueDate: "2027-01-15", fine: "100 per day", status: "Not Released" },
  };

  const [activeTab, setActiveTab] = useState("rules");
  const [showImage, setShowImage] = useState(false);
  const [semester, setSemester] = useState("");
  const feeDetails = examfeeDetails[semester];
  const schedule = true;
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [hover5, setHover5] = useState(false);

  const statusColor = (status) => {
    if (status === "Completed") return "text-[#1e7e34]";
    if (status === "Pending") return "text-[#b36b00]";
    return "text-[#777]";
  };

  return (
    <div className="flex p-[40px] gap-[40px] min-h-[calc(100vh-80px)]">

      <div className="w-[220px] flex flex-col gap-[16px]">

        <button
          className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "rules" ? "bg-[#16005d] text-white" : "bg-transparent text-black hover:bg-[#d9d9d9]"
            }`}
          onClick={() => setActiveTab("rules")}
          style={{
            backgroundColor: hover1 ? "#ffffff" : "#16005d",
            color: hover1 ? "#16005d" : "#ffffff",
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
        >
          Rules & Regulation
        </button>

        <button
          className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "schedule" ? "bg-[#16005d] text-white" : "bg-transparent text-black hover:bg-[#d9d9d9]"
            }`}
          onClick={() => setActiveTab("schedule")}
          style={{
            backgroundColor: hover2 ? "#ffffff" : "#16005d",
            color: hover2 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
        >
          Exam Schedule
        </button>

        <button
          className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "result" ? "bg-[#16005d] text-white" : "bg-transparent text-black hover:bg-[#d9d9d9]"
            }`}
          onClick={() => setActiveTab("result")}
          style={{
            backgroundColor: hover3 ? "#ffffff" : "#16005d",
            color: hover3 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
        >
          Result
        </button>

        <button
          className={`p-[12px_18px] rounded-[18px] border-none text-[18px] font-semibold cursor-pointer text-left ${activeTab === "fee" ? "bg-[#16005d] text-white" : "bg-transparent text-black hover:bg-[#d9d9d9]"
            }`}
          onClick={() => setActiveTab("fee")}
          style={{
            backgroundColor: hover4 ? "#ffffff" : "#16005d",
            color: hover4 ? "#16005d" : "#ffffff"
          }}
          onMouseEnter={() => setHover4(true)}
          onMouseLeave={() => setHover4(false)}
        >
          Exam Fee Details
        </button>
      </div>

      <div className="flex-1 border-l-2 border-[#ddd] pl-[60px] text-[16px]">
        {activeTab === "rules" && (
          <>
            <h3 className="mb-[12px] text-[26px] text-[#16005d] font-bold">Examination Rules & Regulations</h3>
            <ul className="pl-0 mt-[20px] list-none">
              {[
                "Minimum attendance and exam fees must be cleared.",
                "Enter hall 15 minutes before exam.",
                "Late entry after 30 minutes is prohibited.",
                "Hall ticket and ID card mandatory.",
                "Sit only in allotted seat.",
                "No mobiles or unauthorized materials.",
                "Maintain silence and discipline.",
                "No malpractice allowed.",
                "Follow invigilator instructions.",
                "No exit in first 30 and last 10 minutes.",
                "Submit answer script to invigilator.",
                "Fill all details correctly.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-[14px] mb-[18px] leading-[1.6] text-[16px] text-black">
                  <span className="mt-[6px] text-[14px] text-[#16005d] flex-shrink-0">●</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "schedule" && (
          schedule ? (
            <div>
              <button
                onClick={() => setShowImage(!showImage)}
                className="no-underline font-semibold"
                style={{
                  backgroundColor: hover5 ? "#ffffff" : "#16005d",
                  color: hover5 ? "#16005d" : "#ffffff"
                }}
                onMouseEnter={() => setHover5(true)}
                onMouseLeave={() => setHover5(false)}
              >
                <h4 className="text-center text-white-800 m-0">
                  ESE Sem 5 Schedule
                </h4>
              </button>

              {showImage && (
                <div className="mt-3">
                  <img
                    src="acd_cal.png"
                    className="w-full border rounded"
                    alt="Schedule"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[17px] font-medium text-black text-center">
              End Semester Schedule Not Uploaded Yet.
            </div>
          )
        )}


        {activeTab === "result" && (
          <div className="h-full flex items-center justify-center text-[17px] font-medium text-black text-center">
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

                {/* Message when not selected */}
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
                        <strong>Fine:</strong> {feeDetails.fine}
                      </p>

                      <p className="text-[15px] text-[#333]">
                        <strong>Status:</strong>{" "}
                        <span className={`font-semibold ${statusColor(feeDetails.status)}`}>
                          {feeDetails.status}
                        </span>
                      </p>

                      {feeDetails.status === "Pending" && (
                        <button className="mt-[14px] self-start p-[10px_22px] rounded-[20px] text-[14px] font-semibold std-btn">
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
    </div>
  );
}

export default StudentExam;
