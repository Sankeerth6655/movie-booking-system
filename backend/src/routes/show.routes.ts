import { Router } from "express";
import { createShow, deleteShow, getShowsById, updateShow } from "../controllers/show.controller";

const router = Router();

router.post('/createShow/:theatreId/:movieId',createShow);
router.get('/getShowsById/:theatreId/:movieId',getShowsById);
router.patch('/updateShow/:showId',updateShow);
router.delete('/deleteShow/:showId',deleteShow);

export default router;