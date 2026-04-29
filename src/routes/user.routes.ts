import { Router } from "express";
import { followController } from "../controllers/follow.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.post("/:followeeId/follow", followController.toggle);

export default router;