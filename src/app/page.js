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
  let [stateManage, setStateManage] = useState(0);
  let [product, setProduct] = useState([]);
  let [staticPath, setStaticPath] = useState('');
  let [featured, setFeatured] = useState([]);
  let [imagePath, setImagePath] = useState('');
  let [color, setColor] = useState({});
  let [slider, setSlider] = useState([]);
  let [sliderImage, setSliderImage] = useState('');
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
          start: '0% 75%',
          end: '100% 80%',
          scrub: 1,
        }
      })

      gsap.from(homeBannerContent.current, {
        scale: 0,
        opacity: 0,
        duration: 2,
        delay: 1,
        scrollTrigger: {
          trigger: homeBanner.current,
          start: '0% 75%',
          end: '100% 80%',
          scrub: 1,
        }
      })
    })

    return () => chair.revert();
  }, [])

  useEffect(() => {
    if (featured.length > 0 && cart_item.current) {
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

  useEffect(() => {
    getCartData();
  }, [stateManage])

  useEffect(() => {
    getData();
    getSlider();
  }, [])


  let showItems = () => {
    return (
      <Container fluid>
        <Container>
          <Row className="gx-3 gy-3" ref={cart_item}>
            {featured.length > 0 ?
              featured.map((item, index) => {
                let { subCategory, productName, productColor, productActualPrice, productSalePrice, _id, productImage } = item;
                return (
                  <Col lg={3} className="card-item animation" key={index}>
                    <Card className="shadow-lg">
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
                        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-3">
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
                            <CiHeart />
                          </div>
                          <div className="featured-addtocart">
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
      <Container fluid>
        <div className="home-slick-slider" ref={triggerPoint}>
          <Slider {...settings}>

            {
              slider.map((item, index) => (
                <div key={index}>
                  <img src={sliderImage+item.sliderImage} height={500}/>
                </div>
              ))
            }
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

            <Col lg={4} sm={6} className="d-flex justify-content-center">
              <div className="free-shipping-promise">
                <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                  <FaEarthAsia className="earth" />
                </div>
                <h5>Free Shipping</h5>
                <p>Free shipping on all order</p>
              </div>
            </Col>

            <Col lg={4} sm={6} className="d-flex justify-content-center">
              <div className="free-shipping-promise">
                <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                  <FaRegMoneyBillAlt className="earth" />
                </div>
                <h5>Money Return</h5>
                <p>Back guarantee under 7 days</p>
              </div>
            </Col>

            <Col lg={4} sm={6} className="d-flex justify-content-center">
              <div className="free-shipping-promise">
                <div className="free-shipping-promise-logo d-flex justify-content-center align-items-center">
                  <MdAccessTime className="earth" />
                </div>
                <h5>Online Support</h5>
                <p>Support online 24 hours a day</p>
              </div>
            </Col>



          </Row>
        </Container>
      </Container>

      <CustomerReview />

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
