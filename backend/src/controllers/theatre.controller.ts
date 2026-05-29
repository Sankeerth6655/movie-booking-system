import { Request, Response } from "express";
import { addTheatreService, deleteTheatreService, getAllTheatresService, getTheatreByIdService, updateTheatreService } from "../services/theatre.service";

//create
export async function addTheatre(req:Request,res:Response):Promise<void>{
    try {
        let {name,city,facilities} = req.body;
        let newTheatre = await addTheatreService(name,city,facilities);
        res.json({message:"Theatre added successfully",newTheatre});
    } catch (error) {
        if(error instanceof Error) res.json({message:error.message})
        else res.json({message:"Unknown Error"});
    }
}

//read 
export async function getAllTheatres(_req:Request,res:Response):Promise<void>{
    try {
        let theatres = await getAllTheatresService();
        res.json([...theatres]);
    } catch (error) {
        if(error instanceof Error) res.json({message:error.message});
        else res.json({message:"Error in get all theatres controller"});
    }
}

export async function getTheatreById(req:Request<{theatreId:string}>,res:Response):Promise<void>{
    try {
        let theatre = await getTheatreByIdService(req.params.theatreId);
        res.json({message:"Theatre feteched successfully",theatre});
    } catch (error) {
        if(error instanceof Error) res.json({message:error.message});
        else res.json({message:"Error in get theatre by id controller"});
    }
}

//update
export async function updateTheatre(req:Request<{theatreId:string}>,res:Response):Promise<void>{
    try {
        let updatedTheatre = await updateTheatreService(req.params.theatreId,req.body);
        res.json({...updatedTheatre});
    } catch (error) {
        if(error instanceof Error) res.json({message:error.message});
        else res.json({message:"Error in update theatre controller"});
    }
}

//delete
export async function deleteTheatre(req:Request<{theatreId:string}>,res:Response):Promise<void>{
    try {
        let deletedTheatre = await deleteTheatreService(req.params.theatreId);
        res.json({message:"Theatre deleted successfully",deletedTheatre});
    } catch (error) {
        if(error instanceof Error) res.json({message:error.message});
        else res.json({message:"Error delete theatre controller"});
    }
}