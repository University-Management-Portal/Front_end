import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MaterialForm from "./MaterialForm";
import { Snackbar, Alert } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../../api/axiosInstance";

const FolderMaterial = () => {
  const { courseName, folderId } = useParams();
  const [hover1, setHover1] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [hover2, setHover2] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [courseObj, setCourseObj] = useState(null);
  const [folderObj, setFolderObj] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  useEffect(() => {
    fetchMaterials();
  }, [folderId]);

  const fetchMaterials = async () => {
    try {
      if (!folderId) return;

      const facultyName = localStorage.getItem("userName");
      if (facultyName) {
        const courseRes = await axiosInstance.get(`/academic/courses/faculty/${encodeURIComponent(facultyName)}`);
        const properName = courseName.replaceAll("-", " ");
        const foundCourse = courseRes.data.find(c => c.courseCode.toLowerCase() === courseName.toLowerCase() || c.courseName.toLowerCase() === properName.toLowerCase());
        setCourseObj(foundCourse || null);

        if (foundCourse) {
          const folderRes = await axiosInstance.get(`/academic/materials/folders/course/${foundCourse.id}`);
          const currentFolder = folderRes.data.find(f => (f.folderId || f.id).toString() === folderId.toString());
          setFolderObj(currentFolder || null);
        }
      }

      const res = await axiosInstance.get(`/academic/materials/folders/${folderId}/files`);
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await axiosInstance.delete(`/academic/materials/files/${id}`);
      setSnackbar({ open: true, message: "Material deleted successfully", type: "success" });
      fetchMaterials();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to delete material", type: "error" });
    }
  };

  const handleAddMaterial = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("file", data.file);
      await axiosInstance.post(`/academic/materials/folders/${folderId}/files`, formData);
      setSnackbar({ open: true, message: "Material added successfully", type: "success" });
      fetchMaterials();
    } catch (err) {
      console.error(err);
      let errorMsg = "Failed to add material";
      if (err.response?.data) {
        errorMsg = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMsg = err.message;
      }
      setSnackbar({ open: true, message: `Error: ${errorMsg}`, type: "error" });
    }
  };

  return (
    <div className="p-[20px]" style={{ minHeight: "100vh" }}>

      {/* HEADER */}
      <div className="bg-[url('/commen.jpg')] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] h-[180px]">
        <h2 className="text-[35px] font-semibold mt-[18px]">{courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName.toUpperCase()}` : courseName.toUpperCase()}</h2>
        <h3 className="text-[25px] font-semibold">
          {folderObj ? (folderObj.folderTitle || folderObj.title) : "Folder Materials"}
        </h3>
      </div>

      <div className="flex justify-end w-full mb-4 pr-1">
        <button
          onClick={() => setOpenForm(true)}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
            backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
            color: "#ffffff",
          }}
        >
          + Add Material
        </button>
      </div>


      <div className="mt-[20px] bg-white p-[20px] rounded-[10px] shadow w-[1450px]">
        <ul className="grid grid-cols-1 gap-[15px] list-none p-0 m-0">
          {materials.map(mat => (
            <li
              key={mat.id}
              className="relative bg-[#f8f9fa] p-[12px] rounded-[8px] border flex justify-between items-start"
            >

              <div>
                <p className="font-semibold mb-[4px] cursor-pointer hover:underline text-blue-700"
                  onClick={() => window.open(mat.fileUrl, "_blank")}>
                  📄 {mat.name}
                </p>
                <span className="text-[14px] text-[#555]">
                  {mat.fileName}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenuId(
                      openMenuId === mat.id ? null : mat.id
                    )
                  }
                >
                  <MoreVertIcon />
                </button>

                {openMenuId === mat.id && (
                  <div className="absolute right-0 mt-[6px]  border-none rounded ">
                    <button
                      className=" px-[14px] py-[8px] text-red-600  w-full text-left"
                      onClick={() => {
                        handleDeleteMaterial(mat.id);
                        setOpenMenuId(null);
                      }}
                      onMouseEnter={() => setHover2(true)}
                      onMouseLeave={() => setHover2(false)}
                      style={{
                        backgroundColor: hover2 ? "#f03f3f" : "#bb1212",
                        color: "#ffffff",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <MaterialForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={(data) => {
          handleAddMaterial(data);
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

    </div >
  );
};

export default FolderMaterial;
