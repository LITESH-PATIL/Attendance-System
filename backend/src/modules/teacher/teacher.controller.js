import { success } from "zod";
import { User, Class } from "../../model/db.js";
import { TeacherService } from "./teacher.service.js";


const service = new TeacherService();

export class TeacherController {
    async getStudents(req, res, next) {

        const students = await User.find({
            role: 'student'
        }).select('-password');


        if (!students || students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found"
            });
        }
    
        res.status(200).json({
            success : true,
             data: students.map(student => ({
                id: student._id,
                name: student.name,
                email: student.email
            }))
        });

    }



}
