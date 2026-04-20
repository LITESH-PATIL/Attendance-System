import express from "express";



export async function errorMiddleware(err,req,res,next){
    res.status(500).json({
        success : false,
        error : "Something Went wrong"
    })
}
