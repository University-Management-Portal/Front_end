import React, { useState } from "react";
import AttendanceData from "./AttendanceData";

function AdminAttendanceReport() {

  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
    date: "",                // ✅ NEW – calendar date
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // ORIGINAL ATTENDANCE FETCH
  let attendance =
    AttendanceData?.[filters.academic]?.[filters.sem]?.[filters.dept]?.[filters.sec] || [];

  // ✅ DATE BASED FILTER (without changing data structure)
  if (filters.date) {
    const d = filters.date.split("-").reverse().join("-"); 
    // convert yyyy-mm-dd → dd-mm-yyyy

    attendance = attendance.filter(item => item.date === d);
  }

  // 📥 DOWNLOAD CSV LOGIC
  const downloadCSV = (item) => {

    let csv = "Roll No,Name,Status\n";

    item.students.forEach((s) => {
      csv += `${s.roll},${s.name},${s.status}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.subject}-${item.date}.csv`;
    a.click();
  };

  return (
    <div className="p-[30px] min-h-screen">

      <h2 className="text-[#16005D] mb-[20px] text-[20px] font-bold">
        Report / Attendance
      </h2>

      {/* FILTER BAR – SAME THEME – NO UI CHANGE */}
      <div className="bg-gradient-to-r from-[#1b0066] to-[#12004d] h-[100px] rounded-[14px] flex items-center justify-around px-[30px] w-full max-w-[1458px] mx-auto my-[20px]">

        {["academic","sem","dept","sec"].map((field) => (

          <div key={field} className="flex flex-col gap-[6px] text-white text-[14px] font-medium">

            <label className="opacity-90 capitalize">{field}</label>

            <select
              name={field}
              value={filters[field]}
              onChange={handleChange}
              className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black"
            >

              {field === "academic" && (
                <>
                  <option value="2025-2026">2025 - 2026</option>
                  <option value="2024-2025">2024 - 2025</option>
                </>
              )}

              {field === "sem" &&
                [1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))
              }

              {field === "dept" && (
                <>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="EEE">EEE</option>
                </>
              )}

              {field === "sec" && (
                <>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </>
              )}

            </select>
          </div>
        ))}

        {/* ✅ ONLY NEW ADDITION – CALENDAR DATE PICKER */}
        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Date</label>

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black"
          />
        </div>

      </div>

      {/* CARDS SECTION – NO CHANGE */}
      <div className="flex gap-[40px] mt-[30px] p-[10px] flex-wrap">

        {attendance.length > 0 ? (

          attendance.map((item, index) => (

            <div key={index}>

              <div className="relative w-[440px] h-[200px] rounded-[16px] overflow-hidden shadow-lg">

                <img
                  src="/Advancednet.jpg"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  alt="bg"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a40]/90 to-[#1a1a6a]/70"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

                  <h4 className="text-[24px] font-bold">
                    {item.subject}
                  </h4>

                  <p className="mt-[6px] text-[16px]">
                    {item.date}
                  </p>

                  <button
                    onClick={() => downloadCSV(item)}
                    className="mt-[12px] bg-white text-[#16005D] px-[16px] py-[6px] rounded-[8px] font-semibold"
                  >
                    Download Report
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <p className="text-[#666] text-[16px] ml-[10px]">
            No attendance available
          </p>

        )}

      </div>

    </div>
  );
}

export default AdminAttendanceReport;
