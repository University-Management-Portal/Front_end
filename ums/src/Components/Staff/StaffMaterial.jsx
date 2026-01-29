import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./StaffMaterial.css";

function StaffMaterial() {
  const { courseName } = useParams();

  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [showAddFolder, setShowAddFolder] = useState(false);

  const addFolder = () => {
    if (!newFolder.trim()) return;

    setFolders([
      ...folders,
      { id: Date.now(), title: newFolder }
    ]);

    setNewFolder("");
    setShowAddFolder(false);
  };

  return (
    <div className="material-page">

      <p className="path">
        Courses &gt; {courseName.replaceAll("-", " ")} &gt; Material
      </p>

      <div className='staff-material-header'>
            <p>{courseName.replaceAll("-"," ").toUpperCase()}</p>
      </div>

       <button
          className="create-folder-btn"
          onClick={() => setShowAddFolder(true)}
        >
          + Create Folder
        </button>

      {showAddFolder && (
        <div className="add-folder-row">
          <input
            type="text"
            placeholder="Enter folder name"
            value={newFolder}
            onChange={e => setNewFolder(e.target.value)}
          />

          <button onClick={addFolder}>Add Folder</button>
        </div>
      )}

      <div className="folder-grid">
        {folders.map(f => (
          <Link
            key={f.id}
            to={`/staff-courses/${courseName}/materials/${f.title}`}
            className="folder-card"
          >
            {f.title}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default StaffMaterial;
