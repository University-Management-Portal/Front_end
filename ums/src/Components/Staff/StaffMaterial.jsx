import React, { useState } from "react";
import { Link, useParams ,useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FolderForm from "./FolderForm";

function StaffMaterial() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [hover1, setHover1] = useState(false);

  const [folders, setFolders] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const handleAddFolder = (data) => {
    setFolders(prev => [
      ...prev,
      {
        id: Date.now(),
        title: data.title
      }
    ]);
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
            {courseName.replaceAll("-", " ")}
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


      <div className="bg-[url('/commen.jpg')] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] text-[38px] font-bold h-[180px] flex items-center mt-[20px]">
        {courseName.replaceAll("-", " ").toUpperCase()}
      </div>

      <button
      onClick={() => setOpenForm(true)}
      onMouseEnter={() => setHover1(true)}
      onMouseLeave={() => setHover1(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginLeft: "1270px",
        padding: "10px 18px",
        borderRadius: "8px",
        border: "2px solid #16005D",
        cursor: "pointer",
        fontWeight: "500",
        transition: "0.3s",

        backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
        color:"#ffffff",
      }}
    >
      <AddIcon />
      Create Folder
    </button>


     <div className="mt-[30px] flex flex-col gap-[20px]">
  {folders.map(f => (
    <Link
      key={f.id}
      to={`/staff-courses/${courseName}/materials/${f.title}`}
      className="
        w-full
        h-[80px]
        bg-[#eee]
        rounded-[10px]
        border-2 border-[#16005D]
        flex items-center justify-start
        pl-[40px]
        text-[#16005D] text-[22px] font-semibold
      "
    >
      {f.title}
    </Link>
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

    </div>
  );
}

export default StaffMaterial;
