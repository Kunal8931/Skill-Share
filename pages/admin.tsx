import Header from '../components/Header'
import { getSession } from 'next-auth/react'
import fs from 'fs'
import path from 'path'
import { useState } from 'react'

export default function Admin({courses, sessionEmail}:{courses:any[], sessionEmail?:string}){
  const [list,setList]=useState(courses)
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const [youtubeId,setYoutubeId]=useState('')
  const isAdmin = sessionEmail === "kunalkk14014@gmail.com"
  async function addCourse(e:any){
    e.preventDefault()
    if(!isAdmin) return alert('Not authorized')
    const res = await fetch('/api/courses',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      title,description:desc,lessons:[{id:Date.now().toString(),title:'Lesson 1',youtubeId}]
    })})
    const data = await res.json()
    if(data.ok) {
      setList(data.courses)
      setTitle(''); setDesc(''); setYoutubeId('')
    } else alert('Error')
  }
  return (
    <>
      <Header/>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Admin</h1>
        {!isAdmin && <div className="p-3 bg-yellow-100 mt-4">You are not the admin.</div>}
        <section className="mt-4">
          <h2 className="font-semibold">Existing courses</h2>
          <ul className="space-y-2 mt-2">
            {list.map(c=>(
              <li key={c.id} className="p-2 border rounded bg-white flex justify-between items-center">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-gray-500">{c.description}</div>
                </div>
                <form onSubmit={async(e)=>{ e.preventDefault(); if(!isAdmin) return; const res=await fetch('/api/courses/'+c.id, {method:'DELETE'}); const d=await res.json(); if(d.ok) setList(d.courses)}}><button className="px-3 py-1 rounded bg-red-500 text-white">Delete</button></form>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="font-semibold">Add new course</h2>
          <form onSubmit={addCourse} className="space-y-2 mt-2">
            <input className="w-full p-2 border rounded" placeholder="Course title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input className="w-full p-2 border rounded" placeholder="Course description" value={desc} onChange={e=>setDesc(e.target.value)} />
            <input className="w-full p-2 border rounded" placeholder="First lesson YouTube ID (unlisted)" value={youtubeId} onChange={e=>setYoutubeId(e.target.value)} />
            <button className="px-4 py-2 rounded bg-blue-600 text-white">Create</button>
          </form>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context:any){
  const session = await getSession(context)
  if(!session) return { redirect: { destination: '/auth/signin', permanent: false } }
  const p = path.join(process.cwd(),'data','courses.json')
  const raw = fs.readFileSync(p,'utf8')
  const obj = JSON.parse(raw)
  return { props: { courses: obj.courses, sessionEmail: session.user?.email || null } }
}
