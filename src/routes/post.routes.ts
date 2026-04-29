import { Router } from "express";
import { postController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { likeController } from "../controllers/like.controller";
import { followController } from "../controllers/follow.controller";

const router = Router();

router.use(authMiddleware);

// Посты
router.post('/', postController.create);
router.get('/feed', postController.getFeed);          
router.get('/user/:userId', postController.getUserPosts); 
router.get('/:id', postController.getPost);            
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

// Лайки
router.post('/:postId/like', likeController.toggle);

// Подписки
router.get('/:userId/followers', followController.getFollower);
router.get('/:userId/following', followController.getFollowee);
router.post('/:followeeId/follow', followController.toggle);

export default router;