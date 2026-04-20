import Router from "express";
import { UserController } from "./user.controller.js";
import {errorMiddleware} from "../../middlewares/error.middleware.js";

const router = Router();
const controller = new UserController();

router.post('/signup',controller.signup,errorMiddleware);
router.post('/login',controller.signin,errorMiddleware);
router.get('/me',controller.me,errorMiddleware);


export default router;