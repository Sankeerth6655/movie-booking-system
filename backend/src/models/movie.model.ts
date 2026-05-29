import mongoose from "mongoose";

const movieSchema  = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    language:{type:[String],required:true},
    rating:{type:Number,required:true},
    censorCertificate:{type:String,required:true},
    posterURL:{type:String,required:true}
},{timestamps:true});

export const Movie = mongoose.model('movie',movieSchema);