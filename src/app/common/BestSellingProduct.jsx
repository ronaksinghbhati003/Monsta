import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { fetchCart } from "../slice/cartSlice";
import { fetchWishList } from "../slice/wishlistSlice";
export default function BestSellingProduct({ product, staticPath }) {
   let apiUrl = process.env.NEXT_PUBLIC_API_URL;
   let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: product.length < 5 ? product.length : 5,
      slidesToScroll: 1,
      arrows: true,
      overflosw: false,
      responsive: [
         {
            breakpoint: 1400,
            settings: {
               slidesToShow: 5,
               slidesToScroll: 1,
               infinite: true,
            }
         },
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         },
         {
            breakpoint: 0,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   };
   return (
      <>
         
         <Container fluid className="py-4 border">
            <Container className="bestselling-product-container py-4">
               <div className="d-flex justify-content-between bestselling-product">
                  <h2>BestSelling Products</h2>
               </div>


               <div className="bestselling-product-slider">

                  <Slider {...settings}>


                     {product.length >= 1 &&

                        product.map((item, index) => {

                           return (

                              <CardComponent item={item} staticPath={staticPath} key={index} apiUrl={apiUrl} />

                           )
                        })

                     }
                     {/*<div className="bestselling-product-slider-item">
                  <Card className="slider-products">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828789760Rex%20Console%20Table__.jpg" />
                            <Card.Body>
                              <Card.Title className="text-center border-bottom">
                                   <p className="fs-6">Nest of Tables</p>
                                   <p className="fw-bold">Caroline Study Tables</p>
                              </Card.Title>
                              <Card.Text className="justify-content-center d-flex gap-3">
                                     <span className="fw-bold"><s>Rs.3000</s></span><span style={{fontSize:'18px',color:'burlywood',fontWeight:'bold'}}>Rs.2500</span>
                              </Card.Text>
                               <div className="d-flex justify-content-center align-items-center gap-2">
                                <div className="featured-heart">
                                    <CiHeart/>
                                </div>
                                 <div className="featured-addtocart">
                                    Add To Cart
                                 </div>
                               </div>
                            </Card.Body>
                     </Card>
               </div>
                  
               <div className="bestselling-product-slider-item">
                  <Card className="slider-products">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg" />
                            <Card.Body>
                              <Card.Title className="text-center border-bottom">
                                   <p className="fs-6">Nest of Tables</p>
                                   <p className="fw-bold">Caroline Study Tables</p>
                              </Card.Title>
                              <Card.Text className="justify-content-center d-flex gap-3">
                                     <span className="fw-bold"><s>Rs.3000</s></span><span style={{fontSize:'18px',color:'burlywood',fontWeight:'bold'}}>Rs.2500</span>
                              </Card.Text>
                               <div className="d-flex justify-content-center align-items-center gap-2">
                                <div className="featured-heart">
                                    <CiHeart/>
                                </div>
                                 <div className="featured-addtocart">
                                    Add To Cart
                                 </div>
                               </div>
                            </Card.Body>
                          </Card>
                  </div>


               <div className="bestselling-product-slider-item">
                  <Card className="slider-products">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828789760Rex%20Console%20Table__.jpg" />
                            <Card.Body>
                              <Card.Title className="text-center border-bottom">
                                   <p className="fs-6">Nest of Tables</p>
                                   <p className="fw-bold">Caroline Study Tables</p>
                              </Card.Title>
                              <Card.Text className="justify-content-center d-flex gap-3">
                                     <span className="fw-bold"><s>Rs.3000</s></span><span style={{fontSize:'18px',color:'burlywood',fontWeight:'bold'}}>Rs.2500</span>
                              </Card.Text>
                               <div className="d-flex justify-content-center align-items-center gap-2">
                                <div className="featured-heart">
                                    <CiHeart/>
                                </div>
                                 <div className="featured-addtocart">
                                    Add To Cart
                                 </div>
                               </div>
                            </Card.Body>
                          </Card>
                  </div>


               <div className="bestselling-product-slider-item">
                  <Card className="slider-products"  >
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828789760Rex%20Console%20Table__.jpg" />
                            <Card.Body>
                              <Card.Title className="text-center border-bottom">
                                   <p className="fs-6">Nest of Tables</p>
                                   <p className="fw-bold">Caroline Study Tables</p>
                              </Card.Title>
                              <Card.Text className="justify-content-center d-flex gap-3">
                                     <span className="fw-bold"><s>Rs.3000</s></span><span style={{fontSize:'18px',color:'burlywood',fontWeight:'bold'}}>Rs.2500</span>
                              </Card.Text>
                               <div className="d-flex justify-content-center align-items-center gap-2">
                                <div className="featured-heart">
                                    <CiHeart/>
                                </div>
                                 <div className="featured-addtocart">
                                    Add To Cart
                                 </div>
                               </div>
                            </Card.Body>
                          </Card>
                  </div>


               <div className="bestselling-product-slider-item">
                  <Card className="slider-products" >
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828789760Rex%20Console%20Table__.jpg" />
                            <Card.Body>
                              <Card.Title className="text-center border-bottom">
                                   <p className="fs-6">Nest of Tables</p>
                                   <p className="fw-bold">Caroline Study Tables</p>
                              </Card.Title>
                              <Card.Text className="justify-content-center d-flex gap-3">
                                     <span className="fw-bold"><s>Rs.3000</s></span><span style={{fontSize:'18px',color:'burlywood',fontWeight:'bold'}}>Rs.2500</span>
                              </Card.Text>
                               <div className="d-flex justify-content-center align-items-center gap-2">
                                <div className="featured-heart">
                                    <CiHeart/>
                                </div>
                                 <div className="featured-addtocart">
                                    Add To Cart
                                 </div>
                               </div>
                            </Card.Body>
                          </Card>
                  </div>


               <div className="bestselling-product-slider-item">
                  <Card   className="slider-products">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828789760Rex%20Console%20Table__.jpg" />
                            <Card.Body>
                              <Card.Title className="text-center border-bottom">
                                   <p className="fs-6">Nest of Tables</p>
                                   <p className="fw-bold">Caroline Study Tables</p>
                              </Card.Title>
                              <Card.Text className="justify-content-center d-flex gap-3">
                                     <span className="fw-bold"><s>Rs.3000</s></span><span style={{fontSize:'18px',color:'burlywood',fontWeight:'bold'}}>Rs.2500</span>
                              </Card.Text>
                               <div className="d-flex justify-content-center align-items-center gap-2">
                                <div className="featured-heart">
                                    <CiHeart/>
                                </div>
                                 <div className="featured-addtocart">
                                    Add To Cart
                                 </div>
                               </div>
                            </Card.Body>
                          </Card>
                  </div>*/}
                  </Slider>

               </div>
            </Container>
         </Container>
      </>
   )
}


