import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User  {
    userId:string,
    username:string,
    role:string
}
export interface authState {
    user:User | null,
    token:string | null
}

const initialState:authState={
    user:null,
    token:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state,action:PayloadAction<authState>)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
        }
    }
})

export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;