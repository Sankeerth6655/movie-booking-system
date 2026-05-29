
import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface ticketResponse{
    id:string,
    movieName:string,
    theatreName:string,
    showTime:string,
    seatsBooked:number,
    showDate:string
}
interface ticketRequest{
    movieName:string,
    theatreName:string,
    showTime:string,
    seatsBooked:number,
    showDate:string
}
interface createTicketRequest{
    userId:string,
    ticketDetails:ticketRequest,
}

export const ticketApi = createApi({
    reducerPath:'ticketApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/ticket'
    }),
    tagTypes:["Ticket"],
    endpoints:(builder)=>({
        getTicketsByUserId:builder.query<ticketResponse[],ticketRequest>({
            query:(userId)=>({
                url:`/getTicketsByUserId/${userId}`,
                method:"GET"
            }),
            providesTags:['Ticket'],
            
        }),
        createTicket:builder.mutation<ticketResponse,createTicketRequest>({
            query:({userId,ticketDetails})=>({
                url:`/createTicket/${userId}`,
                method:'POST',
                body:ticketDetails
            }),
            invalidatesTags:['Ticket'],
        })
    })
})

export const {useGetTicketsByUserIdQuery,useCreateTicketMutation} = ticketApi;