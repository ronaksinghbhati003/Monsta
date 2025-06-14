import axios from "axios";
import Cookies from "js-cookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchBilling=createAsyncThunk(
    'billing/fetchBilling',
    async (_,thunkApi)=>{
        try{
        let token=Cookies.get('token');
        const data=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/billing/viewbillinginfo`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        const finalData=data.data;
        return finalData;
    }
    catch(error){
        console.log("Billing Detail Error", error);
        return thunkApi.rejectWithValue(error.response?.data || "Unknown Error");
    }
    }
)

let billingSlice=createSlice({
    name:"Billing Slice",
    initialState:{
        billingDetail:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchBilling.fulfilled,(state,action)=>{
            console.log(action);
            state.billingDetail=action.payload.viewBilling;
        })
        .addCase(fetchBilling.pending,(state,action)=>{
                  state.billingDetail=null;
        })
        .addCase(fetchBilling.rejected,(state,action)=>{
            state.billingDetail=null
        })
    }
})

export const {}=billingSlice.actions;
export default billingSlice.reducer;