import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export const authService = {
    async register(email:string,username:string,password:string){
        const existingEmail = await userRepository.findByEmail(email)
        if(existingEmail) throw new Error('email already')

        const passwordHash  = await bcrypt.hash(password,10)

        const user =await  userRepository.create({
            email,
            username,
            passwordHash ,
            displayName:username
        })
        const token =  jwt.sign({userId:user.id},JWT_SECRET,{expiresIn:'7d'})

        return {user:{id:user.id,email,username},token}
    },
    async login(email:string,password:string){
        const user = await userRepository.findByEmail(email)
        if(!user) throw new Error('invalid credentias')

        const isValid =  await bcrypt.compare(password,user.passwordHash)
        if(!isValid) throw new Error('invalid credentias')

        const token = jwt.sign({userId:user.id},JWT_SECRET,{expiresIn:'7d'})

        return {user:{id:user.id,email:user.email,username:user.username},token}
    }
}   