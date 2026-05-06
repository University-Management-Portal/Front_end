import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import BookIcon from '@mui/icons-material/Description';
import axiosInstance from '../../api/axiosInstance';

function StudentMaterial() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [courseObj, setCourseObj] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, [courseName]);

  const fetchFolders = async () => {
    try {
      const dept = localStorage.getItem("userDepartment");
      if (!dept) return;

      const courseRes = await axiosInstance.get(`/academic/courses/department/${encodeURIComponent(dept)}`);
      const properName = courseName.replaceAll("-", " ");
      const foundCourse = courseRes.data.find(c => c.courseCode.toLowerCase() === courseName.toLowerCase() || c.courseName.toLowerCase() === properName.toLowerCase());

      if (foundCourse) {
        setCourseObj(foundCourse);
        const folderRes = await axiosInstance.get(`/academic/materials/folders/course/${foundCourse.id}`);
        setFolders(folderRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-[calc(100vh-120px)] p-[32px_48px] bg-[#f6f7fb] max-md:p-[24px]'>
      <div className="flex items-center text-[16px] font-medium text-[#16005D] mb-[20px]">

        {/* Courses */}
        <span
          onClick={() => navigate(-2)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          courses
        </span>

        <span className="mx-2">&gt;</span>

        {/* Subject */}
        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          {courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName}` : courseName.replaceAll("-", " ")}
        </span>

        <span className="mx-2">&gt;</span>

        {/* Material */}
        <span>
          material
        </span>

      </div>

      <div className='bg-[url("/commen.jpg")] bg-no-repeat bg-center bg-cover text-white p-[22px_28px] rounded-[18px] mb-[28px] text-[38px] font-bold tracking-[0.8px] h-[180px] flex items-center max-md:text-[18px] max-md:p-[18px_20px]'>
        <p>{courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName.toUpperCase()}` : courseName.replaceAll("-", " ").toUpperCase()}</p>
      </div>

      {folders.length === 0 ? (
        <div className='mt-[40px] p-[40px] text-center bg-white rounded-[16px] text-[16px] text-black shadow-[0_6px_18px_rgba(0,0,0,0.08)]'>No Materials Found</div>
      ) : (
        folders.map((f) => {
          const folderId = f.folderId || f.id;
          const folderTitle = f.folderTitle || f.title;
          return (
            <Link
              key={folderId}
              to={`/student-courses/${courseName}/materials/${folderId}`}
              className='flex items-center gap-[14px] bg-[#e5e5e5] p-[16px_22px] rounded-[14px] mb-[14px] h-[70px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] max-md:p-[14px_18px] no-underline text-[#16005d]'
            >
              <BookIcon className='text-[28px]' style={{ fontSize: '28px' }} />
              <span className='text-[16px] font-semibold flex-1 hover:underline max-md:text-[15px]'>
                {folderTitle}
              </span>
            </Link>
          );
        })
      )}

    </div>
  )
}

export default StudentMaterial