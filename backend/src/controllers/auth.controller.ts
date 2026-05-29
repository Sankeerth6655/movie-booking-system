import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export async function login(req:Request,res:Response):Promise<void>{
    try {
        let user = await loginUser(req.body.username,req.body.password);
        res.json({...user});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({error:error.message});
        else res.status(500).json({error:"Error in Login controller"});
    }
}

export async function register(req:Request,res:Response):Promise<void>{
    try {
        let user = await registerUser(req.body.username,req.body.password,req.body.role);
        res.json({...user});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({error:error.message});
        else res.status(500).json({error:"Error in Register controller"});
    }
}