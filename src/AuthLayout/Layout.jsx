import React from 'react'
import NavBar from '../Shared/Components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Components/Footer'

const Layout = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout