import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface theatreResponse{
    id:string,
    name:string,
    city:string,
    facilities:string[]
}
interface theatreRequest{
    name:string,
    city:string,
    facilities:string[]
}

export const theatreApi = createApi({
    reducerPath:'theatreApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000'
    }),
    tagTypes:["Theatre"],
    endpoints:(builder)=>({
        getAllTheatres:builder.query<theatreResponse[],void>({
            query:()=>({
                url:'/theatre/getAllTheatres',
                method:'GET'
            }),
            providesTags:["Theatre"],
            // async onQueryStarted(_arg,{queryFulfilled}){
            //     try {
            //         let {data} = await queryFulfilled;
            //         console.log("Get all theatres api :: ",data);
            //     } catch (error) {
            //         console.log("get all theatres api error");
            //     }
            // }
        }),

        addTheatre:builder.mutation<theatreResponse,theatreRequest>({
            query:(theatreDetails)=>({
                url:'/theatre/addTheatre',
                method:'POST',
                body:theatreDetails
            }),
            invalidatesTags:["Theatre"],
        }),

        deleteTheatre:builder.mutation<theatreResponse,string>({
            query:(theatreId)=>({
                url:`/theatre/deleteTheatre/${theatreId}`,
                method:'DELETE'
            }),
            invalidatesTags:["Theatre"],
        }),


    })
})

export const {useGetAllTheatresQuery, useAddTheatreMutation,useDeleteTheatreMutation}  = theatreApi;