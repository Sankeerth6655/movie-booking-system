import { Show } from "../models/show.model"

type showDetails ={
    id:string,
    showTime:string,
    price:number,
    totalSeats:number,
    bookedSeats:number,
    remainingSeats:number
}

//create
export async function createShowService(movieId:string,theatreId:string,data:showDetails):Promise<showDetails>{
    let newShow = await Show.create({movieId,theatreId,...data});
    return {
        id:newShow._id.toString(),
        showTime:newShow.showTime,
        price:newShow.price,
        totalSeats:newShow.totalSeats,
        bookedSeats:newShow.bookedSeats,
        remainingSeats:newShow.remainingSeats
    }
}

//read
export async function getShowsByIdService(movieId:string,theatreId:string):Promise<showDetails[]>{
    let shows = await Show.find({movieId,theatreId}).select('showTime price totalSeats bookedSeats remainingSeats filledSeats').lean();
    return shows.map((show)=>({
        id:show._id.toString(),
        showTime:show.showTime,
        price:show.price,
        totalSeats:show.totalSeats,
        bookedSeats:show.bookedSeats,
        remainingSeats:show.remainingSeats
    }))
}

//update
export async function updateShowService(showId:string,data:showDetails):Promise<showDetails>{
    let updatedShow = await Show.findByIdAndUpdate(showId,{$set:data},{new:true});
    if(!updatedShow) throw new Error("Show not updated in update show service");
    return {
        id:updatedShow._id.toString(),
        showTime:updatedShow.showTime,
        price:updatedShow.price,
        totalSeats:updatedShow.totalSeats,
        bookedSeats:updatedShow.bookedSeats,
        remainingSeats:updatedShow.remainingSeats
    }
}


//delete
export async function deleteShowService(showId:string):Promise<showDetails>{
    let deletedShow = await Show.findByIdAndDelete(showId);
    if(!deletedShow) throw new Error("Show not deleted in delete show service");
    return {
        id:deletedShow._id.toString(),
        showTime:deletedShow.showTime,
        price:deletedShow.price,
        totalSeats:deletedShow.totalSeats,
        bookedSeats:deletedShow.bookedSeats,
        remainingSeats:deletedShow.remainingSeats
    }
}