import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const departmentSections = {
  CSE: ["A", "B", "C"],
  IT: ["A", "B"],
  EEE: ["A", "B"],
  ECE: ["A", "B", "C"],
  CD: ["A"],
  CT: ["A"],
  CYBER: ["A"],
  CIVIL: ["A"],
  MECH: ["A"],
  ETE: ["A"],
  AIDS: ["A", "B"],
  AE: ["A"],
};

function AdminAssignmentReport() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    academic: "2025-2026",
    sem: "5",
    dept: "CSE",
    sec: "A",
  });

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dept") {
      setFilters({ ...filters, dept: value, sec: departmentSections[value]?.[0] || "A" });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axiosInstance.get(
          `/academic/courses/department/${filters.dept}/filter`,
          { params: { semester: filters.sem, academicYear: filters.academic } }
        );
        const filteredCourses = courseRes.data.filter((c) => c.enabled);
        setCourses(filteredCourses);

        let allAssignments = [];
        for (let course of filteredCourses) {
          try {
            const assignRes = await axiosInstance.get(`/academic/assignments/course/${course.id}`);
            const assignmentsWithCourse = assignRes.data.map(a => ({
              ...a,
              courseName: course.courseName,
              courseId: course.id
            }));
            allAssignments = [...allAssignments, ...assignmentsWithCourse];
          } catch (err) {
            console.error("Failed to fetch assignments for course " + course.id, err);
          }
        }
        setAssignments(allAssignments);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setCourses([]);
        setAssignments([]);
      }
    };

    if (filters.dept && filters.sem && filters.academic) fetchData();
  }, [filters.dept, filters.sem, filters.academic]);

  return (
    <div className="p-[30px] min-h-screen">
      <div className="flex items-center text-[18px] font-medium text-[#16005D] mb-[20px]">

        <span
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="hover:underline"
        >
          Report
        </span>

        <span className="mx-2">/</span>

        <span
        >
          Assignment
        </span>

      </div>


      <div className="bg-gradient-to-r from-[#1b0066] to-[#12004d] h-[100px] rounded-[14px] flex items-center justify-around px-[30px] w-full max-w-[1458px] mx-auto my-[20px]">
        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Academic Year</label>
          <select name="academic" value={filters.academic} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            <option value="2023-2024">2023 - 2024</option>
            <option value="2024-2025">2024 - 2025</option>
            <option value="2025-2026">2025 - 2026</option>
            <option value="2026-2027">2026 - 2027</option>
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Semester</label>
          <select name="sem" value={filters.sem} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Department</label>
          <select name="dept" value={filters.dept} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {Object.keys(departmentSections).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px] text-white text-[14px] font-medium">
          <label className="opacity-90">Section</label>
          <select name="sec" value={filters.sec} onChange={handleChange} className="w-[180px] p-[10px_14px] rounded-[10px] border-none text-[15px] font-semibold outline-none cursor-pointer bg-white text-black">
            {(departmentSections[filters.dept] || []).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-[40px] mt-[30px] p-[10px] flex-wrap">

        {assignments.length > 0 ? (

          assignments.map((item, index) => (

            <div key={index}>

              <div
                className="relative w-[440px] h-[200px] rounded-[16px] overflow-hidden cursor-pointer shadow-lg hover:scale-[1.02] transition-all duration-200"
                onClick={() =>
                  navigate("/admin-report/assignment/table", {
                    state: {
                      academic: filters.academic,
                      sem: filters.sem,
                      dept: filters.dept,
                      sec: filters.sec,
                      subject: item.courseName,
                      courseId: item.courseId,
                      assignmentId: item.id,
                      assignment: item.title,
                    },
                  })
                }
              >

                <img
                  src="/Advancednet.jpg"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  alt="assignment-bg"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a40]/90 to-[#1a1a6a]/70"></div>

                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <h4 className="text-[30px] font-bold">
                    {item.title}
                  </h4>
                  <p className="text-[14px] opacity-80 mt-1">{item.courseName}</p>
                </div>

              </div>

            </div>

          ))

        ) : (

          <p className="text-[#666] text-[16px] ml-[10px]">
            No assignments available for selected class
          </p>

        )}

      </div>

    </div>
  );
}

export default AdminAssignmentReport;
