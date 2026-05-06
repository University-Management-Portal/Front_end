import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function StudentAssignmentDetial() {
  const { courseName, assignmentId } = useParams();
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [hoverDownload, setHoverDownload] = useState(false);

  const [assignment, setAssignment] = useState(null);
  const [courseObj, setCourseObj] = useState(null);
  const [file, setFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]);

  const fetchAssignment = async () => {
    try {
      const dept = localStorage.getItem("userDepartment");
      const studentId = localStorage.getItem("userId");
      if (!dept || !studentId) return;

      const courseRes = await axiosInstance.get(`/academic/courses/department/${encodeURIComponent(dept)}`);
      const properName = courseName.replaceAll("-", " ");
      const foundCourse = courseRes.data.find(c => c.courseCode.toLowerCase() === courseName.toLowerCase() || c.courseName.toLowerCase() === properName.toLowerCase());

      if (foundCourse) {
        setCourseObj(foundCourse);
        const assignRes = await axiosInstance.get(`/academic/assignments/course/${foundCourse.id}/student/${studentId}`);
        const found = assignRes.data.find(a => a.id === parseInt(assignmentId));
        setAssignment(found || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!assignment) {
    return (
      <div
        style={{
          marginTop: "40px",
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          color: "#0e0e0e",
          fontSize: "16px",
        }}
      >
        Assignment not found
      </div>
    );
  }

  const handleSaveUpload = async () => {
    if (!file) {
      setSnackbar({ open: true, message: "Select a file", type: "warning" });
      return;
    }
    try {
      const studentId = localStorage.getItem("userId");
      const studentName = localStorage.getItem("userName");

      const formData = new FormData();
      formData.append("studentId", studentId);
      formData.append("studentName", studentName);
      formData.append("file", file);

      await axiosInstance.post(`/academic/assignments/${assignment.id}/submit`, formData);
      setIsSaved(true);
      fetchAssignment();
      setSnackbar({ open: true, message: "Assignment submitted!", type: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to submit", type: "error" });
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        padding: "32px 48px",
        backgroundColor: "#f6f7fb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "500",
          color: "#16005D",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <span onClick={() => navigate(-3)} style={{ cursor: "pointer" }}>
          courses
        </span>

        <span style={{ margin: "0 8px" }}>{">"}</span>

        <span onClick={() => navigate(-3)} style={{ cursor: "pointer" }}>
          {courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName}` : courseName.replaceAll("-", " ")}
        </span>

        <span style={{ margin: "0 8px" }}>{">"}</span>

        <span onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          assignment
        </span>

        <span style={{ margin: "0 8px" }}>{">"}</span>

        <span>{assignment.title}</span>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "28px 32px",
          width: "100%",
          boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
          marginTop: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#16005d",
              margin: 0,
            }}
          >
            {assignment.title}
          </h2>

          <span
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              backgroundColor:
                assignment.status === "Submitted"
                  ? "#d4edda"
                  : "#fff3cd",
              color:
                assignment.status === "Submitted"
                  ? "#155724"
                  : "#856404",
            }}
          >
            {assignment.status}
          </span>
        </div>

        <p style={{ marginTop: "12px", fontSize: "15px" }}>
          Posted by <strong>{assignment.postedBy}</strong>
        </p>

        <p style={{ marginTop: "12px", fontSize: "15px" }}>
          Due date: <strong>{assignment.dueDate}</strong>
        </p>

        <div
          style={{
            marginTop: "22px",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          <p>{assignment.description}</p>
        </div>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {assignment.fileUrl && (
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Assignment File :
              </p>

              <a
                href={assignment.fileUrl}
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setHoverDownload(true)}
                onMouseLeave={() => setHoverDownload(false)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textDecoration: "none",
                  border: "2px solid #16005d",
                  transition: "0.3s",
                  cursor: "pointer",
                  backgroundColor: hoverDownload
                    ? "#16005d"
                    : "#ffffff",
                  color: hoverDownload
                    ? "#ffffff"
                    : "#16005d",
                }}
              >
                Download PDF
              </a>
            </div>
          )}

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <input type="file" onChange={e => setFile(e.target.files[0])} />

            <button
              onClick={handleSaveUpload}
              onMouseEnter={() => setHoverSave(true)}
              onMouseLeave={() => setHoverSave(false)}
              style={{
                padding: "12px 28px",
                borderRadius: "18px",
                border: "2px solid #16005d",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
                backgroundColor:
                  isSaved || hoverSave
                    ? "#16005d"
                    : "#ffffff",
                color:
                  isSaved || hoverSave
                    ? "#ffffff"
                    : "#16005d",
              }}
            >
              Save & Upload
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </div>
  );
}

export default StudentAssignmentDetial;
