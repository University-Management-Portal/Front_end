import React from 'react'
import Search from "@mui/icons-material/Search"
import Notification from "@mui/icons-material/Notifications"
import Menu from "@mui/icons-material/Menu"
import HomeIcon from '@mui/icons-material/Home';
import PageTitles from "./PageTitles"
import { useLocation, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({ 
  onMenuClick, 
  onMenuEnter,    
  onMenuLeave 
}) {

  const navigate = useNavigate();
  const location = useLocation();

  let title = PageTitles[location.pathname]

  if (!title && location.pathname.startsWith("/student-courses")) {
    title = "Courses"
  }

  if (!title && location.pathname.startsWith("/staff-course")) {
    title = "Courses"
  }

  if (!title) {
    title = "not found"
  }

  const user = localStorage.getItem("userType")

  const handleProfileClick = () => {
    if (user === "staff") navigate('/staff-profile');
    else if (user === "student") navigate('/student-profile');
    else if (user === "admin") navigate('/admin-profile');
  }

  const handlehome = () => {
    onMenuClick();

    if (user === "student") navigate("/student-dashboard");
    else if (user === "staff") navigate("/staff-dashboard");
    else if (user === "admin") navigate("/admin-dashboard")
  }

  const handleNotificationClick = () => {
  if (user === "student") navigate("/announcement");
  else if (user === "staff") navigate("/announcement");
  else if (user === "admin") navigate("/announcement");
}

  const searchData = {
  student: [
    { name: "Dashboard", path: "/student-dashboard" },
    { name: "Calendar", path: "/student-dashboard" },
    { name: "Upcoming Events", path: "/student-dashboard" },
    { name: "Current Semester", path: "/student-dashboard" },
    { name: "Current CGPA", path: "/student-dashboard" },
    { name: "Tutor", path: "/student-dashboard" },
    { name: "Last Working Day", path: "/student-dashboard" },
    { name: "Enrolled Courses", path: "/student-dashboard" },

    { name: "Attendance", path: "/student-attendance" },
    { name: "Overall Attendance", path: "/student-attendance" },
    { name: "Attendance's Rules and Regulations", path: "/student-attendance" },
    { name: "Course Attendance", path: "/student-attendance" },

    { name: "Examination Rules & Regulations", path: "/student-examination" },
    { name: "Exam Schedule", path: "/student-examination" },
    { name: "Result", path: "/student-examination" },
    { name: "Exam Fee Details", path: "/student-examination" },

    { name: "Courses", path: "/student-navcourse" },
    { name: "Internal Mark", path: "/student-navcourse" },

    { name: "Time Table", path: "/student-schedule" },
    { name: "Academic Calendar", path: "/student-schedule" },

    { name: "Fees Structure", path: "/student-fees" },
    { name: "Fee Payment", path: "/student-fees" },
    { name: "Transaction History", path: "/student-fees" },

    { name: "Anouncement", path: "/announcement" },
  ],



  staff: [
    { name: "Dashboard", path: "/staff-dashboard" },
    { name: "Calendar", path: "/staff-dashboard" },

    { name: "Time Table", path: "/staff-schedule" },
    { name: "Academic Calendar", path: "/staff-schedule" },

    { name: "Attendance", path: "/staff-attendance" },

    { name: "Internal Marks", path: "/staff-internalmark" },

    { name: "Student List", path: "/staff-studentlist" },

    { name: "Courses", path: "/staff-courses" },

    { name: "Announcement", path: "/announcement" },
  ],



  admin: [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Calendar", path: "/admin-dashboard" },
    { name: "Add Event", path: "/admin-dashboard" },
    { name: "Total Student", path: "/admin-dashboard" },
    { name: "Total Faculties", path: "/admin-dashboard" },
    { name: "Total Departments", path: "/admin-dashboard" },
    { name: "Total Courses", path: "/admin-dashboard" },

    { name: "Users", path: "/admin-userpage" },
    { name: "staff-user", path: "/admin-userpage" },
    { name: "student-user", path: "/admin-userpage" },
    { name: "admin-user", path: "/admin-userpage" },

    { name: "Attendance Report", path: "/admin-report/attendance" },

    { name: "Course", path: "/admin-courses" },
    { name: "Add Course", path: "/admin-courses" },

    { name: "Departments", path: "/admin-departments" },
    { name: "Add Department", path: "/admin-departments" },

    { name: "Report Dashboard", path: "/admin-reports" },
    { name: "Internal Marks Report", path: "/admin-report/internal"},
    { name: "Assignment Report", path: "/admin-report/assignment" },

    { name: "Announcement", path: "/announcement" },

    { name: "Settings", path: "/admin-settings" },
    ]
}

const [searchTerm, setSearchTerm] = React.useState("")
const [results, setResults] = React.useState([])

const handleSearch = (e) => {
  const value = e.target.value
  setSearchTerm(value)

  if (!value.trim()) {
    setResults([])
    return
  }

  const userPages = searchData[user] || []

  const filtered = userPages.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase())
  )

  setResults(filtered)
}

  return (
    <div className='fixed top-0 left-0 w-full h-[90px] flex items-center px-6 bg-[#16005d] text-white z-[1000]'>

      <div className="flex items-center gap-3 min-w-[350px]">
        <div className="flex items-center gap-[10px]">

          <Menu
            className="cursor-pointer !text-[32px]"
            onMouseEnter={onMenuEnter}
            onMouseLeave={onMenuLeave}
            onClick={onMenuClick}
          />

          <span className="text-[28px] font-semibold tracking-[1.2px] text-white">
            {title}
          </span>

        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative flex items-center bg-[#f1f1f1] px-[14px] py-[6px] rounded-[45px] w-[380px] h-[34px]">
          <Search className="!text-black !text-[28px]" />
          <input
            type="text"
            placeholder=" Search"
            value={searchTerm}
            onChange={handleSearch}
            className="border-none outline-none bg-transparent w-full text-black"
          />

          {results.length > 0 && (
          <div className="absolute top-[45px] left-0 w-full bg-white text-black rounded-md shadow-lg z-[2000]">
            {results.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate(item.path)
                  setSearchTerm("")
                  setResults([])
                }}
                >
                  {item.name}
            </div>
    ))}
  </div>
)}


        </div>
      </div>

      <div className="flex items-center gap-6 justify-end min-w-[360px]">

        <img
          src="logo.jpeg"
          alt="College"
          className="h-[55px] w-[250px] mt-[10px] ml-[10px] mr-[20px] rounded-[6px]"
        />

        <HomeIcon
          onClick={handlehome}
          className="!text-[#f1f1f1] !text-[40px] ml-[5px] cursor-pointer hover:!text-[#bcd6ff]"
        />

        <Notification
          onClick={handleNotificationClick} 
          className="!text-[#f1f1f1] !text-[40px] ml-[5px] cursor-pointer hover:!text-[#bcd6ff]"
        />

        <img
          src="Profile.jpg"
          alt="Profile"
          onClick={handleProfileClick}
          className="w-[50px] h-[50px] rounded-full mt-[5px] cursor-pointer"
        />

        <LogoutIcon
          className="mt-[8px] !text-[#CA1111] !text-[30px] cursor-pointer hover:!text-[#ff0010]"
          onClick={() => navigate("/")}
        />

      </div>
    </div>
  )
}
