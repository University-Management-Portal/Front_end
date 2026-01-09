import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "../Components/LoginPage/Login"
import ForgetPassword from '../Components/LoginPage/ForgetPassword'
import ResetPassword from '../Components/LoginPage/ResetPassword'
import StaffDashboard from '../Components/Staff/StaffDashboard'
import StaffProfile from '../Components/Staff/StaffProfile'
import Layout from './Layout.jsx'
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
        </Route>

      </Routes>
    </Router>
    </>
  )
}

export default Routing