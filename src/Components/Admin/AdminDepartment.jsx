import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import DeptMenu from "./DeptMenu";
import DeptForm from "./DeptForm";

function AdminDepartment() {

  const [search, setSearch] = useState("");
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    fetchDepts();
  }, []);

  const fetchDepts = async () => {
    try {
      const res = await axiosInstance.get("/academic/departments");
      const formatted = res.data.map(d => ({
        id: d.id,
        name: d.name,
        code: d.code || "",
        hod: d.hodName || "",
        disabled: !d.enabled,
        img: "Advancednet.jpg"
      }));
      setDepts(formatted);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };
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
  const handleAdd = async (data) => {
    try {
      await axiosInstance.post("/academic/departments", {
        name: data.name,
        code: data.code,
        hod: data.hod
      });
      fetchDepts();
    } catch (err) {
      console.error("Failed to add department", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/academic/departments/${id}`);
      fetchDepts();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  // TOGGLE
  const handleToggle = async (id) => {
    try {
      await axiosInstance.put(`/academic/departments/${id}/toggle`);
      fetchDepts();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to toggle", err);
    }
  };

  // EDIT HOD
  const handleEdit = async (id, hod) => {
    try {
      await axiosInstance.put(`/academic/departments/${id}/hod?hodName=${encodeURIComponent(hod)}`);
      fetchDepts();
      setOpenMenuId(null);
    } catch (err) {
      console.error("Failed to update HOD", err);
    }
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
            color: "#ffffff"
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
            className={`relative h-[180px] w-[450px] rounded-[22px] bg-black cursor-pointer shadow-[0_10px_26px_rgba(0,0,0,0.18)] transition-all group ${dept.disabled ? "grayscale opacity-70" : ""
              }`}
          >

            <div className="absolute inset-0 rounded-[22px] overflow-hidden z-[1]">
              <img
                src="Advancednet.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16005d]/90 to-[#16005d]/20 z-[4]" />
            </div>

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
                {dept.name} {dept.code ? `(${dept.code})` : ""}
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
