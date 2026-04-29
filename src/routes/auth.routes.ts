import { Router } from "express";
import { controlServices } from "../controllers/auth.controllers";

const router = Router()

router.post('/register', controlServices.register)
router.post('/login', controlServices.login)

export default router