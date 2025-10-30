import Header from '../../components/Header'
import VideoPlayer from '../../components/VideoPlayer'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Watch({videoId}:{videoId:string}){
  const [progress,setProgress] = useState(0)
  useEffect(()=>{
    const key = `progress_${videoId}`
    const p = localStorage.getItem(key)
    if(p) setProgress(Number(p))
  },[videoId])
  function markWatched(){
    const key = `progress_${videoId}`
    localStorage.setItem(key,'100')
    setProgress(100)
  }
  return (
    <>
      <Header/>
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl mb-4">Watch lesson</h2>
        <VideoPlayer videoId={videoId} />
        <div className="mt-3 flex items-center justify-between">
          <div>Progress: {progress}%</div>
          <button onClick={markWatched} className="px-3 py-1 rounded bg-green-600 text-white">Mark watched</button>
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
  const { videoId } = context.params
  return { props: { videoId } }
}
