import { Class } from "../../model/db.js";
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
}
