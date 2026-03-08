export default function LessonList({lessons}:{lessons:any[]}){
  return (
    <ul className="space-y-2">
      {lessons.map((l)=>(
        <li key={l.id} className="p-2 border rounded bg-white flex justify-between items-center">
          <div>
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-gray-500">{l.duration || '—'}</div>
          </div>
          <a href={`/watch/${l.youtubeId}`} className="px-3 py-1 rounded bg-blue-50 border">Watch</a>
        </li>
      ))}
    </ul>
  )
}
