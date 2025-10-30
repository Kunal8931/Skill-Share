import Header from '../../components/Header'
import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignIn({csrfToken}:{csrfToken:string}){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const router = useRouter()
  async function handleSubmit(e:any){
    e.preventDefault()
    const res = await signIn('credentials',{redirect:false,email,password})
    if(res?.ok) router.push('/courses')
    else alert('Invalid credentials')
  }
  return (
    <>
      <Header/>
      <main className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">Sign in</button>
        </form>
      </main>
    </>
  )
}

export async function getServerSideProps(context:any){
  return { props: { csrfToken: await getCsrfToken(context) } }
}
