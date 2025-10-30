import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export default async function handler(req:any,res:any){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ ok:false, message:'Email & password required' })
  const file = path.join(process.cwd(),'data','users.json')
  const raw = fs.readFileSync(file,'utf8')
  const obj = JSON.parse(raw)
  if(obj.users.find((u:any)=>u.email === email)) return res.status(400).json({ ok:false, message:'User exists' })
  const hash = bcrypt.hashSync(password,10)
  obj.users.push({ email, password: hash })
  fs.writeFileSync(file, JSON.stringify(obj,null,2))
  return res.json({ ok:true })
}
