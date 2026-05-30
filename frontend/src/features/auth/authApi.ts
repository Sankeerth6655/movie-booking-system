import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginSuccess } from "./authSlice";

//login request
interface LoginRequest {
    username:string,
    password:string
}

//login response
interface User{
    userId:string,
    username:string,
    role:string
}
interface LoginResponse{
    user:User;
    token:string;
}
//register request
interface RegisterRequest {
    username:string,
    password:string,
    role:string
}
// regiseter response
interface RegisterResponse {
    username:string,
    password:string,
    role:string
}

const API = import.meta.env.VITE_BACKEND_URL;

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${API}`,
    }),
    endpoints:(builder)=>({
        login: builder.mutation<LoginResponse,LoginRequest>({
            query:(credentials)=>({
                url:'/auth/login',
                method:"POST",
                body:credentials
            }),

            async onQueryStarted(_arg,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('user',JSON.stringify(data.user));
                    dispatch(loginSuccess(data));
                } catch (error:any) {
                    throw new Error("Login query error",error);
                }
            }
        }),

        register: builder.mutation<RegisterRequest,RegisterResponse>({
            query:(credentials)=>({
                url:'/auth/register',
                method:'POST',
                body:credentials
            }),
        })

    })
})

export const {useLoginMutation,useRegisterMutation} = authApi;