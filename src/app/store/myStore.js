import { configureStore } from "@reduxjs/toolkit";
import billingSlice from '../slice/billingSlice.js';
import cartSlice from '../slice/cartSlice.js';
import logInSlice from '../slice/loginSlice.js';
import wishListReducer from '../slice/wishlistSlice.js';
let myStore=configureStore({
    reducer:{
       loginStore:logInSlice,
       cartStore:cartSlice,
       billingStore:billingSlice,
       wishList:wishListReducer
     }
  
})

export default myStore;
