import React from 'react'
export default function Card({ children, className='' }){
  return (
    <div className={`border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
