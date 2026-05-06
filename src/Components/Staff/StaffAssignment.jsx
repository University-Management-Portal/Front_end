import React, { useState, useRef, useEffect } from 'react'
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

export default function StaffAssignment() {

  const location = useLocation();
  const { subject, dept } = location.state || {}; // courseName, dept
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const menuRef = useRef(null);
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  useEffect(() => {
    fetchCourseAndAssignments();
  }, [subject, dept]);

  const fetchCourseAndAssignments = async () => {
    try {
      if (!courseName && !subject) return;
      const facultyName = localStorage.getItem("userName");
      const courseRes = await axiosInstance.get(`/academic/courses/faculty/${encodeURIComponent(facultyName)}`);

      let courseObj;
      if (courseName) {
        courseObj = courseRes.data.find(c => c.courseCode.toLowerCase() === courseName.toLowerCase() || c.courseName.toLowerCase() === courseName.toLowerCase());
      }
      if (!courseObj && subject) {
        const namePart = subject.includes(" / ") ? subject.split(" / ")[1] : subject;
        courseObj = courseRes.data.find(c => c.courseName === namePart || c.courseName === subject);
      }

      if (courseObj) {
        setCourseId(courseObj.id);
        const assignRes = await axiosInstance.get(`/academic/assignments/course/${courseObj.id}`);
        setAssignments(assignRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatus = (due) => {
    const today = new Date();
    return new Date(due) >= today ? "OPEN" : "CLOSED";
  };

  const handleAdd = async () => {
    if (!title || !dueDate || !file || !courseId) {
      setSnackbar({ open: true, message: "All fields are required", type: "warning" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              title,
              description: "",
              courseId,
              department: dept,
              postedBy: localStorage.getItem("userName"),
              dueDate,
            }),
          ],
          { type: "application/json" }
        )
      );
      formData.append("file", file);

      await axiosInstance.post('/academic/assignments', formData);

      setTitle('');
      setDueDate('');
      setFile(null);
      setShowForm(false);
      setSnackbar({ open: true, message: "Assignment added successfully", type: "success" });
      fetchCourseAndAssignments();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to add assignment", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/academic/assignments/${id}`);
      fetchCourseAndAssignments();
      setActiveMenu(null);
    } catch (err) {
      console.error(err);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const toggleEnable = async (id) => {
    try {
      await axiosInstance.put(`/academic/assignments/${id}/toggle`);
      fetchCourseAndAssignments();
      setActiveMenu(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-[40px] flex justify-center bg-[#f4f6fb]">
      <div className="w-full max-w-[1000px]">

        <div className="flex items-center justify-between py-[10px]">
          <div className="flex items-center text-[16px] font-medium text-[#16005D]">

            <span
              onClick={() => navigate(-2)}
              style={{ cursor: "pointer" }}
              className="hover:underline"
            >
              courses
            </span>

            <span className="mx-2">&gt;</span>

            <span
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
              className="hover:underline"
            >
              {subject}
            </span>

            <span className="mx-2">&gt;</span>

            <span>assignment</span>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "2px solid #16005D",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.3s",

              backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            <BsPlusLg />
            Add Assignment
          </button>

        </div>


        {showForm && (
          <div className="bg-white rounded-[10px] flex gap-[8px] items-center flex-wrap mb-[30px] w-[1030px] p-[20px] mt-[20px] ml-[-20px]">
            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="p-[8px] rounded-[6px] border border-[#ccc] text-[14px] w-[200px] "
            />

            <input
              type="date"
              value={dueDate}
              min={today}
              onChange={e => setDueDate(e.target.value)}
              className="p-[8px] rounded-[6px] border border-[#ccc] text-[14px] w-[180px] ml-[20px]"
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setFile(e.target.files[0])}
              className="p-[8px] rounded-[6px] border border-[#ccc] text-[14px] w-[280px] ml-[20px]"
            />



            <button
              onClick={handleAdd}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              style={{
                width: "100px",
                marginLeft: "40px",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "2px solid #16005D",
                cursor: "pointer",
                fontWeight: "500",
                transition: "0.3s",

                backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
                color: "#ffffff",
              }}
            >
              Add
            </button>

            <button
              onClick={handleCancel}
              onMouseEnter={() => setHover3(true)}
              onMouseLeave={() => setHover3(false)}
              style={{
                width: "100px",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "2px solid #c80c0c",
                cursor: "pointer",
                fontWeight: "500",
                transition: "0.3s",

                backgroundColor: hover3 ? "#e8323b" : "#c80c0c",
                color: "#ffffff",
              }}
            >
              Cancel
            </button>
          </div>

        )}


        {assignments.length === 0 ? (
          <div className="text-center mt-[80px] text-gray-500 text-[16px]">No Assignments Here 📄</div>
        ) : (
          <table className="w-full bg-white rounded-[10px] overflow-visible border-collapse">
            <thead>
              <tr className="bg-[#e5e7eb]">
                <th className="p-[14px] text-left text-[#16005D]">Title</th>
                <th className="p-[14px] text-left text-[#16005D]">Due Date</th>
                <th className="p-[14px] text-left text-[#16005D]">Status</th>
                <th className="p-[14px] text-left text-[#16005D]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a, index) => (
                <tr key={a.id} className={`${!a.enabled ? "opacity-50" : ""} even:bg-[#f9fafb]`}>
                  <td className="p-[14px] text-left text-[#16005D]">{a.title}</td>
                  <td className="p-[14px] text-left text-[#16005D]">{a.dueDate}</td>

                  <td className={`p-[14px] text-left ${getStatus(a.dueDate) === "OPEN" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}`}>
                    {getStatus(a.dueDate)}
                  </td>

                  <td className="relative cursor-pointer p-[14px] text-left text-[#16005D]">
                    <BsThreeDotsVertical
                      onClick={() =>
                        setActiveMenu(activeMenu === index ? null : index)
                      }
                    />

                    {activeMenu === index && (
                      <div ref={menuRef} className="absolute right-0 top-[20px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-[6px] z-10 w-[100px]">
                        <p className="p-[8px_14px] cursor-pointer hover:bg-[#f1f5f9]" onClick={() => window.open(a.fileUrl, "_blank")}>
                          View
                        </p>

                        <p className="p-[8px_14px] cursor-pointer hover:bg-[#f1f5f9]" onClick={() => toggleEnable(a.id)}>
                          {a.enabled ? "Disable" : "Enable"}
                        </p>
                        <p className="p-[8px_14px] cursor-pointer hover:bg-[#f1f5f9] text-red-600" onClick={() => handleDelete(a.id)}>Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  )
}
