import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css'
import Login from "./Components/LoginPage/Login"
import ForgetPassword from './Components/LoginPage/ForgetPassword'
import ResetPassword from './Components/LoginPage/ResetPassword'

function Routing() {
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} /> 
        <Route path='/reset-password' element={<ResetPassword/>} /> 
      </Routes>
    </Router>
    </>
  )
}

export default Routing