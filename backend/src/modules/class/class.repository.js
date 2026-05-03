import {User,Class} from "../../model/db.js";

export class ClassRepository{
    async findClassById(id){
        return await Class.findById(id).populate('studentIds', 'name email');
    }
    async createClass(data){
        return await Class.create(data);
    }
    async findClass(classId,teacherId){
        return await Class.findOne({
            _id : classId,
            teacherId : teacherId
        })
    }
}