import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css'
import Login from "./Components/LoginPage/Login"
import ForgetPassword from './Components/LoginPage/ForgetPassword'

function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
