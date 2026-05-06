import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const MaterialForm = ({ open, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "warning" });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]"
      onClick={onClose}
    >
      <div
        className="bg-white w-[460px] p-[30px] rounded-[16px] shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[22px] font-bold mb-[24px] text-[#16005D] border-b pb-[12px]">
          Add Material
        </h3>

        <input
          type="text"
          placeholder="Material name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-[12px] mb-[16px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#16005D]/50 transition-all bg-gray-50 text-[15px]"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-[28px] text-gray-700 p-[10px] border border-gray-300 rounded-[8px] bg-gray-50 
                     file:mr-4 file:py-2 file:px-4 file:rounded-[6px] file:border-0 file:text-sm file:font-semibold 
                     file:bg-[#16005D]/10 file:text-[#16005D] hover:file:bg-[#16005D]/20 transition-all cursor-pointer"
        />

        <div className="flex justify-end gap-[12px]">
          <button
            onClick={onClose}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "2px solid #16005D",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
              backgroundColor: hover1 ? "#f3f4f6" : "#ffffff",
              color: "#16005D",
            }}
          >
            Cancel
          </button>


          <button
            onClick={() => {
              if (!name || !file) {
                setSnackbar({ open: true, message: "Enter material name & file", type: "warning" });
                return;
              }
              onSave({ name, file });
              setName("");
              setFile(null);
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "2px solid #16005D",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
              backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
              color: "#ffffff",
            }}
          >
            Upload Material
          </button>

        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MaterialForm;
