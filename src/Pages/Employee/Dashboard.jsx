import React from 'react'
import MyCalendar from './Calendar/MyCalendar'
import SideBar from './SideBar'

const Dashboard = () => {
  return (
    <div className='w-[100%] h-[100vh] overflow-y-scroll py-6 pr-11'>
         <MyCalendar/>
    </div>
  )
}

export default Dashboard