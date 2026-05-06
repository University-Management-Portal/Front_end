import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderForm from "./FolderForm";
import axiosInstance from "../../api/axiosInstance";

function StaffMaterial() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [courseObj, setCourseObj] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchCourseAndFolders();
  }, [courseName]);

  const fetchCourseAndFolders = async () => {
    try {
      const facultyName = localStorage.getItem("userName");
      if (!facultyName) return;

      const courseRes = await axiosInstance.get(`/academic/courses/faculty/${encodeURIComponent(facultyName)}`);

      const properName = courseName.replaceAll("-", " ");
      const foundCourse = courseRes.data.find(c => c.courseCode.toLowerCase() === courseName.toLowerCase() || c.courseName.toLowerCase() === properName.toLowerCase());

      if (foundCourse) {
        setCourseObj(foundCourse);
        const folderRes = await axiosInstance.get(`/academic/materials/folders/course/${foundCourse.id}`);
        setFolders(folderRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch folders", err);
    }
  };

  const handleAddFolder = async (data) => {
    if (!courseObj) return;
    try {
      await axiosInstance.post('/academic/materials/folders', null, {
        params: {
          courseId: courseObj.id,
          title: data.title
        }
      });
      fetchCourseAndFolders();
    } catch (err) {
      console.error("Failed to add folder", err.response?.data || err);
      setSnackbar({ open: true, message: "Failed to create folder", type: "error" });
    }
  };

  return (
    <div className="p-[20px] min-h-screen">

      <div className="flex items-center text-[16px] font-medium text-[#16005D] mb-[20px]">

        <span
          onClick={() => navigate(-2)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          courses
        </span>

        <span className="mx-2">&gt;</span>

        <span
          onClick={() => navigate(-2)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          {courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName}` : courseName.replaceAll("-", " ")}
        </span>

        <span className="mx-2">&gt;</span>

        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          material
        </span>

      </div>


      <div className="flex justify-between items-center bg-[url('/commen.jpg')] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] mt-[20px] min-h-[140px]">
        <div className="text-[38px] font-bold">
          {courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName.toUpperCase()}` : courseName.replaceAll("-", " ").toUpperCase()}
        </div>
        <button
          onClick={() => setOpenForm(true)}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "2px solid #ffffff",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
            whiteSpace: "nowrap",
            backgroundColor: hover1 ? "#ffffff" : "transparent",
            color: hover1 ? "#16005d" : "#ffffff",
          }}
        >
          <AddIcon />
          Create Folder
        </button>
      </div>


      <div className="mt-[30px] flex flex-col gap-[20px]">
        {folders.map(f => (
          <div key={f.folderId || f.id} className="relative flex w-full">
            <Link
              to={`/staff-courses/${courseName}/materials/${f.folderId || f.id}`}
              className="
          flex-1
          h-[80px]
          bg-[#eee]
          rounded-[10px]
          flex items-center justify-start
          pl-[40px]
          text-[#16005D] text-[22px] font-bold hover:text-[#2d1a7a] transition-colors
        "
            >
              {f.folderTitle || f.title}
            </Link>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 menu-container">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === (f.folderId || f.id) ? null : (f.folderId || f.id));
                }}
                className="text-[#16005D] cursor-pointer p-2 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
              >
                <MoreVertIcon />
              </div>

              {openMenuId === (f.folderId || f.id) && (
                <div className="absolute right-0 top-[30px] bg-white shadow-md border border-gray-200 rounded overflow-hidden z-50 w-[120px]">
                  <button
                    className="px-[14px] py-[10px] cursor-pointer text-red-600 font-medium w-full text-left border-none bg-white transition duration-200"
                    onClick={async (e) => {
                      e.preventDefault();
                      setOpenMenuId(null);
                      if (window.confirm('Delete folder?')) {
                        try {
                          await axiosInstance.delete(`/academic/materials/folders/${f.folderId || f.id}`);
                          setSnackbar({ open: true, message: "Folder deleted successfully", type: "success" });
                          fetchCourseAndFolders();
                        } catch (err) {
                          console.error(err);
                          setSnackbar({ open: true, message: "Failed to delete folder", type: "error" });
                        }
                      }
                    }}
                    onMouseEnter={() => setHover2(true)}
                    onMouseLeave={() => setHover2(false)}
                    style={{
                      backgroundColor: hover2 ? "#f03f3f" : "#ffffff",
                      color: hover2 ? "#ffffff" : "#dc2626",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      <FolderForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={(data) => {
          handleAddFolder(data);
          setOpenForm(false);
        }}
      />

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

export default StaffMaterial;
