import React, { useEffect, useState, useMemo } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const PAGE_SIZE = 10

export default function APIList(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(()=>{
    let cancelled = false
    async function fetchData(){
      setLoading(true)
      setError(null)
      try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        if(!res.ok) throw new Error('Network error')
        const data = await res.json()
        if(!cancelled) setItems(data)
      }catch(err){
        if(!cancelled) setError(err.message)
      }finally{
        if(!cancelled) setLoading(false)
      }
    }
    fetchData()
    return ()=>{ cancelled = true }
  }, [])

  const filtered = useMemo(()=>{
    if(!query.trim()) return items
    return items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.body.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  useEffect(()=>{ if(page > totalPages) setPage(totalPages) }, [totalPages])

  return (
    <div className='space-y-4'>
      <Card>
        <div className='flex items-center gap-2 mb-3'>
          <input className='flex-1 px-3 py-2 rounded border bg-gray-50 dark:bg-gray-900' placeholder='Search posts...' value={query} onChange={e=>setQuery(e.target.value)} />
          <Button onClick={()=>{ setQuery(''); setPage(1) }} variant='secondary'>Clear</Button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className='text-red-500'>{error}</div>}

        <div className='grid gap-3'>
          {pageItems.map(item=> (
            <div key={item.id} className='p-3 border rounded bg-white dark:bg-gray-800'>
              <h3 className='font-semibold'>{item.title}</h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>{item.body}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-between mt-4'>
          <div>Page {page} / {totalPages}</div>
          <div className='flex gap-2'>
            <Button variant='secondary' onClick={()=>setPage(p=>Math.max(1, p-1))} disabled={page===1}>Prev</Button>
            <Button variant='primary' onClick={()=>setPage(p=>Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
