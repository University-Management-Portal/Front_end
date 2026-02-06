import React, { useState } from "react";

const MaterialForm = ({ open, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]"
      onClick={onClose}
    >
      <div
        className="bg-white w-[420px] p-[22px] rounded-[14px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[20px] font-bold mb-[14px]">
          Add Material
        </h3>

        <input
          type="text"
          placeholder="Material name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-[10px] mb-[12px] border rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-[16px]"
        />

        <div className="flex justify-end gap-[10px]">
          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
            style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
          >
            Cancel
          </button>

          <button
            className="std-btn px-4 py-2"
            onClick={() => {
              if (!name || !file) {
                alert("Enter material name & file");
                return;
              }
              onSave({ name, file });
              setName("");
              setFile(null);
            }}
            style={{
              backgroundColor: hover2 ? "#ffffff" : "#16005d",
              color: hover2 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
