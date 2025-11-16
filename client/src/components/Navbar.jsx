import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user ={name:"John Doe"};
    const navigate=useNavigate();

    const logoutUser = () => {
        navigate('/');
    }

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5'>
            <Link to='/'>
                <img src="/logo.svg" alt="Logo" className='h-10 w-auto'/>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                {user ? (
                    <span className='max-sm:hidden'>Hello, {user.name}</span>
                ) : (
                    <Link to="/app?state=login" className='px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-full transition'>Login</Link>
                )}
                <button  onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5  rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar