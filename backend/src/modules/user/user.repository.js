import { User } from "../../model/db.js";
import jwt from "jsonwebtoken";

export class UserRepository {
    async createUser(data) {
        return await User.create(data)
    }

    async getUserByEmail(email) {
        return await User.findOne({
            email
        })
    }

    async jwtSign(payload, secret, option) {
        return await jwt.sign(payload, secret, option);
    }

    async getUserById(id){
        return await User.findById(id);
    }
}