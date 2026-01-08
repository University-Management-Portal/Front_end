import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../Components/Header/Header"
import Footer from '../Components/Footer/Footer'
import StudentSideBar from '../Components/Sidebar/StudentSideBar'

function Layout() {
  return (
    <div>
        <Header/>
        <StudentSideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout