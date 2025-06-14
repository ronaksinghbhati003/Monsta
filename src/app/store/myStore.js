import { configureStore } from "@reduxjs/toolkit";
import billingSlice from '../slice/billingSlice.js';
import cartSlice from '../slice/cartSlice.js';
import logInSlice from '../slice/loginSlice.js';
let myStore=configureStore({
    reducer:{
       loginStore:logInSlice,
       cartStore:cartSlice,
       billingStore:billingSlice
     }
  
})

export default myStore;
