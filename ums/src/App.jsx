import React from 'react'
import './App.css'
import Header from './Components/Header/Header'
import StaffSideBar from './Components/SideBar/StaffSideBar'
import StaffDashboard from './Components/Staff/StaffDashboard'
import Footer from './Components/Footer/Footer'
import StaffProfile from './Components/Staff/StaffProfile'

function App() {
  return(
    <>
    <Header />
    <StaffProfile />
    <Footer />
    </>
  )
}

export default App
