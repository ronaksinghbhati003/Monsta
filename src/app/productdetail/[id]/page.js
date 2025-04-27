'use client';
import RelatedProduct from "@/app/common/RelatedProduct";
import UpSellProduct from "@/app/common/UpSellProduct";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";


function NextArrow(prop){
    const{className,style,onClick}=prop;
    return(
        <div className={className} style={{...style,
            backgroundColor:'red',
            color:'white',
            top:"50%"
        }}
        onClick={onClick}
        >
           <MdOutlineKeyboardArrowRight style={{fontSize:'30px',backgroundColor:'black',position:'relative',top:"-140%"}}/>
        </div>
    )
}

function PreArrow(prop){
    const{className,style,onClick}=prop;
    return(
        <div className={className} style={{...style,
            backgroundColor:'red',
            color:'white',
            left:'-2%',
            top:'50%',
            zIndex:'10'
        }}
        onClick={onClick}
        >
           <MdOutlineKeyboardArrowLeft style={{fontSize:'30px',backgroundColor:'black',position:'relative',top:"-140%"}}/>
        </div>
    )
}
export default function page() {
    let img=useRef(null);
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:true,
        nextArrow:<NextArrow/>,
        prevArrow:<PreArrow/>
      };
    useEffect(()=>{
        img.current.addEventListener("mousemove",(e)=>{
           let x=(e.offsetX*100/img.current.offsetWidth);
           let y=(e.offsetY*100/img.current.offsetHeight);
           img.current.style.setProperty('--x',x + '%');
           img.current.style.setProperty('--y',y + '%');
        })
    },[])
  return (
    <>
        <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">Godfrey Coffee Table Set</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span> Coffee Table Sets</span> &gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>Godfrey Coffee Table Set</span></p>
                </div>
          </Container>

          <Container fluid className="py-4">
            <Container className="p-0">
                 <Row className="g-5">
                    <Col lg={6} className="p-0">
                       <div ref={img} className="imgZoom" style={{'--url':`url("https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg")`,
                        '--x':0,
                        '--y':0
                        }}>
                         <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg" />
                       </div>
                         <div className="p-4">
                              <Slider {...settings}>
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
                                     <div>
                                       <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg" width={150} height={100} />
                                     </div>
                                                                  
                            </Slider>
                        </div>
            
                    </Col>

                    <Col lg={6}>
                       <div>
                           <h4 className="fw-bold">Godfrey Coffee Table Set</h4>
                           <p className="mt-3"><s className="fw-bold">Rs. 3000</s><span className="fw-bold fs-5 ms-3" style={{color:'burlywood'}}>Rs. 2200</span></p>
                           <p className="fs-6 mt-5 pb-5 border-bottom">Godfrey Coffee table is an ideal table for your space. The stools have the most comfortable cushions.</p>
                           <button className="py-2 px-5 text-white fw-bold border-0 rounded" style={{backgroundColor:'burlywood'}}>Add to Cart</button>
                           <ul className="p-0 mt-5">
                            <li className="mb-2 fw-medium">Code: JFP1037</li>
                            <li className="mb-2 fw-medium">Dimension: 72L * 32H * 30W</li>
                            <li className="mb-2 fw-medium">Estimate Delivery Days: "40-45" Days</li>
                            <li className="mb-2 fw-medium">Category: Coffee Table Sets</li>
                            <li className="mb-2 fw-medium">Color: Weathered Walnut</li>
                            <li className="mb-2 fw-medium">Material: Mahogany Wood</li>
                           </ul>
                       </div>
                    </Col>

                    <Col lg={12}>
                        <div>
                            <h3 className="fw-bold pb-3 border-bottom" style={{color:'burlywood'}}>Description</h3>
                            <p className="fw-medium pt-4">The Evan Coffee table has stools that can be encased under the table. The Stools are cushioned to keep you comfortable, and since they can be put away under the table, they do not take up much space. This table is made of Sheesham, and the design is practical and functional. It can seamlessly blend in with any décor style owing to its simple yet elegant design.</p>
                        </div>
                    </Col>
                 </Row>
            </Container>
          </Container>

          <RelatedProduct/>

          <UpSellProduct />
    </>
  )
}
