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
import StudentCourses from '../Components/Student/StudentCourses.jsx'
import StudentSeparateCourse from '../Components/Student/StudentSeparateCourse.jsx'
import StudentAssignment from '../Components/Student/StudentAssignment.jsx'
import StudentMaterial from '../Components/Student/StudentMaterial.jsx'
import StudentAssignmentDetial from '../Components/Student/StudentAssignmentDetial.jsx'
import StudentMaterialDetial from '../Components/Student/StudentMaterialDetial.jsx'
import StudentNavCourse from '../Components/Student/StudentNavCourse.jsx'
import StudentInternalMark from '../Components/Student/StudentInternalMark.jsx'

function Routing() {
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} /> 
        <Route path='/reset-password' element={<ResetPassword/>} /> 

        <Route element={<Layout/>}>
          <Route path='/staff-dashboard' element={<StaffDashboard/>}/>
          <Route path='/staff-profile' element={<StaffProfile/>}/>
          <Route path='/staff-courses' element={<StaffCourse/>}/>
          <Route path='/staff-course' element={<StaffSeparateCourse/>}/>
          <Route path='/staff-course/assignment' element={<StaffAssignment/>}/>
          
        </Route>

        <Route element={<Layout/>}>
          <Route path='/student-dashboard' element={<StudentDashboard/>}/>
          <Route path='/student-navcourse' element={<StudentNavCourse/>}/>
          <Route path='/student-courses' element={<StudentCourses/>}/>
          <Route path='/student-internalMarks' element={<StudentInternalMark/>}/>
          <Route path='/student-courses/:courseName' element={<StudentSeparateCourse/>}/>
          <Route path='/student-courses/:courseName/assignments' element={<StudentAssignment/>}/>
          <Route path='/student-courses/:courseName/assignments/:assignmentId' element={<StudentAssignmentDetial/>}/>
          <Route path='/student-courses/:courseName/materials' element={<StudentMaterial/>}/>
          <Route path='/student-courses/:courseName/materials/:folderId' element={<StudentMaterialDetial/>}/>
        </Route>

        <Route element={<Layout/>}>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        </Route>

      </Routes>
    </Router>
    </>
  )
}

export default Routing