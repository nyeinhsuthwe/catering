<<<<<<< HEAD
import React, { useRef, useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { userStore } from "../../store/userStore";

const Profile = () => {
  const { user } = userStore();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(
    "https://tse2.mm.bing.net/th?id=OIP.PoS7waY4-VeqgNuBSxVUogAAAA&pid=Api&P=0&h=220"
  );

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-23">
      <div className="mx-auto flex flex-col items-center">
        <img
          src={imagePreview}
          alt="Profile"
          className="rounded-full w-40 h-40 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button onClick={handleButtonClick} className="mt-3 w-[200px]">
          <i className="fa-solid fa-pen-to-square me-2"></i> Upload Profile
        </Button>
      </div>

      <form className="flex flex-col gap-4 w-100 mt-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="id">Your ID</Label>
          </div>
          <TextInput
            id="id"
            type="text"
            value={`${user.employeeId}`}
            disabled
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="role">Your Role</Label>
          </div>
          <TextInput id="role" type="text" value={`${user.role}`} disabled />
        </div>
      </form>
    </Card>
  );
};

export default Profile;
=======
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
>>>>>>> admin
