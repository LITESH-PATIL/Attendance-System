import { ClassRepository } from "./class.repository.js"


export class ClassService{
    repo = new ClassRepository();
    async findClassById(id){
       return await this.repo.findClassById(id);
    }

   
}