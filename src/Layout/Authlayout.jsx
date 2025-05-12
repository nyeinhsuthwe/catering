import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/ui/Nav'

const Authlayout = () => {
  return (
    <div>
        <Nav />
        <Outlet/>
    </div>
  )
}

export default Authlayout