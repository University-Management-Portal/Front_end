import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function StudentSeparateCourse() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [courseObj, setCourseObj] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseName]);

  const fetchCourseDetails = async () => {
    try {
      const dept = localStorage.getItem("userDepartment");
      if (!dept) return;

      const courseRes = await axiosInstance.get(`/academic/courses/department/${encodeURIComponent(dept)}`);
      const properName = courseName.replaceAll("-", " ");
      const foundCourse = courseRes.data.find(c =>
        c.courseCode.toLowerCase() === courseName.toLowerCase() ||
        c.courseName.toLowerCase() === properName.toLowerCase()
      );

      if (foundCourse) {
        setCourseObj(foundCourse);
      }
    } catch (err) {
      console.error("Failed to load course details", err);
    }
  };

  const handleClickAssignmnets = () => {
    navigate(`/student-courses/${courseName}/assignments`);
  }

  const handleClickMaterials = () => {
    navigate(`/student-courses/${courseName}/materials`);
  }

  return (
    <div className="min-h-[calc(80vh-120px)] p-[32px_48px] bg-[#f6f7fb]">
      <div className="flex items-center text-[16px] font-medium text-[#16005D] mb-[20px]">

        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          courses
        </span>

        <span className="mx-2">&gt;</span>

        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          {courseObj ? `${courseObj.courseCode.toUpperCase()} / ${courseObj.courseName}` : courseName.replaceAll("-", " ")}
        </span>

      </div>


      <div className="inline-flex items-center w-[420px] h-[180px] rounded-[18px] cursor-pointer text-[28px] font-bold tracking-[1px] transition-all duration-250 border-[0.2px] border-[#16005D] justify-end pr-[42px] bg-[url('/assignment-banner.jpg')] bg-cover bg-center bg-no-repeat text-black mr-[40px] hover:-translate-y-[6px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]" onClick={handleClickAssignmnets}>
        <p className="m-0">ASSIGNMENTS</p>
      </div>
      <div className="inline-flex items-center w-[420px] h-[180px] rounded-[18px] cursor-pointer text-[28px] font-bold tracking-[1px] transition-all duration-250 border-[0.2px] border-[#16005D] justify-start pl-[42px] bg-[url('/material.jpg')] bg-cover bg-center bg-no-repeat text-black hover:-translate-y-[6px] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]" onClick={handleClickMaterials}>
        <p className="m-0">MATERIALS</p>
      </div>
    </div>
  );
}
