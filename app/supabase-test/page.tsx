'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [todos, setTodos] = useState<any[] | null>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('todos').select()
      
      if (error) {
        setError(error)
      } else {
        setTodos(data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8 text-white">Loading Supabase data...</div>
  }

  if (error) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Supabase Connection Error</h1>
        <pre className="bg-white/5 p-4 rounded border border-white/10">{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Supabase Connection Successful (Client-Side)</h1>
      <p className="mb-4 text-slate-400">Data from &apos;todos&apos; table:</p>
      <ul className="list-disc pl-5">
        {todos?.length === 0 && <li className="text-slate-500 italic">No todos found (table is empty).</li>}
        {todos?.map((todo: any) => (
          <li key={todo.id} className="mb-1">{todo.name}</li>
        ))}
      </ul>
    </div>
  )
}
