import { success } from "zod";
import { User, Class } from "../../model/db.js";
import { TeacherService } from "./teacher.service.js";
import { isValidClassCreationInput } from "./teacher.validator.js";

const service = new TeacherService();

export class TeacherController {
    async createClass(req, res, next) {
        try {
            const validation = isValidClassCreationInput.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    error: validation.error.errors[0].message
                });
            }

            const { className } = validation.data;


            const newClass = await service.createClass({
                className,
                teacherId: req.user.id
            });

            res.status(201).json({
                success: true,
                data: newClass
            });
        } catch (error) {
            next(error);
        }
    }

    async addStudent(req, res, next) {
        try {

            const { studentId } = req.body;
            const classId = req.params.id;
            const teacherId = req.user.id;

            if (!studentId) {
                return res.status(400).json({
                    success: false,
                    error: "studentId is required"
                });
            }


            const classData = await service.findClass(classId, teacherId);

            if (!classData) {
                return res.status(404).json({
                    success: false,
                    error: "Class not found or unauthorized"
                });
            }


            classData.studentIds.push(studentId);

            await classData.save();

            res.status(200).json({
                success: true,
                data: classData
            });

        } catch (error) {
            next(error);
        }
    }

}
