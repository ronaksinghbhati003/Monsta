import { toast } from "react-toastify";

import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteCart } from "../slice/cartSlice";


 const useRemoveCart=()=>{
    let dispatch=useDispatch();

    let removeCart=(id)=>{
         dispatch(deleteCart(id))
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/removecart/${id}`)
        .then((res)=>{
            toast.success(res.data.msg,{
                position:"top-center",
                theme:"dark",
                autoClose:1500
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return removeCart;
             
    }

    export default useRemoveCart;