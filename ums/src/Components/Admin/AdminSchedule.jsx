import React, { useState, useEffect, useRef } from "react";

export default function AdminSchedule() {
  const [academicYear, setAcademicYear] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [timeTable, setTimeTable] = useState(null);
  const [academicCalendar, setAcademicCalendar] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [hover, setHover] = useState(false);
  const menuRef = useRef();

  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem("schedules");
    return saved ? JSON.parse(saved) : [];
  });

  const departmentSections = {
    CSE: ["A", "B", "C"],
    IT: ["A", "B"],
    EEE: ["A", "B"],
    Mech: ["A"],
  };

  /* ✅ Save to localStorage whenever schedules changes */
  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

 const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!academicYear || !year || !department || !section || !timeTable) {
    alert("Fill all required fields");
    return;
  }

  const timeTableBase64 = await convertToBase64(timeTable);
  const calendarBase64 = academicCalendar
    ? await convertToBase64(academicCalendar)
    : null;

  const newSchedule = {
    id: Date.now(),
    academicYear,
    year,
    department,
    section,
    timeTable: timeTableBase64,
    academicCalendar: calendarBase64,
    status: true,
  };

  setSchedules((prev) => [...prev, newSchedule]);

  setAcademicYear("");
  setYear("");
  setDepartment("");
  setSection("");
  setTimeTable(null);
  setAcademicCalendar(null);
};


  const toggleStatus = (id) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
    setOpenMenuId(null);
  };

  const deleteSchedule = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl shadow-md flex flex-wrap gap-6 items-center"
        style={{ backgroundColor: "#1e0a5a" }}
      >
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="p-2 rounded-lg w-[200px] ml-[100px]"
          style={{ color: "#fff", border: "1px solid #fff" }}
        >
          <option value="" style={{ color: "#000" }}>Academic</option>
          <option value="2025-2026" style={{ color: "#000" }}>2025-2026</option>
          <option value="2026-2027" style={{ color: "#000" }}>2026-2027</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 rounded-lg w-[200px] ml-[80px]"
          style={{ color: "#fff", border: "1px solid #fff" }}
        >
          <option value="" style={{ color: "#000" }}>Year</option>
          <option value="1" style={{ color: "#000" }}>1</option>
          <option value="2" style={{ color: "#000" }}>2</option>
          <option value="3" style={{ color: "#000" }}>3</option>
          <option value="4" style={{ color: "#000" }}>4</option>
        </select>

        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setSection("");
          }}
          className="p-2 rounded-lg w-[200px] ml-[80px]"
          style={{ color: "#fff", border: "1px solid #fff" }}
        >
          <option value="" style={{ color: "#000" }}>Dept</option>
          {Object.keys(departmentSections).map((dept) => (
            <option key={dept} value={dept} style={{ color: "#000" }}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={section}
          disabled={!department}
          onChange={(e) => setSection(e.target.value)}
          className="p-2 rounded-lg w-[200px] ml-[80px]"
          style={{ color: "#fff", border: "1px solid #fff" }}
        >
          <option value="" style={{ color: "#000" }}>Sec</option>
          {department &&
            departmentSections[department].map((sec) => (
              <option key={sec} value={sec} style={{ color: "#000" }}>
                {sec}
              </option>
            ))}
        </select>

        <br />
        <br />

        <div className="div">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setTimeTable(e.target.files[0])}
          className="p-2 bg-gray-300 rounded-lg ml-25 mb-4 w-[200px] "
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAcademicCalendar(e.target.files[0])}
          className="p-2 bg-gray-300 rounded-lg mb-4 ml-26 w-[200px]"
        />

        <button
          type="submit"
          className="p-2 rounded-lg font-semibold w-[180px] ml-105"
          style={{
            backgroundColor: hover ? "#3dbc63" : "#089311",
            color: "#fff",
            border: "2px solid #077a05",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Upload
        </button>
      </div>

      </form>

      

      

     <div className="mt-10 flex flex-col gap-6">
  {schedules.map((item) => (
    <div
      key={item.id}
      className={`flex justify-between p-6 rounded-xl shadow-md bg-white ${
        !item.status ? "opacity-50" : ""
      }`}
    >
      <div>
        <p className="font-bold text-lg">{item.academicYear}</p>
        <p>Year: {item.year}</p>
        <p>{item.department} - {item.section}</p>

        <div className="div " style={{flexDirection:"row", display:"flex" ,gap:"40px"}}>
        <div className="mt-4">
          <p className="font-semibold">Time Table:</p>
          <img
          src={item.timeTable}
          alt="Time Table"
          className="w-[350px] mt-2 rounded-lg shadow-md object-contain"
          style={{width:"300px" , height:"200px"}}
        />
        </div>

        {item.academicCalendar && (
          <div className="mt-4">
            <p className="font-semibold">Academic Calendar:</p>
            <img
              src={item.academicCalendar}
              alt="Calendar"
              className="w-[350px] mt-2 rounded-lg shadow-md object-contain"
              style={{width:"300px" , height:"200px"}}
            />
          </div>
        )}
        </div>

        <p className="mt-3">
          Status:{" "}
          <span
            style={{
              color: item.status ? "green" : "red",
              fontWeight: "600",
            }}
          >
            {item.status ? "Enabled" : "Disabled"}
          </span>
        </p>
      </div>

      <div className="relative" ref={menuRef}>
        <div
          className="cursor-pointer text-xl"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenuId(item.id);
          }}
        >
          ⋮
        </div>

        {openMenuId === item.id && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border">
            <p
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleStatus(item.id)}
            >
              {item.status ? "Disable" : "Enable"}
            </p>
            <p
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => deleteSchedule(item.id)}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
</div>
  );
}
