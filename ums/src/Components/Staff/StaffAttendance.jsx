import React, { useState } from "react";
import studentsData from "./StudentList";

export default function StaffAttendance() {
  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
    hour: "h1",
    date: "",
  });

  const [attendance, setAttendance] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const key = `${filters.dept}-${filters.sem}-${filters.sec}`;
  const students = studentsData[key] || [];

  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setAttendance({});
    setShowReport(false);
  };

  const markAttendance = (roll, status) => {
    setAttendance(prev => ({
      ...prev,
      [roll]: status,
    }));
  };

  const handleSave = () => {
    for (let s of students) {
      if (!attendance[s.roll]) {
        alert("All students must be marked");
        return;
      }
    }
    alert("Attendance Saved Successfully");
  };

  const handleDownload = () => {
    let content = `
Academic Year : ${filters.academic}
Semester      : ${filters.sem}
Department    : ${filters.dept}
Section       : ${filters.sec}
Date          : ${filters.date}
Hour          : ${filters.hour.toUpperCase()}

Attendance Report
-----------------------------
Roll No       Status
-----------------------------
`;

    Object.entries(attendance).forEach(([roll, status]) => {
      content += `${roll}        ${status}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Attendance_${filters.dept}_${filters.sem}_${filters.sec}_${filters.date}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#f6f7fb]">

      <div className="max-w-[1499px] bg-[#16005D] p-[20px_25px] rounded-[12px] text-white flex gap-[55px] items-center flex-wrap">
        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[44px]">Academic Year</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[22px] text-black"
            value={filters.academic}
            onChange={e => updateFilter("academic", e.target.value)}
          >
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[64px]">Semester</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sem}
            onChange={e => updateFilter("sem", e.target.value)}
          >
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[54px]">Department</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[52px] text-black"
            value={filters.dept}
            onChange={e => updateFilter("dept", e.target.value)}
          >
            <option>CSE</option>
            <option>IT</option>
            <option>EEE</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[68px]">Section</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.sec}
            onChange={e => updateFilter("sec", e.target.value)}
          >
            <option>A</option>
            <option>B</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[68px]">Hours</label>
          <select
            className="h-[36px] p-[6px_10px] rounded-[8px] border-none outline-none text-[14px] font-semibold w-[150px] ml-[24px] appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px] pl-[29px] text-black"
            value={filters.hour}
            onChange={e => updateFilter("hour", e.target.value)}
          >
            <option value="h1">Hour 1</option>
            <option value="h2">Hour 2</option>
          </select>
        </div>

        <div>
          <label className="block text-[14px] mb-[6px] font-medium ml-[55px]">Date</label>
          <input type="date"
            className="h-[40px] px-[12px] rounded-[10px] border-none font-semibold pl-[20px] text-white"
            onChange={e => updateFilter("date", e.target.value)}
          />
        </div>
      </div>

      {!showReport && (
        <div className="flex flex-row m-[10px] ml-[1160px] gap-[10px]">
          <button className="std-btn w-[150px] h-[44px] m-[10px] mr-[20px]"
            onClick={handleSave}
            style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
          >
            Save
          </button>
          <button className="std-btn w-[150px] h-[44px] m-[10px] mr-[20px]"
            onClick={() => setShowReport(true)}
            style={{
              backgroundColor: hover2 ? "#ffffff" : "#16005d",
              color: hover2 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
          >
            Report
          </button>
        </div>
      )}

      {!showReport && students.length > 0 && (
        <div className="overflow-y-auto overflow-x-hidden">
          <table className="w-[1455px] table-fixed border-collapse h-[200px]">
            <thead>
              <tr className="bg-[#16005D] text-white">
                <th className="w-[80px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">S.No</th>
                <th className="w-[180px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">Name</th>
                <th className="w-[120px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">Roll No</th>
                <th className="w-[120px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">{filters.hour.toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.roll}>
                  <td className="w-[80px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">{i + 1}</td>
                  <td className="w-[180px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">{s.name}</td>
                  <td className="w-[120px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">{s.roll}</td>
                  <td className="w-[120px] h-[42px] text-center border border-[#ccc] p-[6px] pt-[20px]">
                    <label className="mr-3">
                      <input
                        type="radio"
                        name={s.roll}
                        onChange={() => markAttendance(s.roll, "P")}
                      />{" "}
                      P
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={s.roll}
                        onChange={() => markAttendance(s.roll, "A")}
                      />{" "}
                      A
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showReport && (
        <div className="mt-4">
          <h4 className="text-center text-xl font-bold">Attendance Report</h4>
          <table className="w-full border-collapse mt-3">
            <thead>
              <tr className="bg-[#16005D] text-white">
                <th className="p-3 border border-[#ccc]">Roll No</th>
                <th className="p-3 border border-[#ccc]">{filters.hour.toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendance).map(([roll, status]) => (
                <tr key={roll}>
                  <td className="p-3 border border-[#ccc] text-center">{roll}</td>
                  <td className="p-3 border border-[#ccc] text-center">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-4">
            <button
              className="std-btn px-4 py-2 rounded"
              onClick={handleDownload}
            >
              Download
            </button>

            <button className="std-btn px-4 py-2 rounded" onClick={() => setShowReport(false)}>
              Back
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
