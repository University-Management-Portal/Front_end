import React, { useState, useEffect, useRef } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import DeptMenu from "./DeptMenu";
import DeptForm from "./DeptForm";

function AdminDepartment() {

  const [search, setSearch] = useState("");

  const [depts, setDepts] = useState([]);
  const [hover1, setHover1] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  // SEARCH
  const filtered = depts.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD
  const handleAdd = (data) => {
    setDepts(prev => [
      ...prev,
      {
        id: Date.now(),
        name: data.name,
        hod: data.hod,
        img: "https://via.placeholder.com/400x250",
        disabled: false
      }
    ]);
  };

  // DELETE
  const handleDelete = (id) => {
    setDepts(prev => prev.filter(d => d.id !== id));
    setOpenMenuId(null);
  };

  // TOGGLE
  const handleToggle = (id) => {
    setDepts(prev =>
      prev.map(d =>
        d.id === id ? { ...d, disabled: !d.disabled } : d
      )
    );
    setOpenMenuId(null);
  };

  // EDIT HOD
  const handleEdit = (id, hod) => {
    setDepts(prev =>
      prev.map(d =>
        d.id === id ? { ...d, hod } : d
      )
    );
    setOpenMenuId(null);
  };

  return (
    <div className="p-[40px] min-h-[calc(100vh-80px)] bg-[#f6f7fb]">

      <div className="flex justify-between items-center mb-[30px]">

        <div className="flex items-center gap-[10px] bg-white p-[10px_14px] rounded-[30px] w-[320px] shadow-[0_6px_14px_rgba(0,0,0,0.12)]">
          <SearchIcon />
          <input
            placeholder="Search department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none outline-none w-full text-[15px]"
          />
        </div>

        <button
        onClick={() => {
          setOpenMenuId(null);
          setOpenForm(true);
        }}
        onMouseEnter={() => setHover1(true)}
        onMouseLeave={() => setHover1(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 20px",
          borderRadius: "10px",
          border: "2px solid #16005d",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          transition: "0.3s",

          backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
                        color:"#ffffff"
        }}
      >
        <AddIcon style={{ color: "inherit" }} />
        Add Department
      </button>


      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-[36px] pt-[20px] pb-[40px]">

        {filtered.map((dept) => (

          <div
            key={dept.id}
            className={`relative h-[180px] w-[450px] rounded-[22px] overflow-hidden bg-black cursor-pointer shadow-[0_10px_26px_rgba(0,0,0,0.18)] transition-all group ${dept.disabled ? "grayscale opacity-70" : ""
              }`}
          >

            <div className="absolute inset-0 bg-gradient-to-t from-[#16005d]/90 to-[#16005d]/20 z-[4]" />

            <img
              src="Advancednet.jpg"
              className="w-full h-full object-cover"
            />

            <div
              className="absolute top-[16px] right-[16px] z-[6] text-white"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(
                  openMenuId === dept.id ? null : dept.id
                );
              }}
            >
              <MoreVertIcon />
            </div>

            {openMenuId === dept.id && (
              <div ref={menuRef}>
                <DeptMenu
                  enabled={!dept.disabled}
                  hod={dept.hod}
                  onEdit={(hod) => handleEdit(dept.id, hod)}
                  onToggle={() => handleToggle(dept.id)}
                  onDelete={() => handleDelete(dept.id)}
                />
              </div>
            )}


            <div className="absolute bottom-[64px] px-[22px] z-[5] text-white">
              <p className="text-[27px] font-bold m-0">
                {dept.name}
              </p>
            </div>

            <div className="absolute bottom-[26px] px-[22px] z-[5] text-white">
              <p className="text-[16px] opacity-90 m-0">
                HOD : {dept.hod || "Not Assigned"}
              </p>
            </div>

          </div>

        ))}

      </div>

      <DeptForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={(data) => {
          handleAdd(data);
          setOpenForm(false);
        }}
      />

    </div>
  );
}

export default AdminDepartment;
