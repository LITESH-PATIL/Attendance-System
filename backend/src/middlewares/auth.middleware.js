import express from "express";
import jwt from "jsonwebtoken";
import { success } from "zod";

export async function authMiddleware(req,res,next) {
    try {
        const token = req.header.authorization;

        if(!token || !token.startWith('Bearer')){
            return res.status(400).json({
                success : false,
                error : "Unauthorized, token missing or invalid"
            })
        }
    } catch (error) {
        
    }
}