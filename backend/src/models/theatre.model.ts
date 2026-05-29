import mongoose from "mongoose"

const theatreSchema = new mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    facilities:{type:[String],default:[]} //['3d','dolby atmos', 'wheelchair accessible'];
},{timestamps:true}
);

export const Theatre =mongoose.model('theatre',theatreSchema);