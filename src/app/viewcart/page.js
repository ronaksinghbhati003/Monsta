"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useRemoveCart from "../helper/removeCart.js";
import { customQuantity, fetchCart, updateCart } from "../slice/cartSlice";

export default function ViewCart() {
    let removeCart=useRemoveCart();
    let dispatch=useDispatch();
    let cart=useSelector((store)=>store.cartStore.cart);
    let imagePath=useSelector((store)=>store.cartStore.imagePath);
    let subTotal=cart.reduce((acc,item)=>acc+(item.product.productSalePrice*item.quantity),0);
    let shipping=0;
    let total=subTotal+shipping;
    let[customQyt,setCustomQyt]=useState({});
     let quantityIncrease=(value,id)=>{
        let item=cart.find(item=>item._id==id);
        if(value=="minus"&&item.quantity<=1){
            return;
        }
        dispatch(updateCart({value,id}));
         axios.put(`${process.env.NEXT_PUBLIC_API_URL}/cart/updatequantity`,{
            value,
            id
         })
        .then(res=>{
            //dispatch(fetchCart());
        })
        .catch(err=>{
            console.log(err);
        })
     }


    useEffect(()=>{
       let obj={};
        cart.forEach(item=>{
            obj[item._id]=item.quantity;
        })
        setCustomQyt(obj);
        
    },[cart])

   /* useEffect(()=>{
        dispatch(customQuantity(customQyt))
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/customcart`,{
            customQyt
        })
        .then((res)=>{
            console.log(res);
            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[customQyt])*/
    
    let handleSubmit= async (id,value)=>{
        const numericValue=parseInt(value);
        setCustomQyt(prev=>({...prev,[id]:value}));
        if(!isNaN(numericValue)){
         dispatch(customQuantity({[id]:numericValue}));
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/customcart`,{
            id,
            value:numericValue
        })
        .then((res)=>{
            console.log(res);
            
        })
        .catch((err)=>{
            console.log(err);
        })
      }
    }

    useEffect(()=>{
         dispatch(fetchCart());
    },[dispatch])
  return (
     <>
     <ToastContainer/>
      <Container fluid className="py-3">
         <Container className=" py-2">
            <Row>
                <Col lg={8}>
                 <table className="view-cart-table" >
                    <thead>
                        <tr>
                            <th className="view-cart-table-heading">Sr.No</th>
                            <th className="view-cart-table-heading">Product Image</th>
                            <th className="view-cart-table-heading">Product Name</th>
                            <th className="view-cart-table-heading">Price</th>
                            <th className="view-cart-table-heading">Color</th>
                            <th className="view-cart-table-heading">Quantity</th>
                            <th className="view-cart-table-heading">SubTotal</th>
                            <th className="view-cart-table-heading">Remove Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length!=0?
                          cart.map((item,index)=>{
                            let{color,product,quantity,_id}=item;
                            return(
                            <tr key={index}>
                                     <td className="view-cart-table-body">{index+1}</td>
                                     <td className="view-cart-table-body">
                                         <img src={imagePath+product.productImage}  width={150} height={100}/>
                                     </td>
                                     <td className="view-cart-table-body">
                                         {product.productName}
                                     </td>
                                     <td className="view-cart-table-body">{product.productSalePrice}</td>
                                     <td className="view-cart-table-body">
                                        <input type="color" disabled value={color.colorCode} style={{width:'30px',height:'30px'}} />
                                     </td>
                                     <td className="view-cart-table-body">
                                        <div className="d-flex gap-2">
                                            <span style={{cursor:'pointer'}} onClick={()=>quantityIncrease("minus",_id)}>-</span>
                                            <input type="text" style={{width:'30px',textAlign:'center'}} value={customQyt[_id]}  onChange={(e)=>{
                                                handleSubmit(_id,e.target.value)
                                            }}/>
                                            <span style={{cursor:'pointer'}} onClick={()=>quantityIncrease("plus",_id)}>+</span>
                                        </div>
                                     </td>
                                     <td className="view-cart-table-body">{product.productSalePrice*quantity}</td>
                                     <td className="view-cart-table-body">
                                         <button className="view-cart-table-button" onClick={()=>removeCart(_id)}>Remove</button>
                                     </td>
                             </tr>
                            )
                          })
                          :
                           <tr className="">
                            <td colSpan={8}>
                                <div className="d-flex justify-content-center">
                                <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" alt="Empty Cart Image"/>
                                </div>
                                <div style={{color:'burlywood'}} className="text-center fw-bold fs-5">Cart is Empty</div>
                            </td>
                           </tr>
                         } 
                        
                    </tbody>
                 </table>
                 </Col>
                 <Col>
                    <div className="p-3 border border-1 border-dark rounded-2 mt-3 mt-lg-0">
                        <h3 style={{color:'burlywood'}}>Cart Summary</h3>
                        <div className="d-flex justify-content-between mt-3">
                            <p style={{fontSize:'18px'}}>Sub Total</p>
                            <p style={{fontSize:'18px'}}>Rs: {subTotal}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p style={{fontSize:'18px'}}>Shipping</p>
                            <p style={{fontSize:'18px'}}>Free</p>
                        </div>
                         <div className="d-flex justify-content-between">
                            <p style={{fontSize:'18px'}} className="fw-bold">Total</p>
                            <p style={{fontSize:'18px'}} className="fw-bold">Rs: {total}</p>
                        </div>
                        <div>
                            <Link href={'/checkout'}><button className="w-100 rounded-2 py-1 fw-bold " style={{background:'burlywood',color:'white'}}>Proceed to Checkout</button></Link>
                            <Link href={'/'}><button className="w-100 rounded-2 py-1 fw-bold mt-2 ">Continue shoping</button></Link>
                        </div>
                    </div>
                 </Col>
                </Row>
          </Container>
      </Container>
     </>
  )
}
