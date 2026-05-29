import { Ticket } from "../models/ticket.model"

type ticketDetails = {
    id:string,
    movieName:string,
    theatreName:string,
    showTime:string,
    seatsBooked:number,
    showDate:Date
}

//create
export async function createTicketService(userId:string,data:ticketDetails):Promise<ticketDetails>{
    const newTicket = await Ticket.create({userId,...data});
    return {
        id:newTicket._id.toString(),
        movieName:newTicket.movieName,
        theatreName:newTicket.theatreName,
        showTime:newTicket.showTime,
        seatsBooked:newTicket.seatsBooked,
        showDate:newTicket.showDate
    }
}

//read
export async function getTicketsByUserIdService(userId:string):Promise<ticketDetails[]>{
    const tickets = await Ticket.find({userId}).select('showTime movieName theatreName seatsBooked showDate').lean();
    return tickets.map((ticket)=>({
        id:ticket._id.toString(),
        movieName:ticket.movieName,
        theatreName:ticket.theatreName,
        showTime:ticket.showTime,
        seatsBooked:ticket.seatsBooked,
        showDate:ticket.showDate
    }))
}

//update -- cannot update the ticket. once booked/created, updating is not possible.

//delete
export async function deleteTicketService(ticketId:string):Promise<ticketDetails>{
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
    if(!deletedTicket) throw new Error("Ticket not deleted in delete ticket service");
    return {
        id:deletedTicket._id.toString(),
        movieName:deletedTicket.movieName,
        theatreName:deletedTicket.theatreName,
        showTime:deletedTicket.showTime,
        seatsBooked:deletedTicket.seatsBooked,
        showDate:deletedTicket.showDate
    }
}