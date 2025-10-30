import Header from '../../components/Header'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignUp(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const router = useRouter()
  async function handleSubmit(e:any){
    e.preventDefault()
    const res = await fetch('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    const data = await res.json()
    if(data.ok) router.push('/auth/signin')
    else alert(data.message || 'Error')
  }
  return (
    <>
      <Header/>
      <main className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Sign up</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-green-600 text-white p-2 rounded" type="submit">Create account</button>
        </form>
      </main>
    </>
  )
}
