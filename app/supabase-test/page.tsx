import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // This will attempt to select from a 'todos' table
  // Note: You may need to create this table in your Supabase dashboard
  const { data: todos, error } = await supabase.from('todos').select()

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
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Supabase Connection Successful</h1>
      <p className="mb-4 text-slate-400">Data from 'todos' table:</p>
      <ul className="list-disc pl-5">
        {todos?.length === 0 && <li className="text-slate-500 italic">No todos found (table is empty).</li>}
        {todos?.map((todo: any) => (
          <li key={todo.id} className="mb-1">{todo.name}</li>
        ))}
      </ul>
    </div>
  )
}
