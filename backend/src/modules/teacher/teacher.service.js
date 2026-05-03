import { TeacherRepository } from "./teacher.repository.js";

export class TeacherService{
    repo = new TeacherRepository();

    async getStudentById(id){
        return await this.repo.getStudentById(id);
    }

    
}