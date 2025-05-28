<<<<<<< HEAD
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

=======
import { Outlet } from 'react-router-dom'
import Nav from '../components/ui/Nav'

const AuthLayout = () => {
  return (
    <div>
        <Nav/>
        <Outlet/>
    </div>
  )
}

>>>>>>> admin
export default AuthLayout