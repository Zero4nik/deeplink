import { postRepository } from "../repositories/post.repository";
import redis from "../lib/redis";

const CACHE = 30
export const postServices = {
 async create(content: string, authorId: string) {
    if (!content || content.trim() === '') {
      throw new Error('Content is required');
    }
    
    const post = await postRepository.create({ content, authorId });
    
    const keys = await redis.keys('feed:*');
    if (keys.length) {
      await redis.del(...keys);
      console.log(` Invalidated ${keys.length} cache keys`);
    }
    
    return post;
  },

  async getFeed(userId: string, limit: number, cursor?: string) {
    const cacheKey = `feed:${userId}:${limit}:${cursor || 'start'}`;
    

    const result = await postRepository.getFeed(userId, limit, cursor);
    await redis.setex(cacheKey, CACHE, JSON.stringify(result));
    
    return result;
  },
async getPost(id: string) {
  console.log('🔵 SERVICE GET POST ID:', id); // 👈 ДОБАВЬ
  const post = await postRepository.findById(id);
  console.log('🔵 SERVICE GET POST RESULT:', post); // 👈 ДОБАВЬ
  if (!post) throw new Error('Post not found');
  return post;
},
async getUserPost(userId:string){
    return postRepository.findByAuthorId(userId)
},

/**
 * Проверка,является ли пользователь автором поста
 * использую в обновлении и удалении поста
 * postId-айди поста
 * userId-айди пользователя
 * возвращаю пост если проверки пройдены
 * проверяю на ошибки есть ли пост и является ли пользователь автором поста
  */
async checkOwnership(userId:string,postId:string){
    const post = await postRepository.findById(postId)
    if(!post) throw new Error('post not found')
    if(post.authorId !== userId) throw new Error('You no author`s')
        return post
},
async updatePost(id:string,userId:string,content:string){
    await this.checkOwnership(id,userId)
    if(!content || content.trim() === '') throw new Error('content cannot by empty')
        return postRepository.update(id,content)
},
async deletePost(id: string, userId: string) {
  const post = await postRepository.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }
  if (post.authorId !== userId) {
    throw new Error('Not authorized to modify this post');
  }
  return postRepository.delete(id);
},
async getAllPosts() {
    return postRepository.findAll();
  },

  
}