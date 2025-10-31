import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export default async function handler(req:any,res:any){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const trimmedEmail = email?.trim().toLowerCase()
  const trimmedPassword = password?.trim()
  if(!trimmedEmail || !trimmedPassword) return res.status(400).json({ ok:false, message:'Email & password required' })
  if(!trimmedEmail.includes('@')) return res.status(400).json({ ok:false, message:'Invalid email format' })
  if(trimmedPassword.length < 6) return res.status(400).json({ ok:false, message:'Password must be at least 6 characters' })
  const file = path.join(process.cwd(),'data','users.json')
  const raw = fs.readFileSync(file,'utf8')
  const obj = JSON.parse(raw)
  if(obj.users.find((u:any)=>u.email === trimmedEmail)) return res.status(400).json({ ok:false, message:'User exists' })
  const hash = bcrypt.hashSync(trimmedPassword,10)
  obj.users.push({ email: trimmedEmail, password: hash })
  fs.writeFileSync(file, JSON.stringify(obj,null,2))
  return res.json({ ok:true })
}
