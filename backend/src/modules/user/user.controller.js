import express from "express";
import { User } from "../../model/db.js";
import bcrypt from "bcrypt";
import { UserService } from "./user.service.js";
import { isValidUserCreationInput, isValidUserSessionInput } from "./user.validator.js";
import { success } from "zod";


const service = new UserService();

export class UserController {
    async signup(req, res, next) {
        try {
            const validation = isValidUserCreationInput.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    "success": false,
                    "error": "Invalid request schema",
                });
            }

            const { name, email, password, role } = validation.data;


            const isExist = await service.getUserByEmail(email);
            if (isExist) {
                return res.json({
                    success: false,
                    error: "User is already exist"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);



            const user = await service.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });


        } catch (error) {
            next(error);
        }

    }



    async login(req, res, next) {
        try {
            const validation = isValidUserSessionInput.safeParse(req.body);


            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid input format"
                });
            }


            const { email, password } = validation.data;

            const user = await service.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: "User does not exist"
                });
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid Password"
                });
            }

            const token = await service.sign({
                payload: { id: user._id, role: user.role },
                secret: process.env.JWT_SECRET,
                options: { expiresIn: "1d" }
            });

            return res.status(200).json({
                success: true,
                token,
                data: { message: "Login Successfully" }
            });

        } catch (error) {
            next(error);
        }
    }



    async me(req, res, next) {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: "Invalid Credential"
            })
        }

        const user = await service.getUserById(userId);

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })




    }
}

