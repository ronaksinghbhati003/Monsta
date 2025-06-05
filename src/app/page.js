'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { CiHeart } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";


import axios from "axios";
import Slider from "react-slick";
import BestSellingProduct from "./common/BestSellingProduct";
import CustomerReview from "./common/CustomerReview";
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  let[stateManage,setStateManage]=useState(0);
  let[product,setProduct]=useState([]);
  let[staticPath,setStaticPath]=useState('');
  let apiUrl=process.env.NEXT_PUBLIC_API_URL;
  

  let settings={
    dots:true,
    infinite:true,
    loop:true,
    speed:500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:true

  }
  let chair1=useRef(null);
  let chair2=useRef(null);
  let chair3=useRef(null);
  let triggerPoint=useRef(null);
  let homeBanner=useRef(null);
  let homeBannerContent=useRef(null);
  let cart_item=useRef(null);


  useEffect(()=>{
    let chair=gsap.context(()=>{
      if(window.innerWidth>576){
        gsap.from(chair1.current,{
         x:-500,
         opacity:0,
         duration:1,
         scrollTrigger:{
           trigger:triggerPoint.current,
           start:'80% 40%',
         }
        })
        gsap.from(chair2.current,{
         y:500,
         opacity:0,
         duration:1,
         scrollTrigger:{
           trigger:triggerPoint.current,
           start:'80% 40%',
           
         }
        })
        gsap.from(chair3.current,{
         x:500,
         opacity:0,
         duration:1,
         scrollTrigger:{
           trigger:triggerPoint.current,
           start:'80% 40%',
           
         }
        })
       }
       else{
         gsap.from(chair1.current,{
           y:-500,
           opacity:0,
           duration:1,
           scrollTrigger:{
             trigger:triggerPoint.current,
             start:'80% 40%',
           }
          })
          gsap.from(chair2.current,{
           y:500,
           opacity:0,
           duration:1,
           scrollTrigger:{
             trigger:chair1.current,
             start:'50% 40%',
           }
          })
          gsap.from(chair3.current,{
           y:500,
           opacity:0,
           duration:1,
           scrollTrigger:{
             trigger:chair2.current,
             start:'-120% 40%',
           }
          })
       }
   
      gsap.from(homeBanner.current,{
        x:-500,
        opacity:0,
        duration:1,
        scrollTrigger:{
         trigger:homeBanner.current,
         start:'0% 75%',
         end:'100% 80%',
         scrub: 1,
        }
      })
   
      gsap.from(homeBannerContent.current,{
         scale:0,
         opacity:0,
         duration:2,
         delay:1,
         scrollTrigger:{
           trigger:homeBanner.current,
           start:'0% 75%',
           end:'100% 80%',
           scrub: 1,
          }
      })
     
      gsap.to(cart_item.current.querySelectorAll('.animation'), {
       x:0,       
       opacity: 1,    
       duration: 0.2,   
       stagger:0.2,
       scrollTrigger:{
           trigger:cart_item.current,
           start:'-15% 40%',
       }  
    });
    })
    
    return ()=>chair.revert();
  },[])


  let getData=()=>{
    axios.get(`${apiUrl}/home/view`)
    .then((res)=>{
      setProduct(res.data.homeProduct);
      setStaticPath(res.data.staticPath);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  

  useEffect(()=>{
      getData();
  },[])
  
  
  let showItems=()=>{
    if(stateManage==0)
    {
      return(
        <>
            <Container fluid>
              <Container>
                    <Row className="gx-3 gy-3" ref={cart_item}>
                      <Col lg={3} className="card-item animation">
                           <Link href={'/productdetail/1'} className="text-decoration-none">
                          <Card className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" />
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
                          </Link>
                        </Col>

                        
                        <Col lg={3} className="card-item animation">
                        <Link href={'/productdetail/1'} className="text-decoration-none">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" />
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
                          </Link>
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" />
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
                        </Col>
                   </Row>
              </Container>
            </Container>
        </>
      )
    }

    else if(stateManage==1)
    {
      return(
        <>
            <Container fluid>
              <Container>
                    <Row className="gx-3 gy-3" ref={cart_item}>
                      <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" />
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
                        </Col>

                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" />
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
                            <Card.Img variant="top" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg" />
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
                        </Col>
                          
                        
                      </Row>
              </Container>
            </Container>
        </>
      )
    }

    else{
     return(
      <>
          <Container fluid>
              <Container>
                      <Row className="gx-3 gy-3" ref={cart_item}>
                      <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
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
                        </Col>

                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
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
                        </Col>


                        <Col lg={3} className="card-item animation">
                          <Card  className="shadow-lg">
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
                        </Col>
                          
                        
                      </Row>
              </Container>
            </Container>
      </>
     )
    }
  }


  return (
      <>
      <Container fluid>
           <div className="home-slick-slider" ref={triggerPoint}>
                  <Slider {...settings}>
                  <div>
                      <img src="/slider1.jpg" />
                  </div>
                 
                  <div>
                      <img src="/slider2.jpg" />
                  </div>
                 
                  <div>
                      <img src="/slider3.jpg" />
                  </div>
            
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
                    <li className={`featured ${stateManage==0?'zoom-featured':'false'}`} onClick={()=>setStateManage(0)}>Featured</li>
                    <li className={`new-arrivals ${stateManage==1?'zoom-featured':'false'}` }onClick={()=>setStateManage(1)}>New Arrivals</li>
                    <li className={`on-sale ${stateManage==2?'zoom-featured':'false'}`} onClick={()=>setStateManage(2)}>On Sale</li>
                 </ul>
                 <div className="side-line-1 d-lg-block d-none"></div>
          </Container>
        </Container>

         {showItems()}

        <Container fluid className="my-5 home-banner p-0">
               <img ref={homeBanner} src="/banner.jpg" className="w-100" height={400}/> 
               <div ref={homeBannerContent} className="home-banner-content">
                 <h2 className="fw-bold fs-1">New Trending Collection</h2>
                 <p>We Believe That Good Design is Always in Season</p>
                 <Button variant="none" className="p-3 mt-5 home-banner-button">Shopping Now</Button>
               </div>
        </Container>
        
        
        <BestSellingProduct   product={product} staticPath={staticPath}/>

        <Container fluid className="py-3 promise-section-fullWidth">
           <Container className="promise-section py-4">
               <Row className="justify-content-center gy-5">
                 
                 <Col lg={4} sm={6} className="d-flex justify-content-center">
                   <div className="free-shipping-promise">
                         <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                              <FaEarthAsia className="earth"/>
                         </div>
                         <h5>Free Shipping</h5>
                         <p>Free shipping on all order</p>
                   </div>
                 </Col>

                 <Col lg={4} sm={6} className="d-flex justify-content-center">
                   <div className="free-shipping-promise">
                         <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                              <FaRegMoneyBillAlt className="earth"/>
                         </div>
                         <h5>Money Return</h5>
                         <p>Back guarantee under 7 days</p>
                   </div>
                 </Col>

                 <Col lg={4} sm={6}  className="d-flex justify-content-center">
                   <div className="free-shipping-promise">
                         <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                              <MdAccessTime className="earth"/>
                         </div>
                         <h5>Online Support</h5>
                         <p>Support online 24 hours a day</p>
                   </div>
                 </Col>
                 
                 
                
               </Row>
           </Container>
        </Container>

        <CustomerReview/>
      
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
