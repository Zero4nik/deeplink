import {  Response } from "express";

export const handleError = (error: any, res: Response) => {
  const errorStatusMap: Record<string, number> = {
    'Unauthorized': 401,
    'Content is required': 400,
    'Content cannot be empty': 400,
    'Post not found': 404,
    'Not authorized to modify this post': 403,
    'Followee ID is required': 400
  };

  const status = errorStatusMap[error.message] || 500;
  const message = status === 500 ? 'Internal server error' : error.message;
  
  if (status === 500) console.error('Unknown error:', error);
  res.status(status).json({ error: message });
};