import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './FolderMaterial.css';
const FolderMaterial = () => {
  const { courseName, folderId } = useParams();

  const [materials, setMaterials] = useState([]);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [materialName, setMaterialName] = useState("");
  const [file, setFile] = useState(null);

  const addMaterial = () => {
    if (!materialName || !file) return;

    const newMaterial = {
      id: Date.now(),
      name: materialName,
      fileName: file.name,
    };

    setMaterials([...materials, newMaterial]);
    setMaterialName("");
    setFile(null);
    setShowAddMaterial(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className='folder-material-header'>
        <h2>{courseName}</h2>
        <h3>Folder Name: {folderId}</h3>
      </div>

      <button onClick={() => setShowAddMaterial(!showAddMaterial)} className="folder-buttons">
        {showAddMaterial ? "Cancel" : "Add Material"}
      </button>

      {showAddMaterial && (
  <div className="add-material-card">
    <input
      type="text"
      placeholder="Material name"
      value={materialName}
      onChange={(e) => setMaterialName(e.target.value)}
      className="material-input"
    />

    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      className="file-input"
    />

    <button className="folder-save-btn" onClick={addMaterial}>
      Save
    </button>
  </div>
)}

    <div className="listed-mat">
  <ul className="particular-mat">
    {materials.map((mat) => (
      <li key={mat.id} className="fol-material-item">
        <p className="mat-name">📄 {mat.name}</p>
        <span className="mat-file">{mat.fileName}</span>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default FolderMaterial;
