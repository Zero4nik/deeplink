import prisma from "../lib/prisma";
import { Like } from "@prisma/client";

export const likeRepository = {
async create(userId:string,postId:string){
return await prisma.like.create({
  data:{userId,postId}
})
},
async delete(userId:string,postId:string){
  return await prisma.like.delete({
  where:{
    userId_postId:{userId,postId}
  }
})
},
async isLiked(userId:string,postId:string):Promise<boolean>{
const like = await prisma.like.findUnique({
  where:{
    userId_postId:{userId,postId}
  }
})
return like !== null;
},
async count(postId:string){
return await prisma.like.count({
  where:{postId}
})
}
};