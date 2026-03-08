export default function VideoPlayer({videoId}:{videoId:string}){
  const src = `https://www.youtube.com/embed/${videoId}`
  return (
    <div className="aspect-video bg-black">
      <iframe
        title={videoId}
        width="100%"
        height="100%"
        src={src}
        allowFullScreen
      />
    </div>
  )
}
