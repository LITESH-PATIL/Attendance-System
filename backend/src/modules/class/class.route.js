import { Router } from "express";
import { ClassController } from "./class.controller.js";
import { errorMiddleware } from "../../middlewares/error.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js"; 

const controller = new ClassController();
const router = Router();


router.get('/:id', authMiddleware, controller.getClassInformation, errorMiddleware);

export default router;
