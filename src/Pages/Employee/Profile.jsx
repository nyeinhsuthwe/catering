import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const Profile = () => {
  return (
    
    <div className='flex gap-10  p-5 ml-20 mt-23'>
        <div>
        <img src="https://tse2.mm.bing.net/th?id=OIP.PoS7waY4-VeqgNuBSxVUogAAAA&pid=Api&P=0&h=220" alt="" className='rounded-full w-50 h-50 ' />
        <Button type="submit" className='mx-auto mt-3 '><i className="fa-solid fa-pen-to-square me-2 "></i>Edit Profile</Button>
        </div>
         <form className="flex flex-col gap-4 w-100">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput id="email1" type="email" placeholder="" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your Name</Label>
        </div>
        <TextInput id="name" type="name" placeholder="" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      
      <Button type="submit" className='mt-10 hover:bg-gray-600 bg-gray-500'>Update</Button>
    </form>
    </div>
   
  )
}

export default Profile