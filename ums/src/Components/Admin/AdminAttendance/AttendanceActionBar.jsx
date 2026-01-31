import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

function AttendanceActionBar({ search, setSearch, onDownload }) {
  return (
    <div className="att-action-bar">
      <div className="att-search-box">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Name / Roll No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="att-actions">
        <button className="att-btn-primary" onClick={onDownload}>
          <DownloadIcon /> Download
        </button>
      </div>
    </div>
  );
}

export default AttendanceActionBar;
