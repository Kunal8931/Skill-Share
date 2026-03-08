import Header from '../../components/Header'
import LessonList from '../../components/LessonList'
import fs from 'fs'
import path from 'path'
import { getSession } from 'next-auth/react'

export default function CoursePage({course}:{course:any}){
  // Wrap returned elements in a fragment so JSX has a single root:
  if(!course) return (<><Header/><main className="p-4">Course not found</main></>);

  return (
    <>
      <Header/>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
        <div className="mt-4">
          <LessonList lessons={course.lessons} />
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
  const { id } = context.params
  const p = path.join(process.cwd(),'data','courses.json')
  const raw = fs.readFileSync(p,'utf8')
  const obj = JSON.parse(raw)
  const course = obj.courses.find((c:any)=> c.id === id) || null
  return { props: { course } }
}
