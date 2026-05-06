import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function InternalMarkTable() {
  const { state } = useLocation();
  const { academic, sem, dept, sec, subject } = state;

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axiosInstance.get("/academic/marks", {
          params: {
            academicYear: academic,
            semester: parseInt(sem),
            department: dept,
            section: sec,
            subject: subject,
          },
        });
        console.log("Marks API response:", res.data);
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to fetch marks", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, [academic, sem, dept, sec, subject]);

  const handleMarkChange = (index, field, value) => {
    const updated = [...students];
    updated[index] = { ...updated[index], [field]: value === "" ? "" : Number(value) };
    setStudents(updated);
  };

  const handleSave = async () => {
    try {
      for (const stu of students) {
        await axiosInstance.put(`/academic/marks/${stu.id}`, {
          studentName: stu.studentName,
          rollNo: stu.rollNo,
          subject: stu.subject,
          internal1: stu.internal1,
          internal2: stu.internal2,
          assignment1: stu.assignment1,
          assignment2: stu.assignment2,
          labMark: stu.labMark,
          academicYear: academic,
          semester: parseInt(sem),
          department: dept,
          section: sec,
        });
      }
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save marks", err);
    }
  };

  const handleDownload = () => {
    let csvContent =
      "Reg No,Name,Internal 1,Internal 2,Assignment 1,Assignment 2,Lab Mark,Total\n";

    students.forEach((stu) => {
      csvContent += `${stu.rollNo},${stu.studentName},${stu.internal1 ?? ""},${stu.internal2 ?? ""},${stu.assignment1 ?? ""},${stu.assignment2 ?? ""},${stu.labMark ?? ""},${stu.totalMark ?? ""}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject}_${dept}_${sec}_InternalMarks.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const btnStyle = (hovered) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "2px solid #16005d",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
    backgroundColor: hovered ? "#2d1a7a" : "#16005d",
    color: "#ffffff",
  });

  return (
    <div className="p-[20px]">
      <div className="flex items-center text-[18px] font-medium text-[#16005D] mb-[20px]">
        <span
          onClick={() => navigate(-2)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          Report
        </span>

        <span className="mx-2">/</span>

        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          Internal Mark
        </span>

        <span className="mx-2">/</span>

        <span>
          {subject} – {dept}-{sec}
        </span>
      </div>

      <div className="mb-[15px] flex gap-[10px]">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={btnStyle(hover1)}
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={btnStyle(hover2)}
          >
            Save
          </button>
        )}

        <button
          onClick={handleDownload}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
          style={btnStyle(hover3)}
        >
          Download
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-10">Loading marks...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No internal marks found for this class and subject
        </p>
      ) : (
        <table className="w-full max-w-[1500px] border mt-[10px] shadow">
          <thead className="bg-[#16005d] text-white">
            <tr>
              <th className="p-[10px]">Reg No</th>
              <th className="p-[10px]">Name</th>
              <th className="p-[10px]">Internal 1</th>
              <th className="p-[10px]">Internal 2</th>
              <th className="p-[10px]">Assignment 1</th>
              <th className="p-[10px]">Assignment 2</th>
              <th className="p-[10px]">Lab Mark</th>
              <th className="p-[10px]">Total</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu, i) => (
              <tr key={stu.id || i} className="text-center border-b">
                <td className="p-[8px]">{stu.rollNo}</td>
                <td className="p-[8px]">{stu.studentName}</td>
                {["internal1", "internal2", "assignment1", "assignment2", "labMark"].map(
                  (field) => (
                    <td key={field} className="p-[8px]">
                      {editMode ? (
                        <input
                          className="border p-[4px] w-[80px] text-center"
                          type="number"
                          value={stu[field] ?? ""}
                          onChange={(e) =>
                            handleMarkChange(i, field, e.target.value)
                          }
                        />
                      ) : (
                        stu[field] ?? "-"
                      )}
                    </td>
                  )
                )}
                <td className="p-[8px] font-semibold">{stu.totalMark ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InternalMarkTable;
