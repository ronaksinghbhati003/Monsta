import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { fetchCart } from "../slice/cartSlice";
import { fetchWishList } from "../slice/wishlistSlice";
export default function RelatedProduct({ related, parentId }) {
   let route = useRouter();
   let token = useSelector((store) => store.loginStore.token);
   let dispatch = useDispatch();
   let [data, setData] = useState([]);
   let [imagePath, setImagePath] = useState('');
   let [color, setColor] = useState({});

   let settings = {
      dots: false,
      infinite: data.length > 1,
      speed: 500,
      slidesToShow: data.length < 5 ? data.length : 5,
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

   let getRelatedData = () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/relatedproduct/getdata`, {
         params: {
            id: related
         }
      })
         .then((res) => {
            setData((prev) => (
               res.data.findRealted.filter((item) => item._id != parentId)
            ))
            setImagePath(res.data.imagePath);

         })
         .catch((err) => {
            console.log(err);
         })
   }

   let selectColor = (productId, colorId) => {
      setColor((prev) => {
         return {
            ...prev,
            [productId]: color[productId] == colorId ? '' : colorId
         }

      })
   }

   let addToCart = (productId, productName, productSalePrice, productImage) => {
      if (token !== '') {
         if (color[productId] == "" || color[productId] == undefined) {
            toast.error("Please Select Color", { position: "top-center", theme: "dark", autoClose: 1500 })
            return;
         }
         let obj = {
            color: color[productId],
            product: {
               _id: productId,
               productName,
               productSalePrice,
               productImage
            }
         }
         axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/addtocart`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
            .then((res) => {
               if (res.data.status == 1) {
                  toast.success(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 })
                  setColor({});
                  dispatch(fetchCart());
               }
               else {
                  toast.warn(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 })
               }
            })
      }
      else {
         toast.warning("Please Login", { position: "top-center", theme: "dark", autoClose: 1500 });
         setTimeout(() => {
            route.push('/login')
         }, 2000)

      }
   }

   let addToWishList = (productId, productImage, productSalePrice, productName, productStock) => {
      if (token !== '') {
         if (color[productId] == '' || color[productId] == undefined) {
            toast.warn("Please Select Color", { position: "top-center", theme: "dark", autoClose: 1500 })
            return;
         }
         let obj = {
            color: color[productId],
            _id: productId,
            productImage,
            productSalePrice,
            productName,
            productStock
         }
         axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/addwishlist`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
            .then((res) => {
               if (res.data.status == 1) {
                  toast.success(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 });
                  setColor({});
                  dispatch(fetchWishList());
               }
               else {
                  toast.warn(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 });
               }
            })
      }
      else {
         toast.error("Please Login", { position: "top-center", theme: "dark", autoClose: 1500 });
         setTimeout(() => {
            route.push('/login')
         }, 2000)
      }

   }

   useEffect(() => {
      if (related) {
         getRelatedData();
      }
   }, [related]);

   return (
      <Container fluid className="py-4 border">
         <Container className="bestselling-product-container py-4">
            <div className="d-flex justify-content-between bestselling-product">
               <h2>Realted Product</h2>
            </div>


            <div className="bestselling-product-slider">

               <Slider {...settings}>
                  {data.map((item, index) => {
                     let { productActualPrice, productColor, productImage, productName, productSalePrice, subSubCategory, _id, productStock } = item;
                     return (
                        <div className="bestselling-product-slider-item" key={index}>
                           <Card className="slider-products">
                              <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                                 <Card.Img variant="top" src={imagePath + productImage} height={300} />
                              </Link>
                              <Card.Body>
                                 <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                                    <Card.Title className="text-center border-bottom">
                                       <p className="fs-6" style={{ color: 'black', fontWeight: 'bold' }}>{subSubCategory?.subSubCategoryName}</p>
                                       <p className="fw-bold" style={{ color: 'burlywood' }}>{productName}</p>
                                    </Card.Title>
                                 </Link>
                                 <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                                    <Card.Text className="justify-content-center d-flex gap-3">
                                       <span className="fw-bold"><s style={{ color: 'black' }}>Rs.{productActualPrice}</s></span><span style={{ fontSize: '18px', color: 'burlywood', fontWeight: 'bold' }}>Rs.{productSalePrice}</span>
                                    </Card.Text>
                                 </Link>
                                 <div className="d-flex justify-content-center gap-3 flex-wrap mt-3 mb-3">
                                    {productColor?.map((colorItem, index) => {
                                       let { _id, colorName, colorCode } = colorItem
                                       return (
                                          <button className="px-3 py-1 rounded button" onClick={() => selectColor(item._id, _id)}
                                             style={{ background: color[item._id] == _id ? colorCode : '', color: color[item._id] == _id ? "white" : "black" }}
                                          >
                                             {colorName}
                                          </button>
                                       )
                                    })}
                                 </div>
                                 <div className="d-flex justify-content-center align-items-center gap-2">
                                    <div className="featured-heart" onClick={() => addToWishList(item._id, productImage, productSalePrice, productName, productStock)}>
                                       <CiHeart />
                                    </div>

                                    <div className="featured-addtocart" onClick={() => addToCart(
                                       item?._id,
                                       productName,
                                       productSalePrice,
                                       productImage
                                    )}>
                                       Add To Cart
                                    </div>


                                 </div>
                              </Card.Body>
                           </Card>
                        </div>
                     )
                  })}
               </Slider>

            </div>
         </Container>
      </Container>
   )
}
