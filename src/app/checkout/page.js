"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useRazorpay } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { fetchBilling } from "../slice/billingSlice";
import { fetchCart } from "../slice/cartSlice";
export default function page() {
    const date = new Date();
    let router = useRouter();
    const { error, isLoading, Razorpay } = useRazorpay();
    let token = useSelector((store) => store.loginStore.token);
    let billingInfo = useSelector((store) => store.billingStore.billingDetail);
    let dispatch = useDispatch();
    let [shippingAddress, setshippingAddress] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        streetAddress: '',
        apartMentAddress: '',
        country: '',
        state: '',
        city: '',
        postCode: '',
        phone: '',
        email: ''
    })
    let cart = useSelector((store) => store.cartStore.cart);
    let subTotal = cart.reduce((acc, item) => acc + (item.product.productSalePrice * item.quantity), 0);
    let discount = 0;
    let total = subTotal - discount;

    let onHandle = (e) => {
        let { name, value } = e.target;
        setshippingAddress({ ...shippingAddress, [name]: value });
    }

    let checkCart = () => {
        return cart.length > 0;
    }

    let onSubmit = (event) => {
        event.preventDefault();
        try {
            if (!checkCart()) {
                toast.warning("Your Cart is Empty Please Add to Cart Product", {
                    position: "top-center",
                    theme: "dark",
                });
                setTimeout(() => {
                    router.push('/');
                }, 2000)
                return;
            }
            if (shippingAddress.firstName && shippingAddress.lastName && shippingAddress.companyName && shippingAddress.streetAddress && shippingAddress.country && shippingAddress.state && shippingAddress.city && shippingAddress.postCode && shippingAddress.phone && shippingAddress.email) {
                let orderItems = cart;
                let paymentMethod = event.target.payment.value;
                let orderAmount = total;
                let orderQty = cart.reduce((acc, item) => acc + item.quantity, 0);
                let requestObj = {
                    shippingAddress,
                    orderItems,
                    paymentMethod,
                    orderAmount,
                    orderQty,
                    shippingCharges: 0,
                    orderTime: date.toLocaleTimeString(),

                }
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/add-order`, requestObj, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log(res);
                        if (res.data.status == 1) {
                            toast.success(res.data.msg, {
                                position: "top-center",
                                theme: "dark",
                                autoClose: 1500
                            })
                        }
                        if (paymentMethod == 2) {
                            let { amount, id } = res.data.order;
                            let { email, userName, userNumber } = res.data.preFill

                            let options = {
                                key: process.env.NEXT_PUBLIC_KEY,
                                amount: amount,
                                currency: "INR",
                                name: "Monsta",
                                description: "Monsta Ecommerce Website",
                                order_id: id,
                                handler: (response) => {
                                    console.log(response);
                                    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/paymentverify`, response)
                                        .then((res) => {
                                            console.log(res);
                                            if (res.data.status == 1) {
                                                toast.success(res.data.msg, {
                                                    position: "top-center",
                                                    theme: "dark",
                                                    autoClose: 1500
                                                })
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                },
                                preFill: {
                                    name: userName,
                                    email: email,
                                    contact: userNumber,
                                },
                                theme: {
                                    color: "#F37254",
                                }
                            }

                            const razorpayNext = new Razorpay(options);
                            razorpayNext.open();
                        }
                        event.target.reset();
                        dispatch(fetchCart());
                        /*setshippingAddress({
                            firstName: '',
                            lastName: '',
                            companyName: '',
                            streetAddress: '',
                            apartMentAddress: '',
                            country: '',
                            state: '',
                            city: '',
                            postCode: '',
                            phone: '',
                            email: ''
                        })*/

                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            else {
                for (let i in shippingAddress) {
                    if (!shippingAddress[i]) {
                        if (i !== 'apartMentAddress') {
                            throw new Error(`Please Fill ${i} Field`);
                        }

                    }
                }
            }
        }
        catch (error) {
            toast.warning(error.message, {
                position: "top-center",
                theme: "dark",
                autoClose: 1500
            })
        }
    }

    useEffect(() => {
        if (!token) router.push('/login')
    }, [token])

    useEffect(() => {
        dispatch(fetchBilling());
    }, [dispatch])

    useEffect(() => {
        setshippingAddress((prev) => {
            return {
                ...prev,
                firstName:billingInfo?.billingFirstName,
                lastName: billingInfo?.billingLastName,
                companyName: '',
                streetAddress:billingInfo?.billingAddress,
                apartMentAddress:billingInfo?.billingApartmentAddress,
                country: billingInfo?.billingCountry,
                state: billingInfo?.billingState,
                city: billingInfo?.billingCity,
                postCode:billingInfo?.billingPostCode,
                phone: billingInfo?.billingNumber,
                email: billingInfo?.billingEmail,
                companyName:billingInfo?.billingCompanyName
            }
        })
    }, [billingInfo])

    return (
        <>
            <ToastContainer />
            <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">CheckOut</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>Checkout</span></p>
                </div>
            </Container>

            <Container fluid className="py-3">
                <Container className="">
                    <Form onSubmit={onSubmit}>
                        <Row className="g-3">
                            <Col lg={6}>
                                <div>
                                    <p className="py-2 ps-2 checkout-heading">shippingAddress DETAILS</p>
                                    <div className="d-flex gap-3 mb-3">
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">First Name *</Form.Label>
                                            <Form.Control type="text" name="firstName" value={shippingAddress.firstName} onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">Last Name *</Form.Label>
                                            <Form.Control type="text" name="lastName" value={shippingAddress.lastName} onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Group className="w-100">
                                            <Form.Label className="fw-bold">Company Name *</Form.Label>
                                            <Form.Control type="text" name="companyName" value={shippingAddress.companyName} onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-100">
                                            <Form.Label className="fw-bold">Street Address *</Form.Label>
                                            <Form.Control type="text" placeholder="House number and street name" name="streetAddress" value={shippingAddress.streetAddress} onChange={onHandle}></Form.Control>
                                            <Form.Control type="text" className="mt-3" placeholder="Apartment, suite, unit etc (optional)" name="apartMentAddress" value={shippingAddress.apartMentAddress} onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                    </div>
                                    {/*<Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Town/City *</Form.Label>
                                        <Form.Control type="tel"></Form.Control>
                                    </Form.Group>
                                     */}
                                    {/*<Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">State/Country *</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                      */}
                                    <Form.Group className="w-100 mb-3">
                                        <Form.Label className="fw-bold">Country Name *</Form.Label>
                                        <Form.Control type="text" value={shippingAddress.country} name="country" onChange={onHandle}></Form.Control>
                                    </Form.Group>
                                    <div className="d-flex justify-content-between flex-wrap  mb-3">
                                        <Form.Group className="w-50 mb-3">
                                            <Form.Label className="fw-bold">State *</Form.Label>
                                            <Form.Control type="text" value={shippingAddress.state} name="state" onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50 mb-3">
                                            <Form.Label className="fw-bold">City *</Form.Label>
                                            <Form.Control type="text" value={shippingAddress.city} name="city" onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50 mb-3">
                                            <Form.Label className="fw-bold">PostCode/Zipcode *</Form.Label>
                                            <Form.Control type="text" value={shippingAddress.postCode} name="postCode" onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50 mb-3">
                                            <Form.Label className="fw-bold">Phone *</Form.Label>
                                            <Form.Control type='tel' value={shippingAddress.phone} name="phone" onChange={onHandle}></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="w-100 mb-3">
                                        <Form.Label className="fw-bold">Email *</Form.Label>
                                        <Form.Control type='email' value={shippingAddress.email} name="email" onChange={onHandle}></Form.Control>
                                    </Form.Group>
                                    <div className="d-flex align-items-center gap-3 mt-5">
                                        <input type="radio" name="payment" id="paymentOnline" style={{ width: '16px', height: '16px' }} value={2} />
                                        <label htmlFor="paymentOnline">Razor Pay Online</label>
                                    </div>
                                    <p style={{ fontSize: '14px', marginTop: '5px', paddingLeft: '10px' }}>Pay securely using Razorpay. We accept all major credit/debit cards,upi and net banking</p>
                                    <div className="d-flex align-items-center gap-3 mt-3">
                                        <input type="radio" name="payment" id="paymentOnline" style={{ width: '16px', height: '16px' }} value={1} />
                                        <label htmlFor="paymentOnline">Cash on Delivery</label>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6}>
                                <p className="py-2 ps-2 checkout-heading">Your Order</p>
                                <Table>
                                    <thead>
                                        <tr className="text-center fs-5">
                                            <td style={{ backgroundColor: 'gray' }} className="border-end">Product</td>
                                            <td style={{ backgroundColor: 'gray' }}>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => {
                                            let { product, quantity } = item;
                                            return (
                                                <tr className="text-center fw-bold" key={index}>
                                                    <td>{product.productName} × {quantity}</td>
                                                    <td>Rs. {product.productSalePrice * quantity}</td>
                                                </tr>
                                            )
                                        })}

                                        <tr className="text-center fw-bold">
                                            <td>Cart Sub Total</td>
                                            <td>{subTotal}</td>
                                        </tr>
                                        <tr className="text-center fw-bold">
                                            <td>Discount (-)</td>
                                            <td>0</td>
                                        </tr>
                                        <tr className="text-center fw-bold">
                                            <td>Order Total</td>
                                            <td>Rs. {total}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="w-100 mt-5 d-flex justify-content-end">
                                    <button className="py-2 px-4 fw-bold" style={{ backgroundColor: 'burlywood', color: 'white' }}>Place Order</button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Container>
        </>
    )
}
