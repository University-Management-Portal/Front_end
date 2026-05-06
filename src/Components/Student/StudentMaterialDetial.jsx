import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BookIcon from '@mui/icons-material/Description';
import axiosInstance from '../../api/axiosInstance';

function StudentMaterialDetial() {
    const { courseName, folderId } = useParams();
    const navigate = useNavigate();

    const [materials, setMaterials] = useState([]);
    const [courseObj, setCourseObj] = useState(null);
    const [folderObj, setFolderObj] = useState(null);

    useEffect(() => {
        fetchMaterials();
    }, [folderId]);

    const fetchMaterials = async () => {
        try {
            if (!folderId) return;

            const dept = localStorage.getItem("userDepartment");
            if (dept) {
                const courseRes = await axiosInstance.get(`/academic/courses/department/${encodeURIComponent(dept)}`);
                const properName = courseName.replaceAll("-", " ");
                const foundCourse = courseRes.data.find(c => c.courseCode.toLowerCase() === courseName.toLowerCase() || c.courseName.toLowerCase() === properName.toLowerCase());
                setCourseObj(foundCourse || null);

                if (foundCourse) {
                    const folderRes = await axiosInstance.get(`/academic/materials/folders/course/${foundCourse.id}`);
                    const folderMatch = folderRes.data.find(f => String(f.folderId || f.id) === String(folderId));
                    setFolderObj(folderMatch || null);
                }
            }

            const res = await axiosInstance.get(`/academic/materials/folders/${folderId}/files`);
            setMaterials(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='min-h-[calc(100vh-120px)] p-[32px_48px] bg-[#f6f7fb] max-md:p-[24px]'>
            <div className="flex items-center text-[16px] font-medium text-[#16005D] mb-[20px]">

                <span
                    onClick={() => navigate(-3)}
                    style={{ cursor: "pointer" }}
                    className="hover:underline"
                >
                    Courses
                </span>

                <span className="mx-2">&gt;</span>

                <span
                    onClick={() => navigate(-2)}
                    style={{ cursor: "pointer" }}
                    className="hover:underline"
                >
                    {courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName}` : courseName.replaceAll("-", " ")}
                </span>

                <span className="mx-2">&gt;</span>

                <span
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer" }}
                    className="hover:underline"
                >
                    Material
                </span>

                <span className="mx-2">&gt;</span>

                <span>
                    Files
                </span>

            </div>


            <p className='text-[26px] font-bold text-[#16005d] mb-[22px] max-md:text-[22px]'>
                {folderObj ? (folderObj.folderTitle || folderObj.title) : `Folder ${folderId}`}
            </p>

            {materials.length === 0 ? (
                <div className='mt-[40px] p-[36px] text-center bg-white rounded-[16px] text-[16px] text-black shadow-[0_6px_18px_rgba(0,0,0,0.08)]'>No Files</div>
            ) : (
                materials.map((f) => (
                    <a
                        key={f.id}
                        href={f.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-[14px] bg-[#e5e5e5] p-[16px_22px] rounded-[14px] mb-[14px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] max-md:p-[14px_18px] no-underline text-[#16005d]'
                    >
                        <BookIcon className='text-[28px]' style={{ fontSize: '28px' }} />
                        <span className="text-[16px] font-semibold flex-1 hover:underline max-md:text-[15px]">
                            {f.name}
                        </span>
                    </a>
                ))
            )}
        </div>
    )
}

export default StudentMaterialDetial