import React from 'react'
import Card from '../components/ui/Card'
import TaskManager from '../components/TaskManager'

export default function Home(){
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <Card>
        <h2 className='text-xl font-semibold mb-2'>Your Tasks</h2>
        <TaskManager />
      </Card>
      <Card>
        <h2 className='text-xl font-semibold mb-2'>About</h2>
        <p className='text-sm'>This demo shows hooks, context, and API integration with pagination and search. Keyword: NO ERRORS</p>
      </Card>
    </div>
  )
}
