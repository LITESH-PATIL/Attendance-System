import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"

export async function teacherMiddleware(req, res, next) {
    try {

        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                success: false,
                error: "Unauthorized, token missing or invalid"
            })
        }


        const token = authHeader.split(" ")[1];

        if (!token || !process.env.JWT_SECRET) {
            return res.status(400).json({
                success: false,
                error: "Invalid Secret"
            })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(403).json({
                success: false,
                error: "Unauthorizes access"
            })
        }

        req.user = verified;

        if (verified.role !== 'teacher') {
            return res.status(403).json({
                success: false,
                error: "Access denied: Teacher role required"
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}