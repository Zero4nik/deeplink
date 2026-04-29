import { Request,Response } from "express";
import { requireAuth } from "../utils/auth";
import { handleError } from "../utils/errorHandler";
import { followServices } from "../services/follow.service";
import { followRepositories } from "../repositories/follow.repository";

export const followController = {
    async toggle(req:Request,res:Response){
        try{
            const followerId =  requireAuth(req.user?.id)
            const {followeeId} = req.params


            if (!followeeId) throw new Error('Followee ID is required');

            const result = await followServices.toggleFollow(followerId,String(followeeId))
            res.json(result)
        }catch(error){
            handleError(error,res)
        }
    },
    async getFollower(req:Request,res:Response){
        try{
           const userId  = String(req.params.userId)
           const limit   = Number(req.query.limit) || 10
           const offset  = Number(req.query.offset) || 0

           const result = await followServices.getFollower(userId,limit,offset)
           res.json(result)
        }catch(error){
            handleError(error,res)
        }
    },
    async getFollowee(req:Request,res:Response){
        try{
           const userId  = String(req.params.userId)
           const limit   = Number(req.query.limit) || 10
           const offset  = Number(req.query.offset) || 0

           const result = await followServices.getFollowee(userId,limit,offset)
           res.json(result)
        }catch(error){
            handleError(error,res)
        }
    }
}