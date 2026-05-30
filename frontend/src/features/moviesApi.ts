import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Movie {
    id:string,
    title:string,
    description:string,
    language:string[],
    rating:number,
    censorCertificate:string,
    posterURL:string
};

interface MovieRequest{
    title:string,
    description:string,
    language:string[],
    rating:number,
    censorCertificate:string,
    posterURL:string
}

interface MovieResponse{
    id:string,
    title:string,
    description:string,
    language:string[],
    rating:number,
    censorCertificate:string,
    posterURL:string
}
const API = import.meta.env.VITE_BACKEND_URL;

export const moviesApi = createApi({
    reducerPath:"moviesApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${API}`
    }),
    tagTypes:["Movie"],
    endpoints:(builder)=>({
        getAllMovies:builder.query<Movie[],void>({
            query:()=>({
                url:'/movie/getAllMovies',
                method:"GET",
            }),
            providesTags:["Movie"],
            // async onQueryStarted(_arg,{queryFulfilled}){
            //     try {
            //         const {data} = await queryFulfilled;
            //         console.log("Movies api:: ",data);
            //     } catch (error) {
            //         console.log("Error in movies api",error);
            //     }
            // }
        }),

        createMovie:builder.mutation<MovieResponse,MovieRequest>({
            query:(movieDetails)=>({
                url:'movie/createMovie',
                method:'POST',
                body:movieDetails
            }),
            invalidatesTags:["Movie"],
            // async onQueryStarted(_arg,{queryFulfilled}){
            //     try {
            //         const {data} = await queryFulfilled;
            //         console.log("Create movie :: ",data);
            //     } catch (error) {
            //         console.log("Error in movies api create movie",error);
            //     }
            // }
        }),

        deleteMovie:builder.mutation<MovieResponse,string>({
            query:(movieId)=>({
                url:`movie/deleteMovie/${movieId}`,
                method:'DELETE',
            }),
            invalidatesTags:["Movie"],
        }),

        getMovieById:builder.query<MovieResponse,string>({
            query:(movieId)=>({
                url:`movie/getMovieById/${movieId}`,
                method:'GET'
            }),
            // async onQueryStarted(_arg,{queryFulfilled}){
            //     try {
            //         const {data} = await queryFulfilled;
            //         console.log("get movie by id:: ",data);
            //     } catch (error) {
            //         console.log("Error in movies api get movie by id",error);
            //     }
            // }
        })
    })
})

export const {useGetAllMoviesQuery, useCreateMovieMutation, useGetMovieByIdQuery,useDeleteMovieMutation}= moviesApi;

