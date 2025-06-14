"use client";
import axios from "axios";
import gsap from "gsap";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { fetchBilling } from "../slice/billingSlice";
import { logInUser, logOut } from "../slice/loginSlice";
export default function page() {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let [dashboard, setDashboard] = useState(0);
    let [orderDetail, setOrderDetail] = useState('');
    let [order, setOrder] = useState([]);
    let [imagePath, setImagePath] = useState('');
    let [form, setForm] = useState({});
    let [detail, setDetail] = useState({});
    let[otp,setOtp]=useState(false);


    let userData = useSelector(store => store.loginStore.user);
    let billingInfo = useSelector((store) => store.billingStore.billingDetail);
    let token = useSelector(store => store.loginStore.token);
    let dispatch = useDispatch();
    let [billing, setBilling] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        apartmentAddress: '',
        number: '',
        country: '',
        state: '',
        city: '',
        postCode: ''
    })
    let [user, setUser] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        otp:''
    })
    useEffect(() => {
        let time = gsap.context(() => {
            let line = gsap.timeline();
            line.from('#box', {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
            line.from('#box1', {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
            line.from('#box2', {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
            line.from('#box3', {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
            line.from('#box4', {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
            line.from('#box5', {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
        })



        return () => time.revert();
    }, [])

    let getOrderData = () => {
        axios.post(`${apiUrl}/order/vieworder`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setOrder(res.data.viewOrder);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let getUserData = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/viewuser`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setUser((prev) => {
                    return {
                        ...prev,
                        name: res.data.findUser?.userName,
                        email:res.data.findUser?.userEmail,
                        number:res.data.findUser?.userNumber,
                        address:res.data.findUser?.userAddress
                    }
                })
            })
            .catch((err) => {

            })
    }

    useEffect(() => {
        if (userData == null) redirect('/login');
        getOrderData();
        getUserData();
    }, [userData])

    useEffect(() => {
        if (orderDetail) {
            axios.get(`${apiUrl}/order/orderdetail/${orderDetail}`)
                .then((res) => {
                    console.log(res);
                    setImagePath(res.data.imagePath);
                    setDetail(res.data.orderDetail);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [orderDetail])

    useEffect(() => {
        dispatch(fetchBilling());
    }, [dispatch])

    useEffect(() => {
        setBilling((prev) => {
            return {
                ...prev,
                firstName: billingInfo?.billingFirstName,
                lastName: billingInfo?.billingLastName,
                email: billingInfo?.billingEmail,
                address: billingInfo?.billingAddress,
                number: billingInfo?.billingNumber,
                country: billingInfo?.billingCountry,
                state: billingInfo?.billingState,
                city: billingInfo?.billingCity,
                postCode: billingInfo?.billingPostCode,
                apartmentAddress: billingInfo?.billingApartmentAddress,
                company: billingInfo?.billingCompanyName
            }
        })
    }, [billingInfo])

    let orederItem = () => {
        return (
            <div className="p-2 orderDetail">
                <Container className="mb-3 d-flex justify-content-between align-items-center">
                    <h4>Order Details :-</h4>
                    <RxCross1 style={{ cursor: 'pointer' }} onClick={() => setOrderDetail('')} />
                </Container>
                <Container className="p-0">
                    <Row className="gx-2">
                        <Col lg={6} className="px-2">
                            <div className="border border-1 border-black p-2 rounded-1">
                                <h4>Shipping Address :-</h4>
                                <p className="mb-2">Name :- {detail?.shippingAddress?.firstName + " " + detail?.shippingAddress?.lastName}</p>
                                <p className="mb-2">Email :- {detail?.shippingAddress?.email}</p>
                                <p className="mb-2">Mobile Number :- {detail?.shippingAddress?.phone}</p>
                                <p className="mb-2">Country :- {detail?.shippingAddress?.country}</p>
                                <p className="mb-2">State :- {detail?.shippingAddress?.state}</p>
                                <p className="mb-2">City :- {detail?.shippingAddress?.city}</p>
                                <p className="mb-2">Post Code :- {detail?.shippingAddress?.postCode}</p>
                                <p className="mb-2">Address :- {detail?.shippingAddress?.streetAddress + " " + detail?.shippingAddress?.apartMentAddress}</p>
                            </div>
                        </Col>
                        <Col lg={6} className="px-2">
                            <div className="border border-1 border-black p-2 rounded-1">
                                <h4>Order Summary :-</h4>
                                <p className="mb-2">Total :- <span className="fw-bold">Rs</span>.{detail?.orderAmount}</p>
                                <p className="mb-2">Shipping Address :- <span className="fw-bold">Rs</span>.{detail?.shippingCharges}</p>
                                <p className="mb-2">Payment Method :- {detail?.paymentMethod == "1" ? "Cash on Delivery" : "Online Payment"}</p>
                                <p className="mb-2">Total Product :- {detail?.orderQty}</p>
                                <p className="mb-2">Order Time :- {detail?.updatedAt?.slice(0, 10) + " " + detail?.orderTime}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="p-0 mt-3">
                    <Row className="g-2">
                        {detail?.orderItems?.map((item, index) => {
                            let { color, product, quantity } = item;
                            return (
                                <Col lg={6} key={index}>
                                    <div className="border border-1 border-black p-2 rounded-1 d-flex justify-content-between">
                                        <div style={{ width: '150px', height: '120px' }}>
                                            <img src={imagePath + product?.productImage} width={150} height={120} />
                                        </div>
                                        <div>
                                            <p className="mb-2">Product Name :- {product?.productName}</p>
                                            <p className="mb-2">Product Price :- <span className="fw-bold">Rs.</span>{product?.productSalePrice}</p>
                                            <p className="mb-2">Quantity :- {quantity}</p>
                                            <p className="mb-2 d-flex align-items-center gap-1">
                                                Color :- {color?.colorName}
                                                <input type="color" value={color?.colorCode} disabled />
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}

                    </Row>
                </Container>
            </div>
        )
    }



    let dashBoardItem = () => {
        if (dashboard == 0) {
            return (
                <>
                    <h3 className="fw-bold">My Dashboard</h3>
                    <p className="fw-medium">From your account dashboard, you can easily check & view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                </>
            )
        }
        else if (dashboard == 1) {
            return (
                <>
                    <h3 className="fw-bold">Order</h3>
                    <Table>
                        <thead>
                            <tr className="text-center">
                                <th className="dashboard-header">Order</th>
                                <th className="dashboard-header">Date</th>
                                <th className="dashboard-header">Status</th>
                                <th className="dashboard-header">Total</th>
                                <th className="dashboard-header">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.length >= 1 ?
                                order.map((item, index) => {
                                    let { updatedAt, orderAmount, orderStatus, _id } = item;
                                    return (
                                        <tr className="text-center fw-bold" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{updatedAt.slice(0, 10)}</td>
                                            <td>{orderStatus}</td>
                                            <td>Rs.{orderAmount}</td>
                                            <td style={{ color: 'burlywood', cursor: 'pointer' }} onClick={() => setOrderDetail(_id)}>View</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={5} className="text-center">No Order Found</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </>
            )
        }
        else if (dashboard == 2) {
            let submitBillingAddress = (event) => {
                event.preventDefault();
                console.log(billing);
                let form = new FormData(event.target);
                if (!billingInfo) {
                    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/billing/addbillinginformation`, form, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            if (res.data.status == 1) {
                                toast.success(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 });
                                dispatch(fetchBilling());
                                event.target.reset();
                            }
                            else {
                                toast.warn(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 })
                            }

                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/billing/updatebillinginfo`, form, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            if (res.data.status == 1) {
                                toast.success(res.data.msg, { position: "top-center", theme: "dark", autoClose: 1500 })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }

            return (
                <>
                    <p className="fw-bold">The following addresses will be used on the checkout page by default.</p>
                    <Row>
                        <Col lg={12}>
                            <div className="border p-3">
                                <h3 className="mb-3">Billing Address</h3>
                                <Form onSubmit={submitBillingAddress}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Billing First Name</Form.Label>
                                        <Form.Control type="text" name="billingFirstName" value={billing.firstName} onChange={(e) => {
                                            setBilling((prev) => {
                                                return { ...prev, firstName: e.target.value }
                                            })
                                        }}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Billing Last Name</Form.Label>
                                        <Form.Control type="text" name="billingLastName" value={billing.lastName} onChange={(e) => {
                                            setBilling((prev) => {
                                                return { ...prev, lastName: e.target.value }
                                            })
                                        }}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Billing Email</Form.Label>
                                        <Form.Control type="email" name="billingEmail" value={billing.email} onChange={(e) => {
                                            setBilling((prev) => {
                                                return { ...prev, email: e.target.value }
                                            })
                                        }}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Billing Mobile Number</Form.Label>
                                        <Form.Control type="tel" name="billingNumber" value={billing.number} onChange={(e) => {
                                            setBilling((prev) => {
                                                return { ...prev, number: e.target.value }
                                            })
                                        }}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Billing Street Address</Form.Label>
                                        <Form.Control type="text" name="billingAddress" value={billing.address} onChange={(e) => {
                                            setBilling((prev) => {
                                                return { ...prev, address: e.target.value }
                                            })
                                        }}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Billing Apartment Address</Form.Label>
                                        <Form.Control type="text" name="billingApartmentAddress" value={billing.apartmentAddress} onChange={(e) => {
                                            setBilling((prev) => {
                                                return { ...prev, apartmentAddress: e.target.value }
                                            })
                                        }}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Country</Form.Label>
                                        <Form.Control type="text" name="billingCountry" value={billing.country}
                                            onChange={(e) => {
                                                setBilling((prev) => {
                                                    return { ...prev, country: e.target.value }
                                                })
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">State</Form.Label>
                                        <Form.Control type="text" name="billingState" value={billing.state}
                                            onChange={(e) => {
                                                setBilling((prev) => {
                                                    return { ...prev, state: e.target.value }
                                                })
                                            }}

                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">City</Form.Label>
                                        <Form.Control type="text" name="billingCity" value={billing.city}
                                            onChange={(e) => {
                                                setBilling((prev) => {
                                                    return { ...prev, city: e.target.value }
                                                })
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Post Code.</Form.Label>
                                        <Form.Control type="text" name="billingPostCode" value={billing.postCode}
                                            onChange={(e) => {
                                                setBilling((prev) => {
                                                    return { ...prev, postCode: e.target.value }
                                                })
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <button className="py-2 px-4 text-white rounded fw-bold" style={{ backgroundColor: 'burlywood ' }}>{billingInfo ? "Update" : "Save"}</button>
                                    </div>
                                </Form>
                            </div>
                        </Col>

                        {/*<Col lg={6}>
                            <div className="border p-3">
                                <h3 className="mb-3">Shipping Address</h3>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Shipping First Name</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Shipping Last Name</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Shipping Email</Form.Label>
                                        <Form.Control type="email"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Shipping Mobile Number</Form.Label>
                                        <Form.Control type="tel"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Shipping Address</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="fw-bold mb-2">Country</Form.Label>
                                        <Form.Select>
                                            <option>Select Country</option>
                                            <option>Indai</option>
                                            <option>Pakistan</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">State</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">City</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <button className="py-2 px-4 text-white rounded fw-bold" style={{ backgroundColor: 'burlywood ' }}>Update</button>
                                    </div>
                                </Form>
                            </div>
                        </Col>*/}
                    </Row>
                </>
            )
        }
        else if (dashboard == 3) {
              let myProfileSubmit=(event)=>{
                event.preventDefault();
                if(!otp){
                    axios.post(`${apiUrl}/user/otp`,{
                        email:user.email
                    })
                    .then((res)=>{
                        console.log(res)
                        if(res.data.status==0){
                          toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})
                        }
                        else{
                          setOtp(true);
                          toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500})       
                        }
                        
                        
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }
                else{
                    axios.post(`${apiUrl}/user/update`,user,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    .then((res)=>{
                        if(res.data.status==1){
                            toast.success(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
                            dispatch(logInUser({userData:res.data.userData,token:res.data.token}));
                        }
                        else{
                            toast.warn(res.data.msg,{position:"top-center",theme:"dark",autoClose:1500});
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })

                }
              }

            return (
                <>
                    <div className="border p-3">
                        <h3 className="mb-3">My Profile</h3>
                        <Form onSubmit={myProfileSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Name</Form.Label>
                                <Form.Control type="text" value={user?.name} onChange={(e) => {
                                    setUser((prev) => {
                                        return { ...prev, name: e.target.value }
                                    })
                                }}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Email</Form.Label>
                                <Form.Control type="email" value={user?.email}
                                    onChange={(e) => {
                                        setUser((prev) => {
                                            return { ...prev, email: e.target.value }
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Mobile Number</Form.Label>
                                <Form.Control type="tel" value={user?.number}
                                    onChange={(e) => {
                                        setUser((prev) => {
                                            return { ...prev, number: e.target.value }
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Address</Form.Label>
                                <Form.Control type="text" value={user?.address}
                                    onChange={(e) => {
                                        setUser((prev) => {
                                            return { ...prev, address: e.target.value }
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                            {otp&&<Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">OTP *</Form.Label>
                                <Form.Control type="text" value={user?.otp}
                                    onChange={(e) => {
                                        setUser((prev) => {
                                            return { ...prev, otp: e.target.value }
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>}
                            <div className="d-flex justify-content-end">
                                <button className="py-2 px-4 text-white rounded fw-bold" style={{ backgroundColor: 'burlywood ' }}>{otp?"Update":"Verify"}</button>
                            </div>
                        </Form>
                    </div>

                </>
            )
        }
        else if (dashboard == 4) {

            let handleChange = (e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
            }

            let changePassword = (event) => {
                event.preventDefault();
                if (form.currentPassword != form.newPassword) {
                    if (form.newPassword == form.confirmPassword) {
                        axios.post(`${apiUrl}/login/changepassword`, form, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => {
                                if (res.data.status) {
                                    toast.success(res.data.msg, {
                                        position: "top-center",
                                        theme: "dark",
                                        autoClose: 1500
                                    })
                                    event.target.reset();
                                }
                                else {
                                    toast.error(res.data.msg, {
                                        position: "top-center",
                                        theme: "dark",
                                        autoClose: 1500
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    else {
                        toast.error("Confirm Password did not match with new password", {
                            position: "top-center",
                            theme: "dark",
                            autoClose: 1500
                        })
                    }
                }
                else {
                    toast.error("New Password diffrent from Current Password", {
                        position: "top-center",
                        theme: "dark",
                        autoClose: 1500
                    })

                }


            }
            return (
                <>
                    <ToastContainer />
                    <Form className="border p-2" onSubmit={changePassword}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-2">Current Password</Form.Label>
                            <Form.Control type="password" name="currentPassword" onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-2">New Password</Form.Label>
                            <Form.Control type="password" name="newPassword" onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-2">Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <button className="py-2 px-4 text-white rounded fw-bold" style={{ backgroundColor: 'burlywood ' }}>Change Password</button>
                        </div>
                    </Form>
                </>
            )
        }
    }
    return (
        <>
            <ToastContainer />
            <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">My Dashboard</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>My Dashboard</span></p>
                </div>
            </Container>

            <Container fluid className="py-5">
                <Container className="border p-0">
                    <Row className="gx-2">
                        <Col lg={3}>
                            <ul className="p-0">
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard == 0 ? 'dashboard-active' : ''}`} id="box" onClick={() => setDashboard(0)}>My Dashboard</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard == 1 ? 'dashboard-active' : ''}`} id="box1" onClick={() => setDashboard(1)}>Orders</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard == 2 ? 'dashboard-active' : ''}`} id="box2" onClick={() => setDashboard(2)}>Address</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard == 3 ? 'dashboard-active' : ''}`} id="box3" onClick={() => setDashboard(3)}>My Profile</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard == 4 ? 'dashboard-active' : ''}`} id="box4" onClick={() => setDashboard(4)}>Change Password</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard == 5 ? 'dashboard-active' : ''}`} id="box5" onClick={() =>dispatch(logOut()) }>Log Out</li>
                            </ul>
                        </Col>

                        <Col className="">
                            <div className="p-2">
                                {orderDetail ? orederItem() : dashBoardItem()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}


