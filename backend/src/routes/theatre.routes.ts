import { Router } from "express";
import { addTheatre, deleteTheatre, getAllTheatres, getTheatreById, updateTheatre } from "../controllers/theatre.controller";

const router = Router();

router.post('/addTheatre',addTheatre);
router.get('/getAllTheatres',getAllTheatres);
router.get('/getTheatreById/:theatreId',getTheatreById);
router.patch('/updateTheatre/:theatreId',updateTheatre);
router.delete('/deleteTheatre/:theatreId',deleteTheatre);

export default router;