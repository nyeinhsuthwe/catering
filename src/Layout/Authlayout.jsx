import { Outlet } from 'react-router-dom'
import Nav from '../components/ui/Nav'
import DarkModeToggle from '../components/ui/DarkModeToggle'

const AuthLayout = () => {
  return (
    <div className="dark:bg-black h-screen ">
        <div className='flex justify-end'>
          <DarkModeToggle />
        </div>
        <Outlet/>
    </div>
  )
}

export default AuthLayout