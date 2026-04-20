import { TeacherRepository } from "./teacher.repository.js";

export class TeacherService{
    repo = new TeacherRepository();

    async createClass(data){
        return await this.repo.createClass(data);
    }

    async getStudentById(id){
        return await this.repo.getStudentById(id);
    }

    async findClass( classId,teacherId ){
        return await this.repo.findClass(classId,teacherId);
    }
}