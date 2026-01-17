import React from 'react'
import { useParams } from 'react-router-dom'
import Materials from './MaterialByCourse.js'
import BookIcon from '@mui/icons-material/Description';
import './StudentMaterialDetial.css'

function StudentMaterialDetial() {
    const { courseName, folderId } = useParams();

    const folders = Materials[courseName] || [];
    const folder = folders.find(f => f.id === folderId);
  return (
    <div className='material-detail-page'>
        <p className="path">
            Courses &gt; {courseName.replaceAll("-", " ")} &gt; Material &gt; {folder ? folder.title : 'Not Found'}
        </p>
        
        <p className='title'>{folder.title}</p>

        {folder.files.length === 0 ? (
            <div className='material-detial-empty'>No Files</div>
        ) : (
            folder.files.map((f) => (
                <div key={f.id} className='material-detail-card'>
                    <BookIcon className='material-detail-icon' />
                    <a href={"/uploads/dummy2.pdf"} target="_blank" rel="noopener noreferrer" className="pdf-link">
                    <span className='material-detail-filename'>{f.name}</span>
                    </a>
                </div>
            ))
        )}
    </div>
  )
}

export default StudentMaterialDetial