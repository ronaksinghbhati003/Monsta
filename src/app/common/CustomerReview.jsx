import { Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";

export default function CustomerReview({ test, testImage1 }) {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: true,
        touchMove: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    let Rating = (value) => {
        let arr=[];
        while (value > 0) {
            arr.push(<li key={value}><FaStar className="customer-star" /></li>);
            value--;
        }
        return arr;
    }
    return (
        <>
            <Container fluid className="py-5">
                <Container className="customer-review-container px-5">
                    <h2 className="text-center">What Our Custumers Say ?</h2>
                    <div className="customer-review-slider">

                        <Slider {...settings}>
                            {
                                test.map((item, index) => {
                                    let { testDesignation, testImage, testMessage, testName, testRating } = item;
                                    return (
                                        <div className="customer-feedback mt-3" key={index}>
                                            <p>{testMessage}
                                            </p>
                                            <figure className="customer-photo d-flex flex-column align-items-center gap-2">
                                                <img src={testImage1 + testImage} width={100} height={100} />
                                                <p className="customer-name">{testName}</p>
                                                <p className="customer-post">{testDesignation}</p>
                                                <ul className="d-flex p-0 gap-1">
                                                    {Rating(testRating)}
                                                </ul>
                                            </figure>
                                        </div>
                                    )
                                })
                            }
                        </Slider>

                    </div>
                </Container>
            </Container>
        </>
    )
}
