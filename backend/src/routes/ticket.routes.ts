import { Router } from "express";
import { createTicket, deleteTicket, getTicketsByUserId } from "../controllers/ticket.controller";

const router = Router();

router.post('/createTicket/:userId',createTicket);
router.get('/getTicketsByUserId/:userId',getTicketsByUserId);
router.delete('/deleteTicket/:ticketId',deleteTicket);

export default router;