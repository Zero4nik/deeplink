
import { getIo } from "../socket";
import { likeRepository } from "../repositories/like.repositories";
import { postRepository } from "../repositories/post.repository";
export const likeService = {
  async toggleLike(userId: string, postId: string) {

    const post = await postRepository.findById(postId);
    
    if (!post) throw new Error('Post not found');


    const isLiked = await likeRepository.isLiked(userId, postId);
    
  


    if (isLiked) {
      await likeRepository.delete(userId, postId);
      await postRepository.decrementLikes(postId); 
    } else {
      await likeRepository.create(userId, postId);
      await postRepository.incrementLikes(postId);
    }

      console.log('📨 Отправка уведомления в комнату:', `user:${post.authorId}`);
      console.log('📨 Автор поста:', post.authorId);
      console.log('📨 Текущий пользователь (лайкает):', userId);

    const io = getIo()
    io.to(`user:${post?.authorId}`).emit('notification',{
      type:'like',
      fromUserId:userId,
      postId:postId,
      message:`user ${userId} liked your post`
    })

    const newCount = await postRepository.getLikeCount(postId);
    return { liked: !isLiked, count: newCount };
  }
};