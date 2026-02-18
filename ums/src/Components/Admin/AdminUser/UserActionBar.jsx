import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';

function UserActionBar({
  search,
  setSearch,
  onBulkUpload,
  onSelectAll,
  onDelete,
  onAddOne,
  onEdit,
  hasSelection,
  select
}) {

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [hover5, setHover5] = useState(false);

  return (
    <div className="flex items-center gap-[14px] my-[16px] mt-[20px] mb-[10px]">

      <div className="flex items-center bg-[#e0e0e0] px-[12px] py-[6px] rounded-[20px] min-w-[350px] mr-[380px] ml-[10px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none outline-none bg-transparent ml-[6px] min-w-[380px]"
        />
      </div>

      <div className="flex gap-[10px] flex-wrap">

        <button
          onClick={onAddOne}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          style={{
            padding: "6px 14px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "0.3s",

            backgroundColor: hover1 ? "#16005d" : "#ffffff",
            color: hover1 ? "#ffffff" : "#16005d",
          }}
        >
          <AddIcon style={{ color: "inherit" }} />
          Add one
        </button>


        <label
        onMouseEnter={() => setHover2(true)}
        onMouseLeave={() => setHover2(false)}
        style={{
          padding: "6px 14px",
          borderRadius: "10px",
          cursor: "pointer",
          border: "2px solid #16005d",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          transition: "0.3s",

          backgroundColor: hover2 ? "#16005d" : "#ffffff",
          color: hover2 ? "#ffffff" : "#16005d",
        }}
      >
        <AddIcon style={{ color: "inherit" }} />
        Add Bulk
        <input
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={onBulkUpload}
        />
      </label>


        <button
          onClick={onSelectAll}
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
          style={{
            padding: "6px 14px",
            minWidth: "130px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "0.3s",

            backgroundColor: hover3 ? "#16005d" : "#ffffff",
            color: hover3 ? "#ffffff" : "#16005d",
          }}
        >
          {select ? "Select All" : "Deselect All"}
        </button>

        <button
          onClick={onEdit}
          onMouseEnter={() => setHover4(true)}
          onMouseLeave={() => setHover4(false)}
          style={{
            padding: "6px 14px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "0.3s",

            backgroundColor: hover4 ? "#16005d" : "#ffffff",
            color: hover4 ? "#ffffff" : "#16005d",
          }}
        >
          <EditIcon style={{ color: "inherit" }} />
          Edit
        </button>


        <button
          onClick={onDelete}
          disabled={!hasSelection}
          onMouseEnter={() => setHover5(true)}
          onMouseLeave={() => setHover5(false)}
          style={{
            padding: "6px 14px",
            borderRadius: "10px",
            border: "2px solid #16005d",
            cursor: hasSelection ? "pointer" : "not-allowed",
            opacity: hasSelection ? 1 : 0.6,
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "0.3s",

            backgroundColor: hover5
              ? "#16005d"
              : "#ffffff",
            color: hover5
              ? "#ffffff"
              : "#16005d",
          }}
        >
          <DeleteIcon style={{ color: "inherit" }} />
          Delete
        </button>

      </div>
    </div>
  )
}

export default UserActionBar