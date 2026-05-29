import { Request, Response } from "express";
import { createShowService, deleteShowService, getShowsByIdService, updateShowService } from "../services/show.service";

export async function createShow(req:Request<{movieId:string,theatreId:string}>,res:Response):Promise<void>{
    try {
        let newShow = await createShowService(req.params.movieId,req.params.theatreId,req.body);
        res.json({...newShow});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in craete show controller"});
    }
}

export async function getShowsById(req:Request<{movieId:string,theatreId:string}>,res:Response):Promise<void>{
    try {
        let shows = await getShowsByIdService(req.params.movieId,req.params.theatreId);
        res.json([...shows]);
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in craete show controller"});
    }
}

export async function updateShow(req:Request<{showId:string}>,res:Response):Promise<void>{
    try {
        let updatedShow = await updateShowService(req.params.showId,req.body);
        res.json({...updatedShow});
        
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in craete show controller"});
    }
}

export async function deleteShow(req:Request<{showId:string}>,res:Response):Promise<void>{
    try {
        let deletedShow = await deleteShowService(req.params.showId);
        res.json({...deletedShow});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in craete show controller"});
    }
}