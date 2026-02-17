import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InternalMarksData from "./InternalMarksData";

function InternalMarkTable() {
  const { state } = useLocation();
  const { academic, sem, dept, sec, subject } = state;

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const subjectData =
    InternalMarksData[academic][sem][dept][sec].find(
      (s) => s.subject === subject
    );

  const [editMode, setEditMode] = useState(false);
  const [students, setStudents] = useState(subjectData.students);

  const handleMarkChange = (index, value) => {
    const updated = [...students];
    updated[index].mark = value;
    setStudents(updated);
  };

  const handleDownload = () => {
  let csvContent = "Reg No,Name,Mark\n";

  students.forEach((stu) => {
    csvContent += `${stu.regNo},${stu.name},${stu.mark}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${subject}_InternalMarks.csv`;
  a.click();

  URL.revokeObjectURL(url);
};


  return (
    <div className="p-[20px]">

      <h2 className="text-[#16005d] text-[22px] font-bold mb-[15px]">
        Internal Mark Report
      </h2>

     

      <div className="mb-[15px] flex gap-[10px]">

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "2px solid #16005d",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.3s",

              backgroundColor: hover1 ? "#16005d" : "#ffffff",
              color: hover1 ? "#ffffff" : "#16005d",
            }}
          >
            Edit
          </button>

        ) : (
          <button
          onClick={() => setEditMode(false)}
          onMouseEnter={() => setHover2(true)}
          onMouseLeave={() => setHover2(false)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",

            backgroundColor: hover2 ? "#16005d" : "#ffffff",
            color: hover2 ? "#ffffff" : "#16005d",
          }}
        >
          Save
        </button>
        )}

        <button
        onClick={handleDownload}
        onMouseEnter={() => setHover3(true)}
        onMouseLeave={() => setHover3(false)}
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "2px solid #16005d",
          cursor: "pointer",
          fontWeight: "500",
          transition: "0.3s",

          backgroundColor: hover3 ? "#16005d" : "#ffffff",
          color: hover3 ? "#ffffff" : "#16005d",
        }}
      >
        Download
      </button>


      </div>
      

      <table className="w-full max-w-[1500px] border mt-[10px] shadow">

        <thead className="bg-[#16005d] text-white">
          <tr>
            <th className="p-[10px]">Reg No</th>
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Mark</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu, i) => (
            <tr key={i} className="text-center border-b">

              <td className="p-[8px]">{stu.regNo}</td>

              <td className="p-[8px]">{stu.name}</td>

              <td className="p-[8px]">
                {editMode ? (
                  <input
                    className="border p-[4px] w-[80px] text-center"
                    type="number"
                    value={stu.mark}
                    onChange={(e) =>
                      handleMarkChange(i, e.target.value)
                    }
                  />
                ) : (
                  stu.mark
                )}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default InternalMarkTable;
