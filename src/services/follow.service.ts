import { userRepository } from "../repositories/user.repository";
import { followRepositories } from "../repositories/follow.repository";
import { getIo } from "../socket";
export const followServices = {
    async toggleFollow(followerId:string,followeeId:string){
        if(followerId === followeeId){
            throw new Error('cannot follow yourself')
        }
        const user = await userRepository.findById(followeeId)
       const io = getIo()
            io.to(`user:${followeeId}`).emit('notification',{
        type:'follow',
        fromUserId:followerId,
        message:`user ${followerId} following you`
        })
        if(!user) throw new Error('not find user')

        const isFollowing = await followRepositories.isFollow(followerId,followeeId)
        if(isFollowing){
            await followRepositories.deleteFollow(followerId,followeeId)
            return {following:false}
        }else{
            await followRepositories.createFollow(followerId,followeeId)
            return {following:true}
        }
    },
    async getFollower(userId:string,limit:number,offset:number){
        const user = await userRepository.findById(userId)
        if(!user) throw new Error('user not found')
        
            return followRepositories.getFollower(String(user),limit,offset)
    },
    async getFollowee(userId:string,limit:number,offset:number){
        const user = await userRepository.findById(userId)
        if(!user) throw new Error('user not found')
        
            return followRepositories.getFollowee(String(user),limit,offset)
    }
}