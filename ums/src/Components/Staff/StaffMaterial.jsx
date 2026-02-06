import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FolderForm from "./FolderForm";

function StaffMaterial() {
  const { courseName } = useParams();
  const [hover1, setHover1] = useState(false);

  const [folders, setFolders] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  // ADD FOLDER (same pattern as handleAdd in AdminDepartment)
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

      <p className="text-[16px] font-medium text-[#16005D]">
        Courses &gt; {courseName.replaceAll("-", " ")} &gt; Material
      </p>

      <div className="bg-[url('/commen.jpg')] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] text-[38px] font-bold h-[180px] flex items-center mt-[20px]">
        {courseName.replaceAll("-", " ").toUpperCase()}
      </div>

      {/* ADD FOLDER BUTTON */}
      <button
        className="flex items-center ml-[1270px] gap-[8px] bg-[#16005D] text-white p-[10px_18px] rounded-[8px]"
        onClick={() => setOpenForm(true)}
        style={{
          backgroundColor: hover1 ? "#ffffff" : "#16005d",
          color: hover1 ? "#16005d" : "#ffffff"
        }}
        onMouseEnter={() => setHover1(true)}
        onMouseLeave={() => setHover1(false)}
      >
        <AddIcon /> Create Folder
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
