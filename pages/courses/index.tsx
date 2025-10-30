import Header from '../../components/Header'
import CourseCard from '../../components/CourseCard'
import fs from 'fs'
import path from 'path'
import { getSession } from 'next-auth/react'

export default function Courses({courses}:{courses:any[]}){
  return (
    <>
      <Header/>
      <main className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c:any)=> <CourseCard key={c.id} course={c} />)}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context:any){
  const session = await getSession(context)
  if(!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } }
  }
  const p = path.join(process.cwd(),'data','courses.json')
  const raw = fs.readFileSync(p,'utf8')
  const obj = JSON.parse(raw)
  return { props: { courses: obj.courses } }
}
