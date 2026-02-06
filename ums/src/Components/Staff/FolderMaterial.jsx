import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MaterialForm from "./MaterialForm";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const FolderMaterial = () => {
  const { courseName, folderId } = useParams();
  const [hover1, setHover1] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);


  const [materials, setMaterials] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const handleDeleteMaterial = (id) => {
  setMaterials(prev => prev.filter(m => m.id !== id));
};

  // ADD MATERIAL (parent owns state)
  const handleAddMaterial = (data) => {
    setMaterials(prev => [
      ...prev,
      {
        id: Date.now(),
        name: data.name,
        fileName: data.file.name
      }
    ]);
  };

  return (
    <div className="p-[20px]">

      {/* HEADER */}
      <div className="bg-[url('/commen.jpg')] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] h-[180px]">
        <h2 className="text-[40px] font-bold">{courseName}</h2>
        <h3 className="text-[30px] font-bold">
          Folder Name: {folderId}
        </h3>
      </div>

      {/* ADD MATERIAL BUTTON */}
      <button
        className="std-btn p-[10px_16px] rounded-[8px]"
        onClick={() => setOpenForm(true)}
        style={{
          backgroundColor: hover1 ? "#ffffff" : "#16005d",
          color: hover1 ? "#16005d" : "#ffffff"
        }}
        onMouseEnter={() => setHover1(true)}
        onMouseLeave={() => setHover1(false)}
      >
        + Add Material
      </button>

      <div className="mt-[20px] bg-white p-[20px] rounded-[10px] shadow w-[1450px]">
  <ul className="grid grid-cols-1 gap-[15px] list-none p-0 m-0">
    {materials.map(mat => (
      <li
        key={mat.id}
        className="relative bg-[#f8f9fa] p-[12px] rounded-[8px] border flex justify-between items-start"
      >
        {/* LEFT CONTENT */}
        <div>
          <p className="font-semibold mb-[4px]">
            📄 {mat.name}
          </p>
          <span className="text-[14px] text-[#555]">
            {mat.fileName}
          </span>
        </div>

        {/* RIGHT MENU */}
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
            <div className="absolute right-0 mt-[6px] bg-white border rounded shadow z-10">
              <button
                className="block px-[14px] py-[8px] text-red-600 hover:bg-[#f1f1f1] w-full text-left"
                onClick={() => {
                  handleDeleteMaterial(mat.id);
                  setOpenMenuId(null);
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

      {/* MODAL FORM */}
      <MaterialForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={(data) => {
          handleAddMaterial(data);
          setOpenForm(false);
        }}
      />

    </div>
  );
};

export default FolderMaterial;
