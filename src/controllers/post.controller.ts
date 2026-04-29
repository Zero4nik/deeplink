import { Request, Response } from "express";
import { postServices } from "../services/post.service";
import { handleError } from "../utils/errorHandler";
import { requireAuth } from "../utils/auth";



export const postController = {
  async create(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const userId = requireAuth(req.user?.id);
      const post = await postServices.create(content, userId);
      res.status(201).json(post);
    } catch (error) {
      handleError(error, res);
    }
  },

  async getPosts(req: Request, res: Response) {
    try {
      const posts = await postServices.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      handleError(error, res);
    }
  },
  async getPost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log('🔵 GET POST ID:', id); // 👈 ДОБАВЬ
    const post = await postServices.getPost(String(id));
    res.json(post);
  } catch (error) {
    console.log('🔵 GET POST ERROR:', error); // 👈 ДОБАВЬ
    handleError(error, res);
  }
},

  async getUserPosts(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const posts = await postServices.getUserPost(String(userId));
      res.json(posts);
    } catch (error) {
      handleError(error, res);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = requireAuth(req.user?.id);
      const post = await postServices.updatePost(String(id), content, userId);
      res.json(post);
    } catch (error) {
      handleError(error, res);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = requireAuth(req.user?.id);
      await postServices.deletePost(String(id), userId);
      res.status(204).send();
    } catch (error) {
      handleError(error, res);
    }
  },

async getFeed(req: Request, res: Response) {
  try {
    const userId = requireAuth(req.user?.id);
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor as string | undefined;
    
    const result = await postServices.getFeed(userId, limit, cursor);
    console.log('CONTROLLER getFeed result:', JSON.stringify(result, null, 2)); // 👈 ДОБАВЬ
    
    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
}
};