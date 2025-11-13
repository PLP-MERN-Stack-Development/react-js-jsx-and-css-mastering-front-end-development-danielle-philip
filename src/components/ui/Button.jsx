import React from 'react'

const variantMap = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
}

export default function Button({ children, variant='primary', className='', ...props }){
  const base = 'px-4 py-2 rounded-md font-medium transition-all duration-150'
  return (
    <button className={`${base} ${variantMap[variant] || variantMap.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
