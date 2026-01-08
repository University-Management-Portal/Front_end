import React from 'react'
import './App.css'
import Header from './Components/Header/Header'
import StudentSideBar from './Components/Sidebar/StudentSideBar'
import StaffSideBar from './Components/Sidebar/StaffSideBar'
import StaffDashboard from './Components/Staff/StaffDashboard'

function App() {
  return(
    <>
      <Header />
      <StaffSideBar />
      <StaffDashboard />
    </>
  )
}

export default App
