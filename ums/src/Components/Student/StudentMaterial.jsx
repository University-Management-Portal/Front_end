import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Materials from './MaterialByCourse.js'
import BookIcon from '@mui/icons-material/Description';
import './StudentMaterial.css'

function StudentMaterial() {
    const { courseName } = useParams();

    const folders = Materials[courseName] || [];

  return (
    <div className='material-page'>
      <p className="path">
        Courses &gt; {courseName.replaceAll("-", " ")} &gt; Material
      </p>

      <div className='material-header'>
            <p>{courseName.replaceAll("-"," ").toUpperCase()}</p>
      </div>

      {folders.length === 0 ? (
        <div className='material-empty'>No Materials Found</div>
      ):(
        folders.map((f)=>(
            <div key={f.id} className='material-card'>
                <BookIcon className='material-icon' />
                <Link to={`/student-courses/${courseName}/materials/${f.id}`} className='material-link'>
                {f.title} - Posted by {f.postedBy} on {f.date}
                </Link>
            </div>
        )
      ))}

    </div>
  )
}

export default StudentMaterial