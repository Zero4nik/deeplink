import prisma from "../lib/prisma";
import { Follow } from "@prisma/client";

export const followRepositories = {
    async createFollow(followerId:string,followeeId:string):Promise<Follow>{
        return prisma.follow.create({
            data: {followerId,followeeId}
        })
    },
    async deleteFollow(followerId:string,followeeId:string):Promise<Follow>{
        return prisma.follow.delete({
            where:{
                followeeId_followerId:{followeeId,followerId}
            }
        })
    },
    async isFollow(followerId:string,followeeId:string):Promise<boolean>{
        const follow = await prisma.follow.findUnique({
            where:{
                followeeId_followerId:{followeeId,followerId}
            }
        })
        return !!follow
    },
    async getFollower(userId:string,limit: number, offset: number){
        const follower = await prisma.follow.findMany({
            where:{followeeId:userId},
            take:limit,
            skip:offset,
            include:{follower:{select:{username: true, displayName: true, avatarUrl: true}}},
            orderBy:{createdAt:"desc"}
        
        })
        const total = await prisma.follow.count({where:{followeeId:userId}})
        const hasMore = offset+limit < total
        return{
            data:follower.map(f => f.follower),
            nextOffset:hasMore ? limit + offset : undefined,
            hasMore
            
        }
    },
        async getFollowee(userId:string,limit: number, offset: number){
        const follower = await prisma.follow.findMany({
            where:{followerId:userId},
            take:limit,
            skip:offset,
            include:{followee:{select:{username: true, displayName: true, avatarUrl: true}}},
            orderBy:{createdAt:"desc"}
        
        })
        const total = await prisma.follow.count({where:{followerId:userId}})
        const hasMore = offset+limit < total
        return{
            data:follower.map(f => f.followee),
            nextOffset:hasMore ? limit + offset : undefined,
            hasMore
            
        }
    }
}