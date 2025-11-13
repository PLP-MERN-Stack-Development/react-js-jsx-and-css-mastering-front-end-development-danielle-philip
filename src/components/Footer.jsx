import React from 'react'
export default function Footer(){
  return (
    <footer className='bg-white dark:bg-gray-800 border-t mt-8'>
      <div className='container mx-auto px-4 py-6 flex items-center justify-between'>
        <span>© {new Date().getFullYear()} TaskManager — NO ERRORS</span>
        <div className='space-x-4'>
          <a href='#'>Privacy</a>
          <a href='#'>Terms</a>
        </div>
      </div>
    </footer>
  )
}
