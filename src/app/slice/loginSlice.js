import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let logInSlice=createSlice({
   name:"loginSlice",
   initialState:{
     user:Cookies.get("user")?JSON.parse(Cookies.get("user")):null,
     token:Cookies.get('token')??''
   } ,
   reducers:{
    logInUser:function(state,reqData){
        console.log(reqData);
        state.user=reqData.payload.userData
        state.token=reqData.payload.token
        Cookies.set('user',JSON.stringify(state.user));
        Cookies.set('token',state.token);
    },
    logOut:function(state,reqData){
        Cookies.remove('user');
        Cookies.remove('token');
        state.token='';
        state.user=null;
    }
   } 
})

export const {logInUser,logOut} =logInSlice.actions;
export default logInSlice.reducer;
