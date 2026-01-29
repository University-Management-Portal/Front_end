import React from 'react'
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
  return (
    <div className="users-action-bar">

      <div className="admin-search-box">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="action-buttons">

        <button className="btn" onClick={onAddOne}><AddIcon/>Add one</button>

        <label className="btn">
          <AddIcon/>
          Add Bulk
          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={onBulkUpload}
          />
        </label>

        <button className="btn select" onClick={onSelectAll}>
          {select ? "Select All" : "Deselect All"}
        </button>

        <button className="btn" onClick={onEdit} ><EditIcon/>Edit</button>

        <button
          className="btn delete"
          onClick={onDelete}
          disabled={!hasSelection}
        >
          <DeleteIcon />
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserActionBar