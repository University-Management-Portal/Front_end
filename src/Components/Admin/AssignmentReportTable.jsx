import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function AssignmentReportTable() {
  const { state } = useLocation();
  const { academic, sem, dept, sec, assignment, assignmentId } = state;
  const navigate = useNavigate();

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubmissionsAndStudents = async () => {
      setLoading(true);
      try {
        // 1. Fetch Existing Submissions
        const subRes = await axiosInstance.get(`/academic/assignments/${assignmentId}/submissions`);
        const existingSubmissions = subRes.data;

        // 2. Fetch all active students via User Service
        const usersRes = await axiosInstance.get('/users');
        const academicStartYear = parseInt(academic.split("-")[0]);
        const semester = parseInt(sem);
        const yearOffset = Math.ceil(semester / 2) - 1;

        const classStudents = usersRes.data.filter(u => {
          if (u.role !== 'STUDENT') return false;
          if (u.department !== dept) return false;
          if (u.section !== sec) return false;
          const joinYear = parseInt(u.year);
          return (joinYear + yearOffset) === academicStartYear;
        });

        // 3. Merge Arrays ensuring EVERY student exists
        const mergedStudents = classStudents.map(student => {
          const subData = existingSubmissions.find(s => s.studentId === student.id);
          return {
            id: subData ? subData.id : null,
            studentId: student.id,
            studentName: student.name,
            rollNo: student.regNo,
            status: subData ? subData.status : "NOT SUBMITTED",
            mark: subData?.mark ?? "",
            existsInDb: !!subData
          };
        });

        // 4. Sort alphabetically by Roll No (or Name if you prefer)
        mergedStudents.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
        setStudents(mergedStudents);

      } catch (error) {
        console.error("Failed to fetch assignments and students", error);
      } finally {
        setLoading(false);
      }
    };
    if (assignmentId && academic && sem && dept && sec) {
      fetchSubmissionsAndStudents();
    }
  }, [assignmentId, academic, sem, dept, sec]);

  const handleDownload = () => {
    let csvContent = "Roll No,Name,Status,Mark\n";

    students.forEach((stu) => {
      csvContent += `${stu.rollNo},${stu.studentName},${stu.status},${stu.mark !== "" ? stu.mark : "0"}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${assignment}_Assignment.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleMarkChange = (index, value) => {
    const updated = [...students];
    updated[index].mark = value === "" ? "" : Number(value);
    setStudents(updated);
  };

  const handleSave = async () => {
    try {
      const updates = [];
      const inserts = [];

      for (const stu of students) {
        // Only process students whose mark has been mapped with a real numbered value
        if (stu.mark !== "") {
          if (stu.existsInDb && stu.id) {
            // Existing Submission -> Normal PUT
            updates.push(
              axiosInstance.put(`/academic/assignments/submissions/${stu.id}/grade`, {
                mark: stu.mark
              })
            );
          } else {
            // Non-Existent Submission -> new POST Override endpoint
            inserts.push(
              axiosInstance.post(`/academic/assignments/${assignmentId}/submissions/override-grade`, null, {
                params: {
                  studentId: stu.studentId,
                  studentName: stu.studentName,
                  mark: stu.mark
                }
              })
            );
          }
        }
      }

      if (updates.length > 0) await Promise.all(updates);
      if (inserts.length > 0) await Promise.all(inserts);

      setEditMode(false);

      // Soft Refresh visually
      setStudents(prev => prev.map(s => ({
        ...s,
        status: (s.status === "NOT SUBMITTED" && s.mark !== "") ? "SUBMITTED" : s.status,
        existsInDb: s.mark !== "" ? true : s.existsInDb
      })));

    } catch (err) {
      console.error("Failed to save assignment grades", err);
      alert("Error saving grades. Check console for details.");
    }
  };

  const btnStyle = (hovered) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "2px solid #16005d",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
    backgroundColor: hovered ? "#2d1a7a" : "#16005d",
    color: "#ffffff"
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
          Assignment
        </span>
        <span className="mx-2">/</span>
        <span>
          {assignment} ({dept}-{sec})
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
        <p className="text-gray-500 text-center mt-[50px]">Loading students & submissions...</p>
      ) : students.length > 0 ? (
        <table className="w-full max-w-[1500px] border mt-[10px] shadow">
          <thead className="bg-[#16005d] text-white">
            <tr>
              <th className="p-[10px]">Roll No</th>
              <th className="p-[10px] text-left">Name</th>
              <th className="p-[10px]">Status</th>
              <th className="p-[10px]">Mark</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, i) => (
              <tr key={i} className={`text-center border-b ${stu.status === 'NOT SUBMITTED' ? 'bg-red-50 text-red-600' : ''}`}>
                <td className="p-[10px]">{stu.rollNo}</td>
                <td className="p-[10px] text-left font-medium">{stu.studentName}</td>
                <td className="p-[10px]">{stu.status}</td>
                <td className="p-[10px]">
                  {editMode ? (
                    <input
                      className="border border-gray-300 rounded p-[4px] w-[80px] text-center text-black focus:outline-none focus:border-[#16005d]"
                      type="number"
                      value={stu.mark ?? ""}
                      onChange={(e) =>
                        handleMarkChange(i, e.target.value)
                      }
                    />
                  ) : (
                    stu.mark !== "" ? stu.mark : "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center mt-[50px]">No students found for this class.</p>
      )}
    </div>
  );
}

export default AssignmentReportTable;
