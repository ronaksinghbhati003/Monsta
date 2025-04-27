import { Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";

export default function CustomerReview() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        swipe: true,          
        touchMove: true,        
        swipeToSlide: true, 
        autoplay: true,         
        autoplaySpeed: 2000,   
        pauseOnHover:true    
    };
    return (
        <>
            <Container fluid className="py-5">
                <Container className="customer-review-container px-5">
                    <h2 className="text-center">What Our Custumers Say ?</h2>
                    <div className="customer-review-slider">

                        <Slider {...settings}>
                            <div className="customer-feedback mt-3">
                                <p>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                                </p>
                                <figure className="customer-photo d-flex flex-column align-items-center gap-2">
                                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg" />
                                    <p className="customer-name">KATHY YOUNG</p>
                                    <p className="customer-post">CEO of Sun Park</p>
                                    <ul className="d-flex p-0 gap-1">
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                    </ul>
                                </figure>
                            </div>

                            <div className="customer-feedback mt-3">
                                <p>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                                </p>
                                <figure className="customer-photo d-flex flex-column align-items-center gap-2">
                                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/c6381687-5a5e-4914-9373-9cbec4937be6-1670161604.jpg" />
                                    <p className="customer-name">KATHY YOUNG</p>
                                    <p className="customer-post">CEO of Sun Park</p>
                                    <ul className="d-flex p-0 gap-1">
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                    </ul>
                                </figure>
                            </div>

                            <div className="customer-feedback mt-3">
                                <p>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                                </p>
                                <figure className="customer-photo d-flex flex-column align-items-center gap-2">
                                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/35b5a0a0-e80f-4038-a75a-2811de92118b-1670161614.png" />
                                    <p className="customer-name">KATHY YOUNG</p>
                                    <p className="customer-post">CEO of Sun Park</p>
                                    <ul className="d-flex p-0 gap-1">
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                        <li><FaStar className="customer-star"/></li>
                                    </ul>
                                </figure>
                            </div>
                        </Slider>

                    </div>
                </Container>
            </Container>
        </>
    )
}
