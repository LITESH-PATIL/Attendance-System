import {Class} from "../../model/db.js";

export class TeacherRepository{
    async createClass(data){
        return await Class.create(data);
    }
}