function CardComponent({ item, staticPath, apiUrl }) {
    let router=useRouter();
   let [color, setColor] = useState('');
   let colorRef = useRef([]);
   let token = useSelector((store) => {
      return store.loginStore.token
   })
   let dispatch = useDispatch();
   let { productActualPrice, productImage, productName, productSalePrice, subSubCategory, _id, productColor,productStock } = item;

   let homePage = () => {
      redirect('/login');
   }


   let addToCart = () => {
      if (token != '') {
         let obj = {
            color,
            product: {
               _id,
               productSalePrice,
               productName,
               productImage,
            }
         }
         axios.post(`${apiUrl}/cart/addtocart`, obj, {
            headers: {
               Authorization: `Bearer ${token}`,
            }
         })
            .then((res) => {
               if (res.data.status) {
                  toast.success(res.data.msg, {
                     position: "top-center",
                     theme: "dark",
                     autoClose: 1500
                  })
                  dispatch(fetchCart());
               }
               else {
                  toast.error(res.data.msg, {
                     position: "top-center",
                     theme: "dark",
                     autoClose: 1500
                  })
               }
            })
            .catch((err) => {
               console.log(err);
            })
      }
      else {
         toast.error("Please Login", {
            position: "top-center",
            theme: "dark",
            autoClose: 1500,
            fontSize: 40
         })

         setTimeout(homePage, 2000);
      }
   }

   let addToWishList=()=>{
      if(color){
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/addwishlist`,{
         _id,
         productName,
         productSalePrice,
         productImage,
         productStock,
         color
      },{
         headers:{
            Authorization:`Bearer ${token}`
         }
      })
      .then((res)=>{
         if(res.data.status==1){
            toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
            dispatch(fetchWishList());
         }
         else if(res.data.status==2){
            toast.warn(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
         }
         else{
            toast.error("Please Login First",{position:"top-center",theme:"dark",autoClose:1500});
            setTimeout(()=>{
               router.push('/login');
            },2000)
            
         }
      })
      .catch((err)=>{
         console.log(err);
      })
     }
     else{
      toast.warn("Please Select Color",{position:"top-center",theme:"dark",autoClose:1500})
     }
   }


   let selectColor = (id, code, index) => {
      if (!color) {
         setColor(id);
         colorRef.current.forEach((item, i) => {
            if (i == index) {
               item.style.color = "white";
            }
         })
      }
      else {
         setColor('');
         colorRef.current.forEach((item, i) => {
            item.style.color = "black";
         })
      }
   }
     
   return (
      <>

         <div className="bestselling-product-slider-item">

            <Card className="slider-products">

               <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                  <Card.Img variant="top" src={staticPath + productImage} height={200} />
               </Link>
               <Card.Body>
                  <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                     <Card.Title className="text-center border-bottom">
                        <p className="fs-6 remove-decoration">{subSubCategory.subSubCategoryName}</p>
                        <p className="fw-bold remove-decoration">{productName}</p>
                     </Card.Title>
                  </Link>

                  <Card.Text className="justify-content-center d-flex gap-3">
                     <span className="fw-bold"><s>Rs: {productActualPrice}</s></span><span style={{ fontSize: '18px', color: 'burlywood', fontWeight: 'bold' }}>Rs: {productSalePrice}</span>
                  </Card.Text>
                  <div className={`my-3 d-flex  gap-3 product-color ${productColor.length<=2?'justify-content-center':''}`}>
                     {productColor.map((item, index) => {
                        let { colorName, _id, colorCode } = item;
                        return (
                           <button ref={(el) => (colorRef.current[index] = el)} className={`py-2 px-3 rounded-2 button`} style={{ background: `${color.includes(_id) ? colorCode : "transparent"}` }} key={index} onClick={() => selectColor(_id, colorCode, index)}>{colorName}</button>
                        )
                     })}

                  </div>

                  <div className="d-flex justify-content-center align-items-center gap-2">
                     <div className="featured-heart">
                        <CiHeart onClick={addToWishList} />
                     </div>
                     <div className="featured-addtocart" onClick={addToCart}>
                        Add To Cart
                     </div>
                  </div>
               </Card.Body>
            </Card>

         </div>
      </>
   )
}
