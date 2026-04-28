import {User,Class} from "../../model/db.js";

export class ClassRepository{
    async findClassById(id){
        return await Class.findById(id).populate('studentIds', 'name email');
    }
}