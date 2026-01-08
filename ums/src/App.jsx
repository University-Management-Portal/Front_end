import React from 'react'
import './App.css'
import Header from "./Components/Header/Header"
import StudentSideBar from "./Components/Sidebar/StudentSideBar"
import StaffSideBar from "./Components/Sidebar/StaffSideBar"
import Footer from "./Components/Footer/Footer"
import Routing from "./Layout&Route/Routing"
import StaffDashboard from "./Components/Staff/StaffDashboard"
function App() {
  return(
    <>
      <Routing/>
    </>
  )
}

export default App
