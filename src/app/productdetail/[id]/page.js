'use client';
import RelatedProduct from "@/app/common/RelatedProduct";
import UpSellProduct from "@/app/common/UpSellProduct";
import { fetchCart, updateCart } from "@/app/slice/cartSlice";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";

//"https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg"
function NextArrow(prop) {
  const { className, style, onClick } = prop;
  return (
    <div className={className} style={{
      ...style,
      backgroundColor: 'red',
      color: 'white',
      top: "50%"
    }}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight style={{ fontSize: '30px', backgroundColor: 'black', position: 'relative', top: "-140%" }} />
    </div>
  )
}

function PreArrow(prop) {
  const { className, style, onClick } = prop;
  return (
    <div className={className} style={{
      ...style,
      backgroundColor: 'red',
      color: 'white',
      left: '-2%',
      top: '50%',
      zIndex: '10'
    }}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft style={{ fontSize: '30px', backgroundColor: 'black', position: 'relative', top: "-140%" }} />
    </div>
  )
}
export default function page() {
  let[check,setCheck]=useState('');
  let img = useRef(null);
  let { id } = useParams();
  let [detail, setDetail] = useState(null);
  let [imagePath, setImagepath] = useState('');
  let[color,setColor]=useState('');
  let[qyt,setQyt]=useState(0);
  //console.log(imagePath);
  //console.log(detail);
  //console.log(color);
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let token=useSelector((store)=>store.loginStore.token);
  let cart=useSelector((store)=>store.cartStore.cart)
  let dispatch=useDispatch();

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PreArrow />
  };

  let getData = () => {
    axios.get(`${apiUrl}/home/productdetail/${id}`)
      .then((res) => {
        setDetail(res.data.productDetail);
        setImagepath(res.data.staticPath);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let addToCart=()=>{
    let obj={
      color,
      product:{
        _id:detail?._id,
        productName:detail?.productName,
        productSalePrice:detail?.productSalePrice,
        productImage:detail?.productImage
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
      }
      else{
        toast.warning(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
      }
      dispatch(fetchCart());
     })
     .catch((err)=>{
      console.log(err);
     })
  }

  let quantityIncrease=(value,id)=>{
      let item=cart.find(item=>item._id==id);
      if(value=="minus"&&item?.quantity<=1){
        return;
      }
      dispatch(updateCart({value,id}));
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/cart/updatequantity`,{
         value,
         id
      })
      .then((res)=>{
        if(res.data.status==1){
          toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
        }
      })
  }


  useEffect(() => {
    img.current.addEventListener("mousemove", (e) => {
      let x = (e.offsetX * 100 / img.current.offsetWidth);
      let y = (e.offsetY * 100 / img.current.offsetHeight);
      img.current.style.setProperty('--x', x + '%');
      img.current.style.setProperty('--y', y + '%');
    })
    getData();
  }, [])

  useEffect(()=>{
    let check=cart.find((item)=>item?.product?._id==detail?._id);
    setCheck(check);
    setQyt(check?.quantity);
  },[detail,cart])


  return (
    <>
    <ToastContainer/>
      <Container fluid className="border-bottom py-5 px-0 mb-5">
        <div>
          <h2 className="text-center">{detail?.productName}</h2>
          <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span>{detail?.subCategory?.subCategoryName}</span> &gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>{detail?.productName}</span></p>
        </div>
      </Container>

      <Container fluid className="py-4">
        <Container className="p-0">
          <Row className="g-5">
            <Col lg={6} className="p-0">
              <div ref={img} className="imgZoom" style={{
                '--url': `url("${imagePath+detail?.productImage}")`,
                '--x': 0,
                '--y': 0
              }}>
                <img src={imagePath+detail?.productImage} height={500}/>
              </div>
              <div className="p-4">
                <Slider {...settings}>
                    {
                      detail?.productGallery.map((item,index)=>{
                        return(
                            <div>
                                 <img src={imagePath+item} width={150} height={100} />
                             </div>
                        )
                      })
                    }
                 {/* <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>

                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                  <div>
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                  </div>
                    */}

                </Slider>
              </div>

            </Col>

            <Col lg={6}>
              <div>
                <h4 className="fw-bold">{detail?.productName}</h4>
                <p className="mt-3"><s className="fw-bold">Rs. {detail?.productActualPrice}</s><span className="fw-bold fs-5 ms-3" style={{ color: 'burlywood' }}>Rs. {detail?.productSalePrice}</span></p>
                <p className="fs-6 mt-5 pb-5 border-bottom">{detail?.productDescription}</p>
                 {check?
                  <div className="d-flex align-items-center gap-2">
                    <span style={{fontSize:'20px',fontWeight:'bold',cursor:'pointer'}} onClick={()=>quantityIncrease("minus",check?._id)}>-</span>
                    <input type="number" style={{width:'30px'}} className="inputNumber text-center" value={qyt}  />
                    <span style={{fontSize:'20px',fontWeight:'bold',cursor:'pointer'}} onClick={()=>quantityIncrease("plus",check?._id)}>+</span>
                  </div>
                  :
                 <button className="py-2 px-5 text-white fw-bold border-0 rounded" style={{ backgroundColor: 'burlywood' }} onClick={addToCart}>Add to Cart</button>
                }
                <ul className="p-0 mt-5">
                  <li className="mb-2 fw-medium">Code: JFP1037</li>
                  <li className="mb-2 fw-medium">Dimension: 72L * 32H * 30W</li>
                  <li className="mb-2 fw-medium">Estimate Delivery Days: "40-45" Days</li>
                  <li className="mb-2 fw-medium">Category: {detail?.subCategory?.subCategoryName}</li>
                  <li className="mb-2 fw-medium">
                    <div className="d-flex flex-wrap gap-3">
                      Color :-
                      {detail?.productColor?.map((item, index) => {
                        let {colorCode,_id}=item
                        return (
                          <div className="d-flex gap-2 align-items-center" key={index}>
                            <input type="checkbox" onChange={(e)=>{
                              if(e.target.checked){
                                setColor(_id);
                              }
                              else{
                                setColor('');
                              }
                            }} />
                            <input type="color" value={colorCode} disabled style={{width:'20px',height:'20px'}}/>
                          </div>
                        )
                      })}
                    </div>
                  </li>
                  <li className="mb-2 fw-medium">
                    <div className="d-flex gap-2 flex-wrap">
                      Material :-
                      {detail?.productMaterialType.map((item,index)=>{
                        let{materialName}=item;
                        return(
                              <p>{materialName},</p>
                        )
                      })}
                    </div>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={12}>
              <div>
                <h3 className="fw-bold pb-3 border-bottom" style={{ color: 'burlywood' }}>Description</h3>
                <p className="fw-medium pt-4">{detail?.productDescription}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <RelatedProduct related={detail?.subCategory?._id} parentId={detail?._id} />

      <UpSellProduct />
    </>
  )
}
