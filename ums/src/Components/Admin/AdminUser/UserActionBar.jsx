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

        <button className="std-btn px-[14px] py-[6px] rounded-[20px] font-medium flex items-center justify-center gap-[6px]" onClick={onAddOne} 
        style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
        ><AddIcon />Add one</button>

        <label className="std-btn px-[14px] py-[6px] rounded-[10px] font-medium flex items-center justify-center gap-[6px]" style={{
              backgroundColor: hover2 ? "#ffffff" : "#16005d",
              color: hover2 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}>
          <AddIcon />
          Add Bulk
          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={onBulkUpload}
          />
        </label>

        <button 
        style={{
              backgroundColor: hover3 ? "#ffffff" : "#16005d",
              color: hover3 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover3(true)}
            onMouseLeave={() => setHover3(false)}
        className="std-btn px-[14px] py-[6px] rounded-[20px] font-medium flex items-center justify-center gap-[6px] min-w-[130px]" onClick={onSelectAll}>
          {select ? "Select All" : "Deselect All"}
        </button>

        <button className="std-btn px-[14px] py-[6px] rounded-[20px] font-medium flex items-center justify-center gap-[6px]" onClick={onEdit} 
        style={{
              backgroundColor: hover4 ? "#ffffff" : "#16005d",
              color: hover4 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover4(true)}
            onMouseLeave={() => setHover4(false)}
        ><EditIcon />Edit</button>

        <button
          className="std-btn px-[14px] py-[6px] rounded-[20px] font-medium flex items-center justify-center gap-[6px]"
          onClick={onDelete}
          disabled={!hasSelection}
          style={{
              backgroundColor: hover5 ? "#ffffff" : "#16005d",
              color: hover5 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover5(true)}
            onMouseLeave={() => setHover5(false)}
        >
          <DeleteIcon />
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserActionBar