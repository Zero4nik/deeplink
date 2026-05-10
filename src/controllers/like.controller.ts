import { Response,Request } from "express"
import { requireAuth } from "../utils/auth"
import { likeService } from "../services/like.service"
import { handleError } from "../utils/errorHandler"

export const likeController = {
    async toggle(req:Request,res:Response){
        try{
        const userId = requireAuth(req.user?.id)

        const {postId} = req.params

        const result = await likeService.toggleLike(userId,String(postId))
            console.log('likeController.toggle вызван, postId:', req.params.postId);
        res.json(result)
        }catch(error){
            handleError(error,res)
        }
    }
}