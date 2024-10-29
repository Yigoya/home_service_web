import React from 'react'
import { logo1 } from './Images'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='bg-[#222222] text-white px-36 flex justify-between p-5'>
      <div><img className=' inline-block' src={logo1} alt="" /> <p className='ml-5 inline-block' >Company Name</p> </div>
      <div className='flex space-x-5'>
        <Link to="#">Services</Link>
        <Link to="/technician-list">Technicians</Link>
        <Link to="/contact-us">Contact</Link>
        <Link to="#">FAQ</Link>
      </div>
      <div className='flex space-x-7'>
        <Link to="/login">Login</Link>
        <Link to="/technician-registration">Become a Technician</Link>
      </div>

    </div>
  )
}

export default NavBar