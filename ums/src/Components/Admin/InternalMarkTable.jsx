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

  return (
    <div className="p-[20px]">

      <h2 className="text-[#16005d] text-[22px] font-bold mb-[15px]">
        Internal Mark Report
      </h2>

     

      <div className="mb-[15px] flex gap-[10px]">

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="std-btn p-[8px_16px] rounded-[8px]"
            style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff",
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            className="std-btn p-[8px_16px] rounded-[8px]"
            style={{
              backgroundColor: hover2 ? "#ffffff" : "#16005d",
              color: hover2 ? "#16005d" : "#ffffff",
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
          >
            Save
          </button>
        )}

        <button
          className="std-btn p-[8px_16px] rounded-[8px]"
          style={{
            backgroundColor: hover3 ? "#ffffff" : "#16005d",
            color: hover3 ? "#16005d" : "#ffffff",
          }}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
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
