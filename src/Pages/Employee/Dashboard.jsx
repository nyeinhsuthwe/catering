import React from 'react'
import MyCalendar from './Calendar/MyCalendar'
import { userStore } from '../../store/userStore';


const Dashboard = () => {
    const {user, token} = userStore();
    console.log("user",user);
    console.log('token', token);
    
  return (
    <div className='w-[100%] h-[100vh] overflow-y-scroll py-6 pr-11'>
         <MyCalendar/>
    </div>
  )
}

export default Dashboard