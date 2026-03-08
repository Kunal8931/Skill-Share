import fs from 'fs'
import path from 'path'
export default function handler(req:any,res:any){
  const { id } = req.query
  const p = path.join(process.cwd(),'data','courses.json')
  const raw = fs.readFileSync(p,'utf8')
  const obj = JSON.parse(raw)
  if(req.method === 'DELETE'){
    obj.courses = obj.courses.filter((c:any)=> c.id !== id)
    fs.writeFileSync(p, JSON.stringify(obj,null,2))
    return res.json({ ok:true, courses: obj.courses })
  }
  res.status(405).end()
}
