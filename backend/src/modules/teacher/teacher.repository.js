import {User,Class} from "../../model/db.js";

export class TeacherRepository{

    async getStudentById(id){
        return await User.findById(id);
    }

    
}