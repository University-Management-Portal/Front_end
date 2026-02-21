import React, { useState, useEffect } from "react";
import { useLocation  } from "react-router-dom";
import Resultdata from "./Resultdata";
import ProfileData from "../Student/Studentdata";

export default function ResultView() {
  const [dateTime, setDateTime] = useState("");
  const [hover, setHover] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const formatted = now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        setDateTime(formatted);
      }, 500);
  
      return () => clearInterval(interval);
    }, []);

  const location = useLocation();
  const { semester } = location.state || {};

  const name = ProfileData.find(item => item.label === "Name")?.value;
  const regNo = ProfileData.find(item => item.label === "Reg No")?.value;

  const selectedSem = Resultdata.semesters.find(
    (s) => s.sem === semester
  );

  if (!selectedSem) {
    return <div className="p-10">No Data Available</div>;
  }

 
  

  return (
    <div className="bg-gray-100 min-h-screen p-6 print:bg-white">

      <div className="bg-[#16005d] text-white flex justify-between items-center px-6 py-3 h-[90px]">

      <div className="relative flex items-center gap-[840px]" >
     

        <img
          src="logo.jpeg"
          alt="College"
          className="h-[55px] w-[250px] mt-[6px] ml-[10px] mr-[20px] rounded-[6px]"
        />

        <div className="text-right">
            <p className="text-[16px] font-medium">
            {dateTime}
            </p>

            <p className="mt-1  text-[18px]">
            <span className="text-white-600 font-semibold">
                {name}
            </span>{" "}
            ({regNo})
            </p>
        </div>
        
      </div>

    </div>

      <div className="bg-white mt-20 shadow w-full border">

  <div className="grid grid-cols-4 border-b">
    <div className="bg-gray-200 p-3 font-bold border-r">Name</div>
    <div className="p-2 border-r text-[#16005d]">{Resultdata.name}</div>
    <div className="bg-gray-200 p-3 font-bold border-r">Reg No</div>
    <div className="p-2 text-[#16005d]">{Resultdata.regNo}</div>
  </div>

  <div className="grid grid-cols-4 border-b">
    <div className="bg-gray-200 p-3 font-bold border-r">Programme</div>
    <div className="p-2 border-r text-[#16005d]">{Resultdata.programme}</div>
    <div className="bg-gray-200 p-3 font-bold border-r">Month & Year of Exam</div>
    <div className="p-2 text-[#16005d]">{selectedSem.monthYear}</div>
  </div>

  <div className="grid grid-cols-4">
    <div className="bg-gray-200 p-3 font-bold border-r">Branch</div>
    <div className="p-3 border-r text-[#16005d]">{Resultdata.branch}</div>
    <div className="bg-gray-200 p-3 font-bold border-r">Semester</div>
    <div className="p-3 text-[#16005d]">{selectedSem.sem}</div>
  </div>

</div>

      <div className="bg-white mt-8 shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-[#16005d] text-white">
            <tr>
              <th className="p-3">Sem No</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credits</th>
              <th>Grade Point</th>
              <th>Letter Grade</th>
            </tr>
          </thead>
          <tbody>
            {selectedSem.subjects.map((sub, index) => (
              <tr key={index} className="border-t text-center">
                <td>{selectedSem.sem}</td>
                <td>{sub.code}</td>
                <td className="text-left px-2 py-2">{sub.title}</td>
                <td>{sub.credits}</td>
                <td className={sub.gradePoint === 0 ? "text-red-600 font-bold" : ""}>
                  {sub.gradePoint.toFixed(1)}
                </td>
                <td>{sub.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm mt-4">
        Disclaimer : Candidates are requested to verify the original marksheet for correctness.
      </p>

      <div className="flex justify-center mt-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-orange-600 text-white px-6 py-2 rounded"
          style={{
                  backgroundColor: hover ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
        >
          Print
        </button>
      </div>

    </div>
  );
}