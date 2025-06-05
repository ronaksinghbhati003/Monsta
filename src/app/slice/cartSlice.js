import { createSlice } from "@reduxjs/toolkit";

let cartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:[],
        imagePath:''
    },
    reducers:{
         cartData:function(state,action){
            console.log(action);
            state.cart=action.payload.cartData;
            state.imagePath=action.payload.imagePath
         }
    }
})

export const {cartData}=cartSlice.actions;
export default cartSlice.reducer;