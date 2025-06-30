"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { fetchCart } from "../slice/cartSlice";
import { fetchWishList } from "../slice/wishlistSlice";


export default function page() {
    let route=useRouter();
    let [wishlist, setWishlist] = useState([]);
    let [imagePath, setImagePath] = useState('');
    let token = useSelector((store) => store.loginStore.token);
    let cart=useSelector((store)=>store.cartStore.cart);
    let dispatch=useDispatch();
    let wishlistCart=useSelector((store)=>store.wishList.wishListCart);
    let wishListImagePath=useSelector((store)=>store.wishList.wishListImage);
    console.log(cart);
    /*let getDataWishList = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/viewwishlist`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                setWishlist(res.data.getData);
                setImagePath(res.data.imagePath);
            })
            .catch((err) => {
                console.log(err);
            })
    }*/

    let deleteWishList=(id)=>{
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/deletewishlist`,{
            data:{wishList:id},
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res);
            if(res.data.status==1){
                toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
                dispatch(fetchWishList())
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    let addToCart=({wishListName,wishListImage,wishListPrice,productColor,productId})=>{
        let obj={
            color:productColor?._id,
            product:{
                _id:productId,
                productSalePrice:wishListPrice,
                productName:wishListName,
                productImage:wishListImage
            } 

        }
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/addtocart`,obj,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res)=>{
                console.log(res);
                if(res.data.status==1){
                    toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
                     dispatch(fetchCart());
                }
                else{
                    toast.error(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

   useEffect(() => {
        //getDataWishList();
        if(token){
          dispatch(fetchWishList());
        }  
        else{
            setTimeout(() => {
                route.push('/login');
            }, 1500);
            toast.error("Please Login",{position:"top-center",theme:"dark"});
           
            
        }
    }, [dispatch,token])
    return (
        <>
        <ToastContainer/>
        {token? 
        <>
            <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">My Wishlist</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>My Wishlist</span></p>
                </div>
            </Container>

            <Container fluid className="py-5">
                <Container className=" p-0">
                    <Table className="w-100" border={0}>
                        <thead className="wishlist-head">
                            <tr className="text-center wishlist-head">
                                <th className="wishlist-heading-data">Delete</th>
                                <th className="wishlist-heading-data" style={{ maxWidth: '200px' }}>Image</th>
                                <th className="wishlist-heading-data" style={{ maxWidth: '250px' }}>Product</th>
                                <th className="wishlist-heading-data">Price</th>
                                <th className="wishlist-heading-data">Stock Status</th>
                                <th className="wishlist-heading-data">Add to Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wishlistCart?.length >= 1 ?
                                    wishlistCart?.map((item, index) => {
                                        let { wishListImage, wishListName, wishListPrice, wishListStock, productColor, _id,productId } = item;
                                        let check=cart?.find((item)=>item?.product?._id==productId&&item?.color?._id==productColor?._id);
                                        console.log(check);
                                        return (
                                            <tr>
                                                <td className="p-3 border-1" style={{ minHeight: '150px' }}>
                                                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '150px', }}>
                                                        <RxCross2 style={{ color: 'burlywood', fontSize: '30px',cursor:"pointer" }} onClick={() => deleteWishList(_id)} />
                                                    </div>
                                                </td>
                                                <td className="border-1" style={{ minHeight: '150px' }}>
                                                    <img src={wishListImagePath + wishListImage} width={200} height={150} className="border " />
                                                </td>
                                                <td className="p-3 border-1" style={{ minHeight: '150px' }}>
                                                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '150px', }}>
                                                        {wishListName}
                                                    </div>
                                                </td>
                                                <td className="p-3 border-1" style={{ minHeight: '150px' }}>
                                                    <div className="d-flex justify-content-center align-items-center fw-bold" style={{ minHeight: '150px', }}>
                                                        Rs. {wishListPrice}
                                                    </div>
                                                </td>
                                                <td className="p-3 border-1" style={{ minHeight: '150px' }}>
                                                    <div className="d-flex justify-content-center align-items-center fw-bold" style={{ minHeight: '150px', }}>
                                                        {wishListStock > 0 ? "In Stock" : "Out of Stock"}
                                                    </div>
                                                </td>
                                                <td className="p-3 border-1" style={{ minHeight: '150px' }}>
                                                    <div className="d-flex justify-content-center align-items-center fw-bold" style={{ minHeight: '150px', }}>
                                                        {
                                                            check?
                                                            <Link href={'/viewcart'} className="text-decoration-none">
                                                            <button className="py-2 px-4 text-white fw-bold border-0 rounded text-black" style={{ backgroundColor: "burlywood"}}>View Cart</button>
                                                            </Link>
                                                        :
                                                        <button className="py-2 px-4 text-white fw-bold border-0 rounded" style={{ backgroundColor: "burlywood" }} onClick={()=>addToCart({
                                                            wishListImage,
                                                            wishListName,
                                                            wishListPrice,
                                                            productColor,
                                                            productId
                                                        })}>Add to Cart</button>
                                                        }
                                                        
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })

                                    :
                                    <tr className="">
                                        <td colSpan={6}>
                                            <div className="d-flex justify-content-center">
                                                <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" alt="Empty Cart Image" />
                                            </div>
                                            <div style={{ color: 'burlywood' }} className="text-center fw-bold fs-5">Wishlist is Empty</div>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </Container>
            </Container>
         </>
            :<div className="login-message">Login First</div>
           }
        </>
    )
   
  }

