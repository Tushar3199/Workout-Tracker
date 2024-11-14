import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({user, setUser}) => {

  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      const response = await fetch('/auth/logout', {
        method:'POST',
        credentials: 'include',
      })
      if (response.ok) { 
        setUser(null); 
        localStorage.removeItem('user');
        navigate('/login'); 
      } else { 
        console.error('Logout failed'); 
      }
    } catch (err) { 
      console.error('Logout failed', err); 
    }
  }

  return (
    <>
      <header className='flex justify-between px-8 py-4 items-center bg-gray-200'>
        <div>
          <Link to='/'>
            <h1 className='text-2xl font-bold'>Workout-Tracker</h1>
          </Link>
        </div>
        <div className='flex gap-7 items-center'>
          <div className='flex gap-2'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/workouts'>Workouts</Link>
          </div>
          {user ? ( 
            <div className='flex items-center gap-4'> 
              <span className='text-green-600'>Hi, {user.name}!</span> 
              <button onClick={handleLogout} className='p-1 px-3 bg-red-800 text-white rounded-md' > Logout </button> 
            </div> ) : ( 
              <Link to='/login' className='p-1 px-3 bg-blue-800 text-white rounded-md'>         <div>LOGIN/SIGNUP</div> 
              </Link> 
            )}
        </div>
      </header>
    </>
  )
}

export default Navbar