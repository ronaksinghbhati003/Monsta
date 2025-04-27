import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { CiHeart } from "react-icons/ci";
import Slider from "react-slick";
export default function BestSellingProduct() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows:true,
        overflosw:false,
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
           breakpoint:0,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }
       ]
      };
  return (
     <Container fluid className="py-4 border">
        <Container className="bestselling-product-container py-4">
             <div className="d-flex justify-content-between bestselling-product">
                <h2>BestSelling Products</h2>
             </div>


         <div className="bestselling-product-slider">
            
            <Slider {...settings}>
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
                  </div>
             </Slider>
           
        </div>
        </Container>
     </Container>
  )
}
