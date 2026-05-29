import { Theatre } from "../models/theatre.model"


//create
export async function addTheatreService(name:string,city:string,facilities?:string[]):Promise<{
    id:string,
    name:string,
    city:string,
    facilities?:string[]
}>{
    let newTheatre = await Theatre.create({name,city,facilities});
    if(!newTheatre) throw new Error("Cannot add the theatre");
    return {
        id:newTheatre._id.toString(),
        name:newTheatre.name,
        city:newTheatre.city,
        facilities: newTheatre.facilities
    }
}

//read
export async function getAllTheatresService():Promise<Array<{
    id:string,
    name:string,
    city:string,
    facilities?:string[]
}>>{
    let theatres = await Theatre.find().select('name city facilities').lean();
    return theatres.map((t)=>({
        id:t._id.toString(),
        name:t.name,
        city:t.city,
        facilities: t.facilities
    }))
}

export async function getTheatreByIdService(theatreId:string):Promise<{
    id:string,
    name:string,
    city:string,
    facilities:string[]
}>{
    let theatre = await Theatre.findById(theatreId).select('name city facilities').lean();
    if(!theatre) throw new Error("Theatre not found");

    return {
        id:theatre._id.toString(),
        name:theatre.name,
        city:theatre.city,
        facilities:theatre.facilities
    }
}


//update
export async function updateTheatreService(id:string,data:{name?:string,city?:string,facilities?:string[]}):Promise<{
    id:string,
    name:string,
    city:string,
    facilities:string[]
}>{
    let updatedTheatre = await Theatre.findByIdAndUpdate(id,{$set:data},{new:true});
    if(!updatedTheatre) throw new Error("Theatre not found");
    return {
        id:updatedTheatre._id.toString(),
        name:updatedTheatre.name,
        city:updatedTheatre.city,
        facilities:updatedTheatre.facilities
    }
}

//delete
export async function deleteTheatreService(theatreId:string):Promise<{
    id:string,
    name:string,
    city:string,
    facilities:string[]
}>{
    let deletedTheatre = await Theatre.findByIdAndDelete(theatreId);
    if(!deletedTheatre) throw new Error("Theatre is not found");
    return {
        id:deletedTheatre._id.toString(),
        name:deletedTheatre.name,
        city: deletedTheatre.city,
        facilities:deletedTheatre.facilities
    }
}