import { Router } from "express";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth.middleware";
import { followController } from "../controllers/follow.controller";

const router = Router();

router.use(authMiddleware);
// Подписки
router.post("/:followeeId/follow", followController.toggle);
router.get("/:userId/followers", followController.getFollower);
router.get("/:userId/following", followController.getFollowee);
router.delete("/:followeeId/follow", followController.toggle);
// профиль 
router.get("/:username", async (req, res) => {
  try {
    const currentUserId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      select: {
        id: true,
        username: true,
        email: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    let isFollowing = false;
    if (currentUserId) {
      const follow = await prisma.follow.findUnique({
        where: {
          followeeId_followerId: {
            followerId: currentUserId,
            followeeId: user.id,
          },
        },
      });
      isFollowing = !!follow;
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        postsCount: user._count.posts,
        followersCount: user._count.followers,
        followingCount: user._count.following,
        isFollowing,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});



export default router;