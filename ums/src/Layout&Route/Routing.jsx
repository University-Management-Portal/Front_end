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
import StaffCourse from '../Components/Staff/StaffCourse'

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
        </Route>

        <Route element={<Layout/>}>
          <Route path='/student-dashboard' element={<StudentDashboard/>}/>
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