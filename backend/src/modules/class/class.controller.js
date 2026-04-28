
import { ClassService } from "./class.service.js"; 

const service = new ClassService();

export class ClassController {


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