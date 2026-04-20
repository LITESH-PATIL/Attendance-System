import Router from "express";
import { UserController } from "./user.controller.js";
import {errorMiddleware} from "../../middlewares/error.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new UserController();

router.post('/signup',controller.signup,errorMiddleware);
router.post('/login',controller.login,errorMiddleware);
router.get('/me',authMiddleware,controller.me,errorMiddleware);


export default router;