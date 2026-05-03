import { Router } from "express";
import { ClassController } from "./class.controller.js";
import { errorMiddleware } from "../../middlewares/error.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js"; 
import { teacherMiddleware } from "../../middlewares/teacher.middleware.js";

const controller = new ClassController();
const router = Router();

router.post('/', teacherMiddleware, controller.createClass, errorMiddleware);
router.get('/:id', authMiddleware, controller.getClassInformation, errorMiddleware);
router.post('/:id/add-student', teacherMiddleware, controller.addStudent, errorMiddleware);

export default router;
