import React, { useState } from "react";

function FolderForm({ open, onClose, onSave }) {

  const [title, setTitle] = useState("");
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]"
      onClick={onClose}
    >
      <div
        className="bg-white w-[360px] p-[22px] rounded-[14px]"
        onClick={(e) => e.stopPropagation()}
      >

        <h3 className="text-[20px] font-bold mb-[16px]">
          Create Folder
        </h3>

        <input
          type="text"
          placeholder="Folder name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-[10px] mb-[16px] border rounded"
        />

        <div className="flex justify-end gap-[10px]">
          <button
  onClick={onClose}
  onMouseEnter={() => setHover2(true)}
  onMouseLeave={() => setHover2(false)}
  style={{
    padding: "8px 16px",
    borderRadius: "6px",
    border: "2px solid #16005d",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",

    backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
            color:"#ffffff",
  }}
>
  Cancel
</button>


          <button
  onClick={() => {
    if (!title.trim()) {
      alert("Enter folder name");
      return;
    }
    onSave({ title });
    setTitle("");
  }}
  onMouseEnter={() => setHover1(true)}
  onMouseLeave={() => setHover1(false)}
  style={{
    padding: "8px 16px",
    borderRadius: "6px",
    border: "2px solid #16005d",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",

    backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
            color:"#ffffff",
  }}
>
  Save
</button>

        </div>

      </div>
    </div>
  );
}

export default FolderForm;
