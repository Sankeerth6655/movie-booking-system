import { Request, Response } from "express";
import { createMovieService, deleteMovieService, getAllMoviesService, getMovieByIdService, updateMovieService } from "../services/movie.service";


//create
export async function createMovie(req:Request,res:Response):Promise<void>{
    try {
        let newMovie = await createMovieService(req.body);
        res.json({...newMovie});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create movie controller"});
    }
}

//read
export async function getAllMovies(req:Request,res:Response):Promise<void>{
    try {
        let movies = await getAllMoviesService();
        res.json([...movies]);
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create movie controller"});
    }
}

export async function getMovieById(req:Request<{movieId:string}>,res:Response):Promise<void>{
    try {
        let movie = await getMovieByIdService(req.params.movieId);
        res.json({...movie});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create movie controller"});
    }
}

//update
export async function updateMovie(req:Request<{movieId:string}>,res:Response):Promise<void>{
    try {
        let updatedmovie = await updateMovieService(req.params.movieId,req.body);
        res.json({...updatedmovie});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create movie controller"});
    }
}

//delete
export async function deleteMovie(req:Request<{movieId:string}>,res:Response):Promise<void>{
    try {
        let deletedMovie = await deleteMovieService(req.params.movieId);
        res.json({...deletedMovie});
    } catch (error) {
        if(error instanceof Error) res.status(500).json({message:error.message});
        else res.status(500).json({message:"Error in create movie controller"});
    }
}