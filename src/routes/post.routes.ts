import { Router } from "express";
import { postController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { likeController } from "../controllers/like.controller";


const router = Router();

router.use(authMiddleware);

// Лайки 
router.post('/:postId/like', likeController.toggle);

// Посты
router.post('/', postController.create);
router.get('/feed', postController.getFeed);
router.get('/all', postController.getAll);
router.get('/user/:userId', postController.getUserPosts);
router.get('/:id/comments', postController.getComments);
router.post('/:id/comments', postController.createComment);
router.get('/:id', postController.getPost);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

router.delete('/:postId/like', likeController.toggle);



export default router;