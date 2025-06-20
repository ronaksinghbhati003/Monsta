import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export let fetchCart=createAsyncThunk(
  'cart/fetchCart',
  async(_,thunkAPI)=>{
    const token=Cookies.get('token');
    const data=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/viewcart`,{},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const finalData=await data.data;
    return finalData;
  }
)



let cartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:[],
        imagePath:''
    },
    reducers:{
         /*cartData:function(state,action){
            console.log(action);
            state.cart=action.payload.cartData;
            state.imagePath=action.payload.imagePath
         }*/
        updateCart:function(state,reqData){
          console.log("Update cart",reqData);
            let{value,id}=reqData.payload;
            let item=state.cart.find(item=>item._id==id);
            if(value=="plus"){
              item.quantity+=1;
            }
            else if(value=="minus"&&item.quantity>1){
               item.quantity-=1;
            }
            /*else{
              item.quantity=1;
            }*/
        },

        customQuantity:function(state,reqData){
             let values=Object.entries(reqData.payload);
             console.log(values);
             values.forEach((item)=>{
              let qyt=state.cart.find(value=>value._id==item[0]);
              if(qyt){
                if(item[1]!=NaN);
                {
                  qyt.quantity=parseInt(item[1]);
                }  
              }
             })
        },

        deleteCart:function(state,reqData){
              let id =reqData.payload;
              if(id){
                state.cart=state.cart.filter((item)=>item._id!=id);
              }
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(fetchCart.fulfilled,(state,action)=>{
                console.log(action);
                 state.cart=action.payload.viewCart;
                 state.imagePath=action.payload.staticPath;
            })
            .addCase(fetchCart.pending,(state,action)=>{
                state.cart=[];
                state.imagePath='';
            })
            .addCase(fetchCart.rejected,(state,action)=>{
                console.log("Error",action.payload);
            })
     }
})

export const {updateCart,customQuantity,deleteCart}=cartSlice.actions;
export default cartSlice.reducer;