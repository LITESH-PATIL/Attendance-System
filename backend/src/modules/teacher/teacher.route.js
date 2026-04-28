import { Router } from "express";
import { TeacherController } from "./teacher.controller.js";
import { teacherMiddleware } from "../../middlewares/teacher.middleware.js";
import { errorMiddleware } from "../../middlewares/error.middleware.js";

const router = Router();

const controller = new TeacherController();

router.post('/class', teacherMiddleware, controller.createClass, errorMiddleware);
router.post('/class/:id/add-student', teacherMiddleware, controller.addStudent, errorMiddleware);
router.get('/students', teacherMiddleware, controller.getStudents, errorMiddleware);


export default router;