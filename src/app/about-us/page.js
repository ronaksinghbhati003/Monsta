'use client';
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomerReview from "../common/CustomerReview";
export default function About() {
  let imageAnimation=useRef(null);
  useEffect(()=>{
      let image =gsap.context(()=>{
           gsap.from(imageAnimation.current,{
            opacity:0,
            duration:3,
          })
      },imageAnimation)

      return ()=>image.revert();
  })
  return (
    <>
       <Container fluid className="border-bottom py-5 px-0 mb-5">
              <div>
                 <h2 className="text-center">About Us</h2>
                 <p className="text-center"><span style={{cursor:'pointer'}}><Link href={'/'} style={{color:"gray",textDecoration:"none"}}>Home</Link></span>&gt;<span style={{color:'burlywood',cursor:'pointer'}}>About Us</span></p>
              </div>
       </Container>

       <Container fluid className="">
            <Container className="p-0">
                <img src="https://monsta-website.vercel.app/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg" className="w-100"  ref={imageAnimation}/>
                <div className="mt-3">
                   <h3 className="text-center mb-3">Welcome to Monsta!</h3>
                   <p className="fs-6 text-center" style={{fontSize:'10px'}}>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
                   <p className="text-center" style={{fontSize:'16px',color:'burlywood'}}>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
                </div>
            </Container>
       </Container>

       <Container fluid className="py-4">
        <Container>
           <h3 className="text-center mb-4">Why Choose Us</h3>
           <Row>
              <Col lg={4}>
                  <div className="">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/c65c4789-c1eb-4cfc-9961-3ab025317e08-1670161041.jpg" className="mx-auto d-block"/>
                        <h6 className="text-center my-3">Creative Desgin</h6>
                        <p className="text-center fs-6 fw-light">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                  </div>
              </Col>
              <Col lg={4}>
                  <div className="">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg" className="mx-auto d-block"/>
                        <h6 className="text-center my-3">100% Money Back Guarantee</h6>
                        <p className="text-center fs-6 fw-light">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                  </div>
              </Col>
              <Col lg={4}>
                  <div className="">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg" className="mx-auto d-block"/>
                        <h6 className="text-center my-3">Online Support 24/7</h6>
                        <p className="text-center fs-6 fw-light">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                  </div>
              </Col>
           </Row>
        </Container>
       </Container>

       <Container fluid className="py-4">
           <Container className="p-0">
              <Row>
                  <Col lg={4}>
                    <div className="border shadow-lg">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg" className="w-100" />
                        <h4 className="fs-5 mt-3 text-center">What we do</h4>
                        <p className="text-center fs-6">Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="border shadow-lg">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg" className="w-100" />
                        <h4 className="fs-5 mt-3 text-center">Our Mission</h4>
                        <p className="text-center fs-6">Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="border shadow-lg">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg" className="w-100" />
                        <h4 className="fs-5 mt-3 text-center">History of Us</h4>
                        <p className="text-center fs-6">Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                    </div>
                  </Col>
              </Row>
           </Container>
       </Container>

       <CustomerReview/>
    </>
  )
}
