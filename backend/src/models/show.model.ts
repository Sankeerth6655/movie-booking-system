import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    movieId:{type:String,ref:"Movie",required:true},
    theatreId:{type:String,ref:"Theatre",required:true},
    showTime:{type:String,required:true},
    price:{type:Number, required:true},
    totalSeats:{type:Number, required:true},
    bookedSeats:{type:Number, required:true},
    remainingSeats:{type:Number, required:true}
},{timestamps:true});

export const Show = mongoose.model('show',showSchema);