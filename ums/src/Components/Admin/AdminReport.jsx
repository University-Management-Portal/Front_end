import React from "react";
import { useNavigate } from "react-router-dom";

function AdminReport() {
  const navigate = useNavigate();

  return (
    <div className="p-[30px] min-h-screen">
      <h2 className="text-[#16005D] mb-[20px] text-[20px] font-bold">Report Dashboard</h2>

      <div className="flex gap-[40px] mt-[30px] p-[10px]">
        <div
          className="inline-flex items-center w-[420px] h-[180px] rounded-[18px] cursor-pointer text-[25px] font-bold tracking-[1px] transition-all bg-cover bg-center bg-no-repeat border-[0.2px] border-[#16005D] text-black hover:-translate-y-[6px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)] justify-end pr-[42px] bg-[url('/assignment-banner.jpg')]"
          onClick={() => navigate("/admin-report/internal")}
        >
          <h3 className="m-0 leading-[1.3]">Internal Mark<br />Report</h3>
        </div>

        <div
          className="inline-flex items-center w-[420px] h-[180px] rounded-[18px] cursor-pointer text-[25px] font-bold tracking-[1px] transition-all bg-cover bg-center bg-no-repeat border-[0.2px] border-[#16005D] text-black hover:-translate-y-[6px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)] justify-start pl-[42px] bg-[url('/material.jpg')]"
          onClick={() => navigate("/admin-report/assignment")}
        >
          <h3 className="m-0 leading-[1.3]">Assignment<br />Report</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminReport;
