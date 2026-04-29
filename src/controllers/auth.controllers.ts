import { authService } from "../services/auth.service";
import { Request,Response } from "express";

export const  controlServices = {
    
    async register(req:Request,res:Response){
    try{
        const {email,username,password} = req.body
        if(!email || !username || !password){
            res.status(400).json({error:'все поля обязательны'})
        }
        const result = await authService.register(email,username,password)
        res.status(201).json(result)
    }catch(error:any){
        const message = error instanceof Error ? error.message : 'Неизвестный  Error'
        res.status(400).json({error:message})
    }
},
    async login(req:Request,res:Response){
        try{
            const {email,password} = req.body
            if(!email || !password){
                res.status(400).json({error:'Пароль и Gmail обязательны'})
            }
            const result = await authService.login(email,password)
            res.status(200).json(result)
        }catch(error:any){
            const message = error instanceof Error ? error.message : 'Неизвестный  Error'
            res.status(401).json({error:message})
        }
    }
}