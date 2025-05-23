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
          <Label htmlFor="id">Your ID</Label>
        </div>
        <TextInput id="id" type="text" placeholder="" disabled />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="role">Your Role</Label>
        </div>
        <TextInput id="role" type="text" placeholder="" disabled />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput id="password" type="password" disabled />
      </div>
      </form>
    </div>
   
  )
}

export default Profile