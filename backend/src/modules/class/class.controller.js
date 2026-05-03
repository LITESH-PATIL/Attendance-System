
import { ClassService } from "./class.service.js"; 
import { isValidClassCreationInput } from "../class/class.validator.js";

const service = new ClassService();

export class ClassController {
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

    async getClassInformation(req, res, next) {
        try {
            const classId = req.params.id;
            const userId = req.user.id;


            const classData = await service.findClassById(classId);

            if (!classData) {
                return res.status(404).json({
                    success: false,
                    error: "Class not found"
                });
            }


            const isTeacher = classData.teacherId.toString() === userId;
            const isEnrolled = classData.studentIds.some(s => s._id.toString() === userId);

            if (!isTeacher && !isEnrolled) {
                return res.status(403).json({
                    success: false,
                    error: "Access denied. You are not part of this class."
                });
            }


            res.status(200).json({
                success: true,
                data: {
                    _id: classData._id,
                    className: classData.className,
                    teacherId: classData.teacherId,
                    students: classData.studentIds
                }
            });
        } catch (error) {
            next(error);
        }
    }
    
}