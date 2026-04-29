import prisma from "../lib/prisma";
import { User } from "@prisma/client";

export const userRepository ={
    async findByEmail(email:string):Promise<User | null>{
        return prisma.user.findUnique({where: {email}})
    },
    async findById(id:string):Promise<User | null>{
        return prisma.user.findUnique({where: {id}})
    },
    async findByUsername(username:string):Promise<User | null>{
        return prisma.user.findUnique({where: {username}})
    },

    async create(data:{
        username:string
        email:string
        passwordHash:string
        displayName?:string
    }):Promise<User>{
        return prisma.user.create({data})
    }
}