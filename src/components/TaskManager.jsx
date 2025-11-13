import React, { useState, useMemo, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Button from './ui/Button'

export default function TaskManager(){
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  const remaining = tasks.filter(t => !t.completed).length

  function addTask(e){
    e?.preventDefault()
    if(!text.trim()) return
    setTasks(prev => [{ id: Date.now(), text: text.trim(), completed: false }, ...prev])
    setText('')
  }

  function toggle(id){ setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)) }
  function remove(id){ setTasks(prev => prev.filter(t => t.id !== id)) }

  const filtered = useMemo(() => {
    if(filter === 'active') return tasks.filter(t => !t.completed)
    if(filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  useEffect(()=>{
    setTasks(prev => prev.map(t => ({ id: t.id || Date.now(), text: t.text || '', completed: !!t.completed })))
  }, [])

  return (
    <div>
      <form onSubmit={addTask} className='flex gap-2 mb-4'>
        <input value={text} onChange={e=>setText(e.target.value)} className='flex-1 px-3 py-2 rounded border bg-gray-50 dark:bg-gray-900' placeholder='Add a task...' />
        <Button type='submit'>Add</Button>
      </form>

      <div className='flex items-center justify-between mb-3'>
        <div className='space-x-2'>
          <Button variant={filter==='all' ? 'primary' : 'secondary'} onClick={()=>setFilter('all')}>All</Button>
          <Button variant={filter==='active' ? 'primary' : 'secondary'} onClick={()=>setFilter('active')}>Active</Button>
          <Button variant={filter==='completed' ? 'primary' : 'secondary'} onClick={()=>setFilter('completed')}>Completed</Button>
        </div>
        <div className='text-sm'>{remaining} remaining</div>
      </div>

      <ul className='space-y-2'>
        {filtered.length === 0 && <li className='text-sm text-gray-500'>No tasks</li>}
        {filtered.map(task => (
          <li key={task.id} className='flex items-center justify-between p-2 border rounded'>
            <div className='flex items-center gap-3'>
              <input type='checkbox' checked={task.completed} onChange={()=>toggle(task.id)} />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
            </div>
            <Button variant='danger' onClick={()=>remove(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
