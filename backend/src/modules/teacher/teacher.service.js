import { TeacherRepository } from "./teacher.repository.js";

export class TeacherService{
    repo = new TeacherRepository();

    async createClass(data){
        return await this.repo.createClass(data);
    }
}