import { Router } from "express";
import healthRouter from './health.routes.js'
import authRouter from './auth.routes.js';
import theatreRouter from './theatre.routes.js';
import movieRouter from './movie.routes.js'
import showRouter from './show.routes.js';
import ticketRouter from './ticket.routes.js';

const router = Router();

router.use('/health',healthRouter);
router.use('/auth',authRouter);
router.use('/theatre',theatreRouter);
router.use('/movie',movieRouter);
router.use('/show',showRouter);
router.use('/ticket',ticketRouter);

export default router;