
import { UserRepository } from "./user.repository.js";

export class UserService {
    repo = new UserRepository();

    async create(data) {
        return await this.repo.createUser(data);
    }

    async getUserByEmail(email) {
        return await this.repo.getUserByEmail(email);
    }
    async sign(data){
        return await this.repo.jwtSign(data);
    }
}