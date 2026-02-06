import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentData from "./AssignmentData";

function AdminAssignmentReport() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const assignments =
    AssignmentData?.[filters.academic]?.[filters.sem]?.[filters.dept]?.[
    filters.sec
    ] || [];

  return (
    <div className="p-[30px] min-h-screen">
      <h2 className="text-[#16005D] mb-[20px] text-[20px] font-bold">Report / Assignment</h2>

      {/* FILTER BAR */}
      <div className="bg-gradient-to-r from-[#1b0066] to-[#12004d] h-[100px] rounded-[14px] flex items-center justify-around px-[30px] w-full max-w-[1458px] mx-auto my-[20px]">
        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Academic Year</label>
          <select name="academic" value={filters.academic} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            <option value="2025-2026">2025 - 2026</option>
            <option value="2024-2025">2024 - 2025</option>
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Semester</label>
          <select name="sem" value={filters.sem} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Department</label>
          <select name="dept" value={filters.dept} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="Mech">Mech</option>
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Section</label>
          <select name="sec" value={filters.sec} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
      </div>

      <div className="flex gap-[40px] mt-[30px] p-[10px] flex-wrap">

  {assignments.length > 0 ? (

    assignments.map((item, index) => (

      <div key={index}>

        <div
          className="relative w-[440px] h-[200px] rounded-[16px] overflow-hidden cursor-pointer shadow-lg hover:scale-[1.02] transition-all duration-200"
          onClick={() =>
            navigate("/admin-report/assignment/table", {
              state: {
                academic: filters.academic,
                sem: filters.sem,
                dept: filters.dept,
                sec: filters.sec,
                assignment: item.assignment,
              },
            })
          }
        >

          <img
            src="/Advancednet.jpg"       
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="assignment-bg"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a40]/90 to-[#1a1a6a]/70"></div>

          <div className="absolute inset-0 flex items-center justify-center text-white">
            <h4 className="text-[30px] font-bold">
              {item.assignment}
            </h4>
          </div>

        </div>

      </div>

    ))

  ) : (

    <p className="text-[#666] text-[16px] ml-[10px]">
      No assignments available for selected class
    </p>

  )}

</div>

    </div>
  );
}

export default AdminAssignmentReport;
