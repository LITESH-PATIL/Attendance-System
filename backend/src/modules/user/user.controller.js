import express from "express";
import { User, Class, Attendance } from "../../model/db.js";
import bcrypt from "bcrypt";
import { UserService } from "./user.service.js";
import { isValidUserCreationInput, isValidUserSessionInput } from "./user.validator.js";


const service = new UserService();

export class UserController {
    async signup(req, res, next) {
        try {
            const validation = isValidUserCreationInput.safeParse(req.body);
            const { name, email, password, role } = validation.data;

            if (!validation.success) {
                return res.status(400).json({
                    "success": false,
                    "error": "Invalid request schema",
                });
            }


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



    async signin(req, res, next) {
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
                    error: "User is not exist"
                })
            }

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                res.status(400).json({
                    success: false,
                    error: "Invalid Password"
                })
            }



            const token = await service.sign({
                payload: { id: user._id, role: user.role },
                secret: process.env.JWT_SECRET,
                options: { expiresIn: "1d" }
            });

            res.status(201).json({
                success: true,
                token,
                data: {
                    message: "Login Successfully"
                }
            })


        } catch (error) {
            next(error);
        }
    }


    async me(req,res,next){
        
    }
}

