import Cookies from "js-cookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export let fetchWishList=createAsyncThunk(
    'wishlist/fetchWishList',
    async(_,thunkApi)=>{
        
        let token=Cookies.get('token');
        let data=await  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/viewwishlist`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let result=await data.data;
        console.log(result);
        return result;
    }
)

let wishlistSlice=createSlice({
    name:'whishListSlice',
    initialState:{
        wishListCart:[],
        wishListImage:''
    },
    reducers:{
        logOutClearWishlist:function(state,reqData){
             state.wishListCart=[];
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchWishList.fulfilled,(state,action)=>{
            console.log(action);
            state.wishListCart=action.payload.getData;
            state.wishListImage=action.payload.imagePath
        })
         .addCase(fetchWishList.pending,(state)=>{
            state.wishListCart=[];
            state.wishListImage=''
         })
         .addCase(fetchWishList.rejected,(state)=>{
            state.wishListCart=[];
            state.wishListImage=''
         })
    }
})
export const {logOutClearWishlist}=wishlistSlice.actions;
export default wishlistSlice.reducer;