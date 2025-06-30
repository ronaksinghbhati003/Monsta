'use client';
import { fetchCart } from "@/app/slice/cartSlice";
import { fetchWishList } from "@/app/slice/wishlistSlice";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
gsap.registerPlugin(ScrollTrigger);
export default function page({params}) {
    let route=useRouter();
    const id=params?.id?.[0]??'';
    const [data, setData] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [catList, setCatList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [matList, setMatList] = useState([]);
    const token=useSelector((store)=>store.loginStore.token);
    const dispatch=useDispatch();
    let [grid, setGrid] = useState(false);
    let [cartItem, setCartItem] = useState([]);
    let [material, setMaterial] = useState([]);
    let [color, setColor] = useState([]);
    let [color1, setColor1] = useState({});
    let animation = useRef(null);
    const[minValue,setMinValue]=useState(0);
    const[maxValue,setMaxValue]=useState();
    const[select,setSelect]=useState({});
    console.log(select);

    let getHighestPrice=()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cartpage/highestprice`,{
            params:{
                id
            }
        })
        .then((res)=>{
            if(res.data.status==1)
            setMaxValue(res.data.highestPrice[0].productSalePrice);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    let getData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cartpage/view`)
            .then((res) => {
                setCartItem(res.data.finalAns);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let getMaterialData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cartpage/material`)
            .then((res) => {
                setMaterial(res.data.material);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let getColor = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cartpage/color`)
            .then((res) => {
                setColor(res.data.color);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /*let getProduct = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cartpage/getproduct`, {
            params: {
                id
            }
        })
            .then((res) => {
                console.log(res);
                setData(res.data.viewProduct);
                setImagePath(res.data.imagePath);
            })
            .catch((err) => {
                console.log(err);
            })
    }*/

     let selectColor1 = (productId, colorId) => {
      setColor1((prev) => {
         return {
            ...prev,
            [productId]: color1[productId] == colorId ? '' : colorId
         }

      })
   }

   let addToCart=(productId,productName,productSalePrice,productImage)=>{
       if(token!==''){
        if(color1[productId]==''||color1[productId]==undefined){
           toast.warn("Please Select Color",{position:"top-center",theme:"dark",autoClose:1500});
           return;
        }
        let obj={
            color:color1[productId],
            product:{
                _id:productId,
                productName,
                productSalePrice,
                productImage
            }
        }
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/addtocart`,obj,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            if(res.data.status==1){
                toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
                dispatch(fetchCart());
                setColor1({});
            }
            else{
                toast.warning(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
            }
            
            
        })
        .catch((err)=>{
            console.log(err);
        })
       }
       else{
        toast.warn("Please Login First",{position:"top-center",theme:"dark",autoClose:1500})
        setTimeout(()=>{
            route.push('/login');
        },1500)
       }
   }

   let addToWishList=(productId,productName,productSalePrice,productImage,productStock)=>{
        if(token!==''){
        if(color1[productId]==''||color1[productId]==undefined){
            toast.warning("Select Color",{position:"top-center",theme:"dark",autoClose:1500});
            return;
        }
        let obj={
            color:color1[productId],
            _id:productId,
            productName,
            productImage,
            productSalePrice,
            productStock

        }
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/addwishlist`,obj,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            if(res.data.status==1){
                toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
                dispatch(fetchWishList());
                setColor1({});
            }
            else{
                toast.warning(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
            }
            
        })
        }
        else{
            toast.warn("Please Login First",{position:"top-center",theme:"dark",autoClose:1500});
            setTimeout(()=>{
            route.push('/login');
        },1500)
        }
   }

   let cartFilter=()=>{
    let obj={
        catList,
        colorList,
        matList,
        select,
        minValue,
        maxValue,
        id
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cartpage/cartfilter`,obj)
    .then((res)=>{
        if(res.data.status==1){
           console.log(res);
           setData(res.data.filterData);
           setImagePath(res.data.imagePath);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
   }

   useEffect(()=>{
        console.log("Ronak");
        cartFilter();
   },[catList,colorList,matList,select,maxValue,minValue])


    useEffect(() => {
        getData();
        getMaterialData();
        getColor();
    }, [])

    useEffect(() => {
        getHighestPrice();
        //getProduct();
    }, [id])

    useEffect(() => {
        requestAnimationFrame(() => {
            let cartAnimation = gsap.context(() => {
                gsap.from(animation.current.querySelectorAll('.animation'), {
                    y: -200,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.5,
                    scrollTrigger: {
                        trigger: animation.current,
                        start: "top 40%",
                    }
                })
            }, animation.current)


            return () => cartAnimation.revert();
        })
    }, [grid])

    return (
        <>
        <ToastContainer/>
            <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">Product Listing</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>Product Listing</span></p>
                </div>
            </Container>

            <Container fluid className="py-4 px-0">
                <Container className="px-0 py-3">
                    <Row>
                        <Col lg={3}>
                            <div>
                                <div className="cart-category-1">
                                    <h3>Categories</h3>
                                    {cartItem.map((item, index) => {
                                        let { catId, catName, subCat } = item;
                                        return (
                                            <ul className="p-0 mt-4" key={index}>
                                                <h5 className="fw-bold mb-3">{catName}</h5>
                                                {subCat.map((subItem, index) => {
                                                    return (
                                                        <ListItem data={subItem} key={index} catList={catList} setCatList={setCatList} />
                                                    )
                                                })}
                                            </ul>
                                        )
                                    })}

                                </div>


                                <div className="cart-category-2 mt-4">
                                    <h3>Materials</h3>
                                    <ul className="p-0 mt-4">
                                        {material.map((item, index) => {
                                            return (
                                                <MaterialItem data={item} key={index} matList={matList} setMatList={setMatList} />

                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className="cart-category-1 mt-4">
                                    <h3>Colors</h3>
                                    <ul className="p-0 mt-4">
                                        {color.map((item, index) => {
                                            return (
                                                <ColorItem data={item} key={index} colorList={colorList} setColorList={setColorList} />
                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <p className="fw-semibold fs-3">Price Filter</p>
                                    <div className="d-flex gap-2">
                                      <input type="number" className="priceFilter" value={minValue} onChange={(e)=>{
                                        if(e.target.value<0){
                                            return;
                                        }
                                        else{
                                        setMinValue(e.target.value);
                                        }
                                      }} />
                                      <span className="fw-bold">to</span>
                                      <input type="number" className="priceFilter" value={maxValue} onChange={(e)=>{
                                            setMaxValue(e.target.value);
                                      }} />
                                    </div>
                                </div>
                            </div>
                        </Col>


                        <Col lg={9}>
                            <div className="p-3">
                                <div className="py-4 border d-flex justify-content-lg-end">
                                    <div className="d-flex gap-5 align-items-center flex-lg-nowrap flex-wrap justify-content-lg-center justify-content-center">
                                        <TbGridDots style={{cursor:'pointer'}} onClick={() => setGrid(!grid)} />
                                        <p style={{ position: 'relative', top: "8px" }}>Sort By :</p>
                                        <select className="cart-select-box"  onChange={(e)=>{
                                            const data=e.target.selectedOptions[0];
                                            const finalData=data.getAttribute("data-name");
                                            if(e.target.value=="clear"){
                                                setSelect({});
                                            }
                                            setSelect((prev)=>{
                                                const newObj={...prev};
                                                if(finalData=="featured"){
                                                    newObj[finalData]=e.target.value;
                                                }
                                                else if(finalData=="lowToHigh"){
                                                    newObj[finalData]=e.target.value
                                                }
                                                else if(finalData=="ascending"){
                                                    newObj[finalData]=e.target.value;
                                                }
                                                else if(newObj.hasOwnProperty(finalData)){
                                                     delete newObj[finalData];
                                                }
                                                else{
                                                    newObj[finalData]=e.target.value
                                                }

                                                return newObj;
                                            })
                                            
                                        }}>
                                            <option value="clear">Clear Filter</option>
                                            <option style={{color:select["featured"]=='0'?'red':'black'}} value={0} data-name="featured">Featured Product</option>
                                            <option style={{color:select["featured"]=='1'?'red':'black'}} value={1} data-name="featured">New Arrivals</option>
                                            <option style={{color:select["featured"]=='2'?'red':'black'}} value={2} data-name="featured">On Sale</option>
                                            <option style={{color:select["bestSelling"]=='true'?'red':'black'}} value={true} data-name="bestSelling">Best Sellings</option>
                                            <option style={{color:select["lowToHigh"]=='1'?'red':'black'}} value={1} data-name="lowToHigh">Sort by price : Low to high</option>
                                            <option style={{color:select["lowToHigh"]=='-1'?'red':'black'}} value={-1} data-name="lowToHigh">Sort by price : High to low</option>
                                            <option style={{color:select["ascending"]=='1'?'red':'black'}} value={1} data-name="ascending">Product name : A to Z</option>
                                            <option style={{color:select["ascending"]=='-1'?'red':'black'}} value={-1} data-name="ascending">Product name : Z to A</option>
                                        </select>
                                        <p style={{ position: 'relative', top: "8px" }}>Showing 1-1 of 1 results</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Row className="g-4" ref={animation}>
                                        {
                                            data.length > 0 ?
                                                data.map((item, index) => {
                                                    let { productActualPrice, productColor, productImage, productName, productSalePrice, productStock, subSubCategory, _id } = item;
                                                    return (
                                                        <Col lg={grid ? 6 : 4} className="animation" key={index}>
                                                            <div>
                                                                <Card className="shadow-lg">
                                                                    <Card.Img variant="top" src={imagePath + productImage} height={300} />
                                                                    <Card.Body>
                                                                        <Card.Title className="text-center border-bottom">
                                                                            <p className="fs-6">{subSubCategory?.subSubCategoryName}</p>
                                                                            <p className="fw-bold">{productName}</p>
                                                                        </Card.Title>
                                                                        <Card.Text className="justify-content-center d-flex gap-3">
                                                                            <span className="fw-bold"><s>Rs.{productActualPrice}</s></span><span style={{ fontSize: '18px', color: 'burlywood', fontWeight: 'bold' }}>Rs.{productSalePrice}</span>
                                                                        </Card.Text>
                                                                        <div className="d-flex justify-content-center gap-3 flex-wrap mt-3 mb-3">
                                                                            {productColor?.map((colorItem, index) => {
                                                                                let { _id, colorName, colorCode } = colorItem
                                                                                return (
                                                                                    <button key={index} className="px-3 py-1 rounded button"
                                                                                        onClick={() => selectColor1(item._id, _id)}
                                                                                        style={{ background: color1[item._id] == _id ? colorCode : '', color: color1[item._id] == _id ? "white" : "black" }}
                                                                                    >
                                                                                        {colorName}
                                                                                    </button>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                                                            <div className="featured-heart" onClick={()=>addToWishList(item._id,productName,productSalePrice,productImage,productStock)}>
                                                                                <CiHeart />
                                                                            </div>
                                                                            <div className="featured-addtocart" onClick={()=>addToCart(item._id,productName,productSalePrice,productImage)}>
                                                                                Add To Cart
                                                                            </div>
                                                                        </div>
                                                                    </Card.Body>
                                                                </Card>
                                                            </div>
                                                        </Col>

                                                    )
                                                })
                                                :
                                                <>
                                                    <div className="d-flex justify-content-center">
                                                        <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" alt="Empty Cart Image" />
                                                    </div>
                                                    <div style={{ color: 'burlywood' }} className="text-center fw-bold fs-5">No Product Found</div>
                                                </>
                                        }
                                    </Row>



                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>

            </Container>

        </>
    )
}

const ListItem = ({ data, catList, setCatList }) => {

    let { subCategoryName, _id } = data;
    return (
        <>
            <li className="d-flex gap-3 align-items-center mt-3">
                <input type="checkbox" className="cart-checkbox" checked={catList.includes(_id)} value={_id} onChange={(e) => {
                    if (e.target.checked) {
                        setCatList((prev) => (
                            [...prev, e.target.value]
                        ))
                    }
                    else {
                        setCatList((prev) => {
                            return prev.filter((item) => item != e.target.value);
                        })
                    }
                }} />
                <div>{subCategoryName}</div>
            </li>

        </>

    )
}

const MaterialItem = ({ data, matList, setMatList }) => {

    let { materialName, _id } = data;
    return (
        <>
            <li className="d-flex gap-3 align-items-center mt-3">
                <input type="checkbox" className="cart-checkbox" checked={matList.includes(_id)} value={_id} onChange={(e) => {
                    if (e.target.checked) {
                        setMatList((prev) => {
                            return [...prev, e.target.value]
                        })
                    }
                    else {
                        setMatList((prev) => {
                            return prev.filter((item) => item != e.target.value)
                        })
                    }
                }} />
                <div>{materialName}</div>
            </li>

        </>

    )
}

const ColorItem = ({ data, colorList, setColorList }) => {
    let { colorName, colorCode, _id } = data;
    return (
        <>
            <li className="d-flex gap-3 align-items-center mt-3">
                <input type="checkbox" className="cart-checkbox" checked={colorList.includes(_id)} value={_id} onChange={(e) => {
                    if (e.target.checked) {
                        setColorList((prev) => {
                            return [...prev, e.target.value]
                        })
                    }
                    else {
                        setColorList((prev) => {
                            return prev.filter((item) => item != e.target.value)
                        })
                    }
                }} />
                <input type="color" className="cart-checkbox" value={colorCode} disabled />
                <div>{colorName}</div>
            </li>

        </>

    )
}



{/* <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li> <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li>
                                <li className="d-flex gap-3 align-items-center mt-3">
                                    <input type="checkbox" className="cart-checkbox"/>
                                    <div>Side and End Tables</div>
                                </li> */}