import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId:{type:String,ref:"User",required:true},
    movieName:{type:String,required:true},
    theatreName:{type:String,required:true},
    showTime:{type:String,required:true},
    seatsBooked:{type:Number,required:true},
    showDate:{type:Date,required:true}
},{timestamps:true})

export const Ticket = mongoose.model('ticket',ticketSchema);