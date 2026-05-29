import { Request, Response } from "express";
import { createTicketService, deleteTicketService, getTicketsByUserIdService } from "../services/ticket.service";

export async function createTicket(req:Request<{userId:string}>,res:Response):Promise<void>{
    try {
        let newTicket = await createTicketService(req.params.userId,req.body);
        res.json({...newTicket});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create ticket controller"});
    }
}

export async function getTicketsByUserId(req:Request<{userId:string}>,res:Response):Promise<void>{
    try {
        let tickets = await getTicketsByUserIdService(req.params.userId);
        res.json([...tickets]);
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create ticket controller"});
    }
}

//updation of tickets is not possible

export async function deleteTicket(req:Request<{ticketId:string}>,res:Response):Promise<void>{
    try {
        let deletedTicket = await deleteTicketService(req.params.ticketId);
        res.json({...deletedTicket});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create ticket controller"});
    }
}