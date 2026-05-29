import { Movie } from "../models/movie.model"

type MovieDetails = {
    id:string,
    title:string,
    description:string,
    language:string[],
    rating:number,
    censorCertificate:string,
    posterURL:string
};
//create
export async function createMovieService(data:MovieDetails):Promise<MovieDetails>{
    let movie = await Movie.create({...data});
    return {
        id:movie._id.toString(),
        title:movie.title,
        description:movie.description,
        language: movie.language,
        rating:movie.rating,
        censorCertificate:movie.censorCertificate,
        posterURL:movie.posterURL
    }
}

//read
export async function getAllMoviesService():Promise<MovieDetails[]>{
    let movies = await Movie.find().select('title description language rating censorCertificate posterURL').lean();
    return movies.map((movie)=>({
        id:movie._id.toString(),
        title:movie.title,
        description:movie.description,
        language: movie.language,
        rating:movie.rating,
        censorCertificate:movie.censorCertificate,
        posterURL:movie.posterURL
    }));
}

export async function getMovieByIdService(movieId:string):Promise<MovieDetails>{
    let movie = await Movie.findById(movieId).select('title description language rating censorCertificate posterURL').lean();
    if(!movie) throw new Error("Movie not found in get movie by id service");
    return {
        id:movie._id.toString(),
        title:movie.title,
        description:movie.description,
        language: movie.language,
        rating:movie.rating,
        censorCertificate:movie.censorCertificate,
        posterURL:movie.posterURL
    }
}

//update
export async function  updateMovieService(movieId:string,data:MovieDetails):Promise<MovieDetails>{
    let updatedMovie = await Movie.findByIdAndUpdate(movieId,{$set:data},{new:true});
    if(!updatedMovie) throw new Error("Movie not updated in update movie service");
    return {
        id:updatedMovie._id.toString(),
        title:updatedMovie.title,
        description:updatedMovie.description,
        language: updatedMovie.language,
        rating:updatedMovie.rating,
        censorCertificate:updatedMovie.censorCertificate,
        posterURL:updatedMovie.posterURL
    }
}

//delete 
export async function deleteMovieService(movieId:string):Promise<MovieDetails>{
    let deletedMovie = await Movie.findByIdAndDelete(movieId);
    if(!deletedMovie) throw new Error("Movie not deleted in delete movie service");
    return {
        id:deletedMovie._id.toString(),
        title:deletedMovie.title,
        description:deletedMovie.description,
        language: deletedMovie.language,
        rating:deletedMovie.rating,
        censorCertificate:deletedMovie.censorCertificate,
        posterURL:deletedMovie.posterURL
    }
}

