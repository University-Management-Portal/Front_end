import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "../Components/LoginPage/Login"
import ForgetPassword from '../Components/LoginPage/ForgetPassword'
import ResetPassword from '../Components/LoginPage/ResetPassword'
import StaffDashboard from '../Components/Staff/StaffDashboard'
import StaffProfile from '../Components/Staff/StaffProfile'
import Layout from './Layout.jsx'
import StaffCourse from '../Components/Staff/StaffCourse.jsx'
import StudentDashboard from '../Components/Student/StudentDashboard'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import StaffSeparateCourse from '../Components/Staff/StaffSeparateCourse.jsx'
import StaffAssignment from '../Components/Staff/StaffAssignment.jsx'
import StaffMark from '../Components/Staff/StaffMark.jsx'
import Schedule from '../Components/Staff/Schedule.jsx'
import StaffAttendance from '../Components/Staff/StaffAttendance.jsx'

import StudentCourses from '../Components/Student/StudentCourses.jsx'
import StudentSeparateCourse from '../Components/Student/StudentSeparateCourse.jsx'
import StudentAssignment from '../Components/Student/StudentAssignment.jsx'
import StudentMaterial from '../Components/Student/StudentMaterial.jsx'
import StudentAssignmentDetial from '../Components/Student/StudentAssignmentDetial.jsx'
import StudentMaterialDetial from '../Components/Student/StudentMaterialDetial.jsx'
import StudentNavCourse from '../Components/Student/StudentNavCourse.jsx'
import StudentInternalMark from '../Components/Student/StudentInternalMark.jsx'
import ResultPage from '../Components/Common/ResultPage.jsx'
import StudentProfile from '../Components/Student/StudentProfile.jsx'
import StudentExam from '../Components/Student/StudentExam.jsx'
import StudentAttendance from '../Components/Student/StudentAttendance.jsx'
import StudentSchedule from '../Components/Student/StudentSchedule.jsx'
import StudentFees from '../Components/Student/StudentFees.jsx'

import AnnouncementPage from '../Components/Common/Announcement/AnnouncementPage.jsx'
import StudentListPage from '../Components/Staff/StudentListPage.jsx'
import StaffMaterial from '../Components/Staff/StaffMaterial.jsx'
import FolderMaterial from '../Components/Staff/FolderMaterial.jsx'

import AdminUserPage from '../Components/Admin/AdminUser/AdminUserPage.jsx'
import AdminCourses from '../Components/Admin/AdminCourses/AdminCourses.jsx'
import AdminProfile from '../Components/Admin/AdminProfile.jsx'
import AdminReport from '../Components/Admin/AdminReport.jsx'
import AdminAssignmentReport from '../Components/Admin/AdminAssignmentReport.jsx'
import AdminInternalReport from '../Components/Admin/AdminInternalReport.jsx'
import InternalMarkTable from '../Components/Admin/InternalMarkTable.jsx'
import AssignmentReportTable from '../Components/Admin/AssignmentReportTable.jsx'



function Routing() {
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} /> 
        <Route path='/reset-password' element={<ResetPassword/>} /> 
        <Route path='/result' element={<ResultPage/>} /> 

        <Route element={<Layout/>}>
          <Route path='/staff-dashboard' element={<StaffDashboard/>}/>
          <Route path='/staff-profile' element={<StaffProfile/>}/>
          <Route path='/staff-courses' element={<StaffCourse/>}/>
          <Route path='/staff-courses/:courseName' element={<StaffSeparateCourse/>}/>
          <Route path='/staff-courses/:courseName/assignment' element={<StaffAssignment/>}/>
          <Route path='/staff-courses/:courseName/material' element={<StaffMaterial/>}/>
          <Route path='/staff-internalmark' element={<StaffMark/>}/>
          <Route path='/staff-schedule' element={<Schedule/>}/>
          <Route path='/staff-attendance' element={<StaffAttendance/>}/>
          <Route path='/staff-studentlist' element={<StudentListPage/>}/>
          <Route path="/staff-courses/:courseName/materials/:folderId" element={<FolderMaterial />}/>

          
        </Route>

        <Route element={<Layout/>}>
          <Route path='/student-profile' element={<StudentProfile/>}/>
          <Route path='/student-dashboard' element={<StudentDashboard/>}/>
          <Route path='/student-navcourse' element={<StudentNavCourse/>}/>
          <Route path='/student-courses' element={<StudentCourses/>}/>
          <Route path='/student-internalMarks' element={<StudentInternalMark/>}/>
          <Route path='/student-courses/:courseName' element={<StudentSeparateCourse/>}/>
          <Route path='/student-courses/:courseName/assignments' element={<StudentAssignment/>}/>
          <Route path='/student-courses/:courseName/assignments/:assignmentId' element={<StudentAssignmentDetial/>}/>
          <Route path='/student-courses/:courseName/materials' element={<StudentMaterial/>}/>
          <Route path='/student-courses/:courseName/materials/:folderId' element={<StudentMaterialDetial/>}/>
          <Route path='/student-examination' element={<StudentExam/>}/>
          <Route path='/student-attendance' element={<StudentAttendance/>}/>
          <Route path='/student-schedule' element={<StudentSchedule/>}/>
          <Route path='/student-fees' element={<StudentFees/>}/>
        </Route>

        <Route element={<Layout/>}>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin-userpage' element={<AdminUserPage/>}/>
          <Route path='/admin-courses' element={<AdminCourses/>}/>
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/admin-reports" element={<AdminReport />} />
          <Route path="/admin-report/internal" element={<AdminInternalReport />} />
          <Route path="/admin-report/assignment" element={<AdminAssignmentReport />} />
          <Route path="/admin-report/internal/table" element={<InternalMarkTable />}/>
          <Route path="/admin-report/assignment/table" element={<AssignmentReportTable />}/>

        </Route>

        {/* Common */}
        <Route element={<Layout/>}>
          <Route path='/announcement' element={<AnnouncementPage/>} />
        </Route>

      </Routes>
    </Router>
    </>
  )
}

export default Routing  