import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import { ThemeContext } from '../context/ThemeContext'

export default function Navbar(){
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <nav className='bg-white dark:bg-gray-800 shadow'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='font-bold text-lg'>TaskManager</Link>
        <div className='flex items-center gap-3'>
          <Link to='/' className='hidden sm:inline'>Home</Link>
          <Link to='/api' className='hidden sm:inline'>API</Link>
          <Button variant='secondary' onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'}</Button>
        </div>
      </div>
    </nav>
  )
}
