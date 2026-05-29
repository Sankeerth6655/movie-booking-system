import { Router } from "express";
import { createMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from "../controllers/movie.controller";

const router = Router();

router.post('/createMovie',createMovie);
router.get('/getAllMovies',getAllMovies);
router.get('/getMovieById/:movieId',getMovieById);
router.patch('/updateMovie/:movieId',updateMovie);
router.delete('/deleteMovie/:movieId',deleteMovie);

export default router;
