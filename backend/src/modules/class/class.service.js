import { ClassRepository } from "./class.repository.js"


export class ClassService{
    repo = new ClassRepository();
    async findClassById(id){
       return await this.repo.findClassById(id);
    }

    async createClass(data){
        return await this.repo.createClass(data);
    }
    
    async findClass( classId,teacherId ){
        return await this.repo.findClass(classId,teacherId);
    }
   
}