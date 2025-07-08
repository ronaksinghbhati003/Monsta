'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { CiHeart } from "react-icons/ci";


import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import BestSellingProduct from "./common/BestSellingProduct";
import CustomerReview from "./common/CustomerReview";
import { fetchCart } from "./slice/cartSlice";
import { fetchWishList } from "./slice/wishlistSlice";
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  let [stateManage, setStateManage] = useState(0);
  let [product, setProduct] = useState([]);
  let [staticPath, setStaticPath] = useState('');
  let [featured, setFeatured] = useState([]);
  let [imagePath, setImagePath] = useState('');
  let [color, setColor] = useState({});
  let [slider, setSlider] = useState([]);
  let [sliderImage, setSliderImage] = useState('');
  let [whyChooseUs, setWhyChooseUs] = useState([]);
  let [whyChooseUsImage1, setWhyChooseUpImage1] = useState('')
  let[test,setTest]=useState([]);
  let[testImage,setTestImage]=useState('');
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let token = useSelector((store) => store.loginStore.token);
  let cart = useSelector((store) => store.cartStore.cart);
  let dispatch = useDispatch();
  console.log(color);


  let settings = {
    dots: true,
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true

  }
  let chair1 = useRef(null);
  let chair2 = useRef(null);
  let chair3 = useRef(null);
  let triggerPoint = useRef(null);
  let homeBanner = useRef(null);
  let homeBannerContent = useRef(null);
  let cart_item = useRef(null);


  useEffect(() => {
    let chair = gsap.context(() => {
      if (window.innerWidth > 576) {
        gsap.from(chair1.current, {
          x: -500,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: triggerPoint.current,
            start: '80% 40%',
          }
        })
        gsap.from(chair2.current, {
          y: 500,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: triggerPoint.current,
            start: '80% 40%',

          }
        })
        gsap.from(chair3.current, {
          x: 500,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: triggerPoint.current,
            start: '80% 40%',

          }
        })
      }
      else {
        gsap.from(chair1.current, {
          y: -500,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: triggerPoint.current,
            start: '80% 40%',
          }
        })
        gsap.from(chair2.current, {
          y: 500,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: chair1.current,
            start: '50% 40%',
          }
        })
        gsap.from(chair3.current, {
          y: 500,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: chair2.current,
            start: '-120% 40%',
          }
        })
      }

      gsap.from(homeBanner.current, {
        x: -500,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: homeBanner.current,
          start: '180% 75%',
          end: '300% 80%',
          scrub: 1,
          
        }
      })

      gsap.from(homeBannerContent.current, {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 1,
        scrollTrigger: {
          trigger: homeBanner.current,
          start: '180% 75%',
          end: '300% 80%',
          scrub: 1,
          
        }
      })
    })

    return () => chair.revert();
  }, [])

  useEffect(() => {
    if (featured.length > 0 && cart_item.current) {
      requestAnimationFrame(() => {
        let ctx = gsap.context(() => {
          gsap.to(cart_item.current.querySelectorAll('.animation'), {
            x: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cart_item.current,
              start: '-15% 40%',
            }
          });
        })
        return () => ctx.revert();
      })

    }
  }, [featured]);


  let getData = () => {
    axios.get(`${apiUrl}/home/view`)
      .then((res) => {
        setProduct(res.data.homeProduct);
        setStaticPath(res.data.staticPath);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let getCartData = () => {
    axios.get(`${apiUrl}/home/featured`, {
      params: {
        value: stateManage
      }
    })
      .then((res) => {
        setFeatured(res.data.findData);
        setImagePath(res.data.imagePath);
      })
      .catch(err => {
        console.log(err);
      })
  }

  let selectColor = (productId, colorId) => {
    setColor(prev => (
      {
        ...prev,
        [productId]: prev[productId] === colorId ? '' : colorId
      }
    ))
  }

  let getSlider = () => {
    axios.get(`${apiUrl}/home/slider`)
      .then((res) => {
        setSlider(res.data.sliderData);
        setSliderImage(res.data.sliderImage);
      })
      .catch(err => {
        console.log(err);
      })
  }

  let addToCart = (productId, name, salePrice, image) => {
    if (token != '') {
      if (color[productId] == undefined) {
        toast.warn("Please Select Color", {
          position: "top-center",
          theme: "dark",
          autoClose: 1500
        })
        return;
      }
      let obj = {
        color: color[productId],
        product: {
          _id: productId,
          productName: name,
          productSalePrice: salePrice,
          productImage: image
        }
      }
      console.log(obj);
      axios.post(`${apiUrl}/cart/addtocart`, obj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.data.status == 1) {
            toast.success(res.data.msg, {
              position: "top-center",
              theme: "dark",
              autoClose: 1500
            })
            dispatch(fetchCart());
            setColor({});
          }
          else {
            toast.warn(res.data.msg, {
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
      toast.warn("Please Login First", {
        position: "top-center",
        theme: "dark",
        autoClose: 1500
      })
    }
  }


  let whyChooseUsData = () => {
    axios.get(`${apiUrl}/home/whychooseus`)
      .then((res) => {
        setWhyChooseUs(res.data.whyChooseUs);
        setWhyChooseUpImage1(res.data.whyChooseUsImage);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let testimoanial=()=>{
    axios.get(`${apiUrl}/home/testimoanial`)
    .then((res)=>{
      setTest(res.data.testimoanialData);
      setTestImage(res.data.testimoanialImage);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    getCartData();
  }, [stateManage])

  useEffect(() => {
    getData();
    getSlider();
    whyChooseUsData();
    testimoanial();
  }, [])


  let addToWishList=(productId,productImage,productName,productSalePrice,productStock)=>{
    if(color[productId]==''||color[productId]==undefined){
      toast.error("Please Select Color",{position:"top-center",theme:"dark",autoClose:1500});
      return;
    }
    let obj={
      color:color[productId],
      _id:productId,
      productImage,
      productName,
      productSalePrice,
      productStock
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/addwishlist`,obj,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log(res);
      if(res.data.status==1){
        toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
        dispatch(fetchWishList());
        setColor({});
      }
      else{
        toast.warning(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
      }
    })
      console.log(color[productId]);
       console.log(productId,productImage,productName,productSalePrice,productStock);
  }


  let showItems = () => {
    return (
      <Container fluid>
        <Container>
          <Row className="gx-3 gy-3" ref={cart_item}>
            {featured.length > 0 ?
              featured.map((item, index) => {
                console.log(item);
                let { subCategory, productName, productColor, productActualPrice, productSalePrice, _id, productImage,productStock } = item;
                return (
                  <Col lg={3} className="card-item animation" key={index}>
                    <Card className="shadow-lg" style={{minHeight:'550px'}}>
                      <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                        <Card.Img variant="top" src={imagePath + productImage} height={300} />
                      </Link>
                      <Card.Body>
                        <Link href={`/productdetail/${_id}`} className="text-decoration-none">
                          <Card.Title className="text-center border-bottom">
                            <p className="fs-6" style={{ color: 'burlywood' }}>{subCategory?.subCategoryName}</p>
                            <p className="fw-bold" style={{ color: 'burlywood' }}>{productName}</p>
                          </Card.Title>
                        </Link>
                        <Card.Text className="justify-content-center d-flex gap-3">
                          <span className="fw-bold"><s>Rs.{productActualPrice}</s></span><span style={{ fontSize: '18px', color: 'burlywood', fontWeight: 'bold' }}>Rs.{productSalePrice}</span>
                        </Card.Text>
                        <div className={`my-3 d-flex  gap-3 product-color ${productColor.length<=2?'justify-content-center':''}`}>
                          {productColor.map((colorItem, index) => {
                            let { colorName, colorCode, _id } = colorItem;
                            return (
                              <button className="px-3 py-1 rounded button" style={{
                                background: color[item._id] == _id ? colorCode : 'transparent',
                                color: color[item._id] == _id ? "white" : "black"
                              }} onClick={() => selectColor(item._id, _id)} key={index}>{colorName}</button>
                            )
                          })}
                        </div>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <div className="featured-heart">
                            <CiHeart onClick={()=>addToWishList(item._id,productImage,productName,productSalePrice,productStock)} />
                          </div>
                        
        
                              <div className="featured-addtocart" onClick={() => addToCart(item._id, productName, productSalePrice, productImage)}>
                                Add To Cart
                              </div>
                          


                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
              :
              <Col lg={12}>
                <div className="d-flex justify-content-center">
                  <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" />
                </div>
                <div className="text-center">No Data Found </div>
              </Col>
            }
          </Row>
        </Container>
      </Container>
    )
  }


  return (
    <>
    <ToastContainer />
    <Container fluid>
        <div className="home-slick-slider" ref={triggerPoint}>
          <Slider {...settings}>

            {
              slider.map((item, index) => (
                <div key={index}>
                  <img src={sliderImage + item.sliderImage} height={530} />
                </div>
              ))
            }
          </Slider>
        </div>
      </Container>

      <Container fluid className="py-4 border-bottom">
        <Container className="chair-container">
          <Row className="gx-6 gy-lg-0 gy-4">
            <Col lg={4} className="col-12" ref={chair1}>
              <div className="home-chair-collection-1 border border-danger">
                <div className="ps-3 pt-3">
                  <p className="fw-bold">Desgin Creative</p>
                  <h4 className="fw-bold fs-3">Chair Collection</h4>
                </div>
              </div>
            </Col>
            <Col lg={4} className="col-12" ref={chair2}>
              <div className="home-chair-collection-2">
                <div className="ps-3 pt-3">
                  <p className="fw-bold">Best Selling Product</p>
                  <h4 className="fw-bold fs-3">Chair Collection</h4>
                </div>
              </div>
            </Col>
            <Col lg={4} className="col-12" ref={chair3}>
              <div className="home-chair-collection-3">
                <div className="ps-3 pt-3">
                  <p className="fw-bold">OnSale Product</p>
                  <h4 className="fw-bold fs-3">Chair Collection</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="py-4 mt-lg-5 mt-3">
        <Container className="d-flex justify-content-center align-items-center gap-0">
          <div className="side-line d-lg-block d-none"></div>
          <ul className="d-flex align-items-center statemanage-button p-0 flex-lg-row flex-column gap-lg-0 gap-2">
            <li className={`featured ${stateManage == 0 ? 'zoom-featured' : 'false'}`} onClick={() => setStateManage(0)}>Featured</li>
            <li className={`new-arrivals ${stateManage == 1 ? 'zoom-featured' : 'false'}`} onClick={() => setStateManage(1)}>New Arrivals</li>
            <li className={`on-sale ${stateManage == 2 ? 'zoom-featured' : 'false'}`} onClick={() => setStateManage(2)}>On Sale</li>
          </ul>
          <div className="side-line-1 d-lg-block d-none"></div>
        </Container>
      </Container>

      {showItems()}

      <Container fluid className="my-5 home-banner p-0">
        <img ref={homeBanner} src="/banner.jpg" className="w-100" height={400} />
        <div ref={homeBannerContent} className="home-banner-content">
          <h2 className="fw-bold fs-1">New Trending Collection</h2>
          <p>We Believe That Good Design is Always in Season</p>
          <Button variant="none" className="p-3 mt-5 home-banner-button">Shopping Now</Button>
        </div>
      </Container>


      <BestSellingProduct product={product} staticPath={staticPath} />

      <Container fluid className="py-3 promise-section-fullWidth">
        <Container className="promise-section py-4">
          <Row className="justify-content-center gy-5">

            {
              whyChooseUs.map((item, index) => {
                let{whyChooseUsDescription,whyChooseUsImage,whyChooseUsName}=item;
                return (
                  <Col lg={4} sm={6} className="d-flex justify-content-center" key={index}>
                    <div className="free-shipping-promise">
                      <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                          <img src={whyChooseUsImage1+whyChooseUsImage} width={100} height={80} className="border border-2 border-black rounded-circle" />
                      </div>
                      <h5>{whyChooseUsName}</h5>
                      <p>{whyChooseUsDescription}</p>
                    </div>
                  </Col>
                )
              })
            }


          </Row>
        </Container>
      </Container>

      <CustomerReview test={test} testImage1={testImage} />

      <Container fluid className="newsletter py-5 d-flex justify-content-center align-items-center">
        <div className="newsletter-email">
          <h3 className="text-center mb-3"> Our Newsletter</h3>
          <p className="text-center mb-5">Get E-mail updates about our latest shop and special offers.</p>
          <div className="d-flex">
            <form className="newsletter-form">
              <input type="email" className="w-75 border border-1 border-black rounded-1 px-1 py-2" placeholder="Email Address" />
              <Button type="submit" variant="none" className="newsletter-button">Subscribe</Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
