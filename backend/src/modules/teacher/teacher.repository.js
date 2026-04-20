import {User,Class} from "../../model/db.js";

export class TeacherRepository{
    async createClass(data){
        return await Class.create(data);
    }

    async getStudentById(id){
        return await User.findById(id);
    }

    async findClass(classId,teacherId){
        return await Class.findOne({
            _id : classId,
            teacherId : teacherId
        })
    }
}