'use client';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
gsap.registerPlugin(ScrollTrigger);
let mirror =[
  "Side and End Tables"
]

let living=[
    "Ronak Singh Bhati",
    "Arvind Singh Bhati",
    "Ronak Singh Bhati",
    "Arvind Singh Bhati",
    "Ronak Singh Bhati",
    "Arvind Singh Bhati",
]

let table=[
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables"
]

let materials=[
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables"
]

let colors=[
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables",
    "Side and End Tables",
    "Nest Of Tables"
]
export default function page() {
    let[grid,setGrid]=useState(false);
    let animation=useRef(null);
    useEffect(()=>{
        let cartAnimation=gsap.context(()=>{
            gsap.from(animation.current.querySelectorAll('.animation'),{
                y:-200,
                opacity:0,
                duration:0.5,
                stagger:0.5,
                scrollTrigger:{
                    trigger:animation.current,
                    start:"top 40%",
                  }
               })
        },animation.current)
       
       
       return ()=>cartAnimation.revert();
    },[grid])
  
    return (
    <>
       <Container fluid className="border-bottom py-5 px-0 mb-5">
              <div>
                 <h2 className="text-center">Product Listing</h2>
                 <p className="text-center"><span style={{cursor:'pointer'}}><Link href={'/'} style={{color:"gray",textDecoration:"none"}}>Home</Link></span>&gt;<span style={{color:'burlywood',cursor:'pointer'}}>Product Listing</span></p>
              </div>
       </Container>

       <Container fluid className="py-4 px-0">
        <Container className="px-0 py-3">
            <Row>
                <Col lg={3}>
                     <div>
                        <div className="cart-category-1">
                             <h3>Categories</h3>
                             <ul className="p-0 mt-4">
                                <h5 className="fw-bold mb-3">Tables</h5>
                                {table.map((item,index)=>{
                                    return(
                                        <ListItem data={item} key={index}/>
                                    )
                                })}
                             </ul>
                             <ul className="p-0 mt-4">
                                <h5 className="fw-bold mb-3">Living Storage</h5>
                                {living.map((item,index)=>{
                                    return(
                                        <ListItem data={item} key={index}/>
                                    )
                                })}
                             </ul>

                             <ul className="p-0 mt-4">
                                <h5 className="fw-bold mb-3">Mirror</h5>
                                {mirror.map((item,index)=>{
                                    return(
                                        <ListItem data={item} key={index}/>
                                    )
                                })}
                             </ul>
                        </div>

                       
                        <div className="cart-category-1 mt-4">
                             <h3>Materials</h3>
                             <ul className="p-0 mt-4">
                                <h5 className="fw-bold mb-3">Tables</h5>
                                {materials.map((item,index)=>{
                                    return(
                                        <ListItem data={item} key={index}/>
                                    )
                                })}
                             </ul>
                        </div>

                        <div className="cart-category-1 mt-4">
                             <h3>Colors</h3>
                             <ul className="p-0 mt-4">
                                <h5 className="fw-bold mb-3">Tables</h5>
                                {colors.map((item,index)=>{
                                    return(
                                        <ListItem data={item} key={index}/>
                                    )
                                })}
                             </ul>
                        </div>
                     </div>
                </Col>
                
                
                <Col lg={9}>
                    <div className="p-3">
                        <div className="py-4 border d-flex justify-content-lg-end">
                               <div className="d-flex gap-5 align-items-center flex-lg-nowrap flex-wrap justify-content-lg-center justify-content-center">
                               <TbGridDots onClick={()=>setGrid(!grid)}/>
                               <p style={{position:'relative',top:"8px"}}>Sort By :</p>
                               <select className="cart-select-box">
                                    <option>Featured Product</option>
                                    <option>New Arrivals</option>
                                    <option>On Sale</option>
                                    <option>Best Sellings</option>
                                    <option>Sort by price : Low to high</option>
                                    <option>Sort by price : High to low</option>
                                    <option>Product name : A to Z</option>
                                    <option>Product name : Z to A</option>
                               </select>
                               <p style={{position:'relative',top:"8px"}}>Showing 1-1 of 1 results</p>
                               </div>
                        </div>

                        <div className="mt-4"> 
                            
                            <Row className="g-4" ref={animation}>
                            <Col lg={grid?6:4} className="animation">
                                   <div>
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
                                   </div>
                                 </Col> 

                                 <Col lg={grid?6:4} className="animation">
                                   <div>
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
                                   </div>
                                 </Col> 


                                 <Col lg={grid?6:4} className="animation">
                                   <div>
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
                                   </div>
                                 </Col> 


                                 <Col lg={grid?6:4} className="animation">
                                   <div>
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
                                   </div>
                                 </Col> 
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

const ListItem=({data})=>{
    return(
        <>
           <li className="d-flex gap-3 align-items-center mt-3">
           <input type="checkbox" className="cart-checkbox" value={data} onChange={(e)=>{
            console.log(e.target.value);
           }}/>
           <div>{data}</div>
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