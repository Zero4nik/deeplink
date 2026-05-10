import prisma from "../lib/prisma";
import { Post } from "@prisma/client";

export const postRepository = {
    async create(data:{content:string,authorId:string}): Promise<Post>{
      
        return prisma.post.create({data})
        
    },
    async findById(id:string):Promise<Post | null>{
    return prisma.post.findUnique({
        where: {id},
        include: {
            Author: {
                select: { id: true, username: true }
            }
        }
    })
},
    async incrementLikes(postId: string) {
  return prisma.post.update({
    where: { id: postId },
    data: { likeCount: { increment: 1 } }
  });
},

async decrementLikes(postId: string) {
  return prisma.post.update({
    where: { id: postId },
    data: { likeCount: { decrement: 1 } }
  });
},

async getLikeCount(postId: string): Promise<number> {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likeCount: true }
  });
  
  return post?.likeCount ?? 0;
},
    async findByAuthorId(authorId:string):Promise<Post[]>{
        return prisma.post.findMany({
            where: {authorId},
            orderBy:{createdAt:'desc'}
        })
    },
    async update(id: string, content: string): Promise<Post> {
  return prisma.post.update({
    where: { id },
    data: { content }
  });
},

    async delete(id:string):Promise<Post>{
        return prisma.post.delete({where:{id}})
    },
    async findAll() {
    return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      Author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    });
},
async getFeed(userId: string, limit: number, cursor?: string) {
  const follows = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followeeId: true }
  });
  const followeeIds = follows.map(f => f.followeeId);

  const posts = await prisma.post.findMany({
    where: { authorId: { in: followeeIds } },
    take: limit,
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
    orderBy: { createdAt: 'desc' },
    include: { Author: { select: { username: true, displayName: true, avatarUrl: true } } }
  });

  const hasMore = posts.length === limit;
  const nextCursor = hasMore ? posts[posts.length - 1].id : undefined;
  return { posts, nextCursor, hasMore };
},


async getUserPosts(authorId: string, limit: number, cursor?: string) {

  const posts = await prisma.post.findMany({
    where: {authorId},
    take: limit,
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
    orderBy: { createdAt: 'desc' },
    include: { Author: { select: { username: true, displayName: true, avatarUrl: true } } }
  });

  const hasMore = posts.length === limit;
  const nextCursor = hasMore ? posts[posts.length - 1].id : undefined;
  return { posts, nextCursor, hasMore };
},
async getComments(postId: string) {
  return prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'asc' },
    include: {
      Author: { select: { id: true, username: true } },
    }
  });
},

async createComment(postId: string, authorId: string, content: string) {
  return prisma.comment.create({
    data: { content, postId, authorId },
    include: {
      Author: { select: { id: true, username: true } },
    }
  });
},
}