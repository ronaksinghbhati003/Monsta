import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../slice/cartSlice.js';
import logInSlice from '../slice/loginSlice.js';
let myStore=configureStore({
    reducer:{
       loginStore:logInSlice,
       cartStore:cartSlice
     }
  
})

export default myStore;
