import React from 'react'
import { Card } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className=''>
      <h3 className='text-3xl font-bold mt-23 text-gray-500 text-center'>Login Form</h3>
      <Card className='max-w-md mt-6 mx-auto bg-gray-100'>
      <div className='items-center '>
      <form className="flex mx-auto mt-6 mb-6 max-w-md flex-col gap-4">
  
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="password2" className='text-gray-600'>Your Email</Label>
        </div>
        <TextInput id="password2" placeholder="Enter your email" type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" className='text-gray-600'>Your password</Label>
        </div>
        <TextInput id="password2" placeholder="Enter your password" type="password" required shadow />
      </div>
      <Button type="submit" className='mt-3'>Login</Button>
      <div className="flex items-center gap-2">
        <Label htmlFor="agree" className="flex text-gray-600">
          If you don't have an accout
          <Link to="/register" className="text-cyan-600 hover:underline dark:text-cyan-500 ms-1"> Register</Link>
        </Label>
      </div>
    </form>
    </div>
    </Card>
    </div>
    
  )
}

export default Login