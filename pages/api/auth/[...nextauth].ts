import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export default NextAuth({
  providers:[
    CredentialsProvider({
      name:'Credentials',
      credentials:{ email:{label:'Email',type:'text'}, password:{label:'Password',type:'password'} },
      async authorize(credentials){
        const file = path.join(process.cwd(),'data','users.json')
        const raw = fs.readFileSync(file,'utf8')
        const obj = JSON.parse(raw)
        const user = obj.users.find((u:any)=> u.email === credentials?.email?.trim().toLowerCase())
        if(!user) return null
        const ok = bcrypt.compareSync(credentials?.password?.trim()||'', user.password)
        if(!ok) return null
        return { id: user.email, email: user.email }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },
  secret: process.env.NEXTAUTH_SECRET || 'devsecret'
})
