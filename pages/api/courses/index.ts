import fs from 'fs'
import path from 'path'
export default function handler(req:any,res:any){
  const p = path.join(process.cwd(),'data','courses.json')
  const raw = fs.readFileSync(p,'utf8')
  const obj = JSON.parse(raw)
  if(req.method === 'GET') return res.json({ ok:true, courses: obj.courses })
  if(req.method === 'POST'){
    // Very simple admin check: match env ADMIN_EMAIL (in production replace with robust auth)
    const admin = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com'
    // In demo we don't verify current user server-side; admin UI restricts UI by email.
    const { title, description, lessons } = req.body
    const id = 'c' + Date.now()
    const newCourse = { id, title, description, lessons }
    obj.courses.push(newCourse)
    fs.writeFileSync(p, JSON.stringify(obj,null,2))
    return res.json({ ok:true, courses: obj.courses })
  }
  res.status(405).end()
}
