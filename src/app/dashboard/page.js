"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";

export default function page() {
let[dashboard,setDashboard]=useState(0);
    useEffect(() => {
        let time = gsap.context(() => {
            let line = gsap.timeline();
            line.from('#box', {
                y: -100,
                opacity:0,
                duration: 0.5
            })
            line.from('#box1', {
                y: -100,
                opacity:0,
                duration: 0.5
            })
            line.from('#box2', {
                y: -100,
                opacity:0,
                duration: 0.5
            })
            line.from('#box3', {
                y: -100,
                opacity:0,
                duration: 0.5
            })
            line.from('#box4', {
                y: -100,
                opacity:0,
                duration: 0.5
            })
            line.from('#box5', {
                y: -100,
                opacity:0,
                duration: 0.5
            })
        })
       
        return ()=>time.revert();
    },[])
   
    let dashBoardItem=()=>{
        if(dashboard==0){
            return(
                <>
                  <h3 className="fw-bold">My Dashboard</h3>
                  <p className="fw-medium">From your account dashboard, you can easily check & view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                </>
            )
        }
        else if(dashboard==1){
            return(
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
                        <tr className="text-center fw-bold">
                            <td>1</td>
                            <td>May 10 2018</td>
                            <td>Completed</td>
                            <td>Rs.25</td>
                            <td style={{color:'burlywood'}}>View</td>
                        </tr>
                        <tr className="text-center fw-bold">
                            <td>1</td>
                            <td>May 10 2018</td>
                            <td>Completed</td>
                            <td>Rs.25</td>
                            <td style={{color:'burlywood'}}>View</td>
                        </tr>
                    </tbody>
                  </Table>
                </>
            )
        }
        else if(dashboard==2){
            return(
                <>
                  <p className="fw-bold">The following addresses will be used on the checkout page by default.</p>
                  <Row>
                    <Col lg={6}>
                       <div className="border p-3">
                       <h3 className="mb-3">Billing Address</h3>
                          <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Billing Name</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Billing Email</Form.Label>
                                <Form.Control type="email"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Billing Mobile Number</Form.Label>
                                <Form.Control type="tel"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Billing Address</Form.Label>
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
                                <button className="py-2 px-4 text-white rounded fw-bold" style={{backgroundColor:'burlywood '}}>Update</button>
                            </div>
                          </Form>
                       </div>
                    </Col>

                    <Col lg={6}>
                       <div className="border p-3">
                        <h3 className="mb-3">Shipping Address</h3>
                          <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Shipping Name</Form.Label>
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
                                <button className="py-2 px-4 text-white rounded fw-bold" style={{backgroundColor:'burlywood '}}>Update</button>
                            </div>
                          </Form>
                       </div>
                    </Col>
                  </Row>
                </>
            )
        }
        else if(dashboard==3){
            return(
                <>
                     <div className="border p-3">
                       <h3 className="mb-3">My Profile</h3>
                          <Form>
                           <Form.Check 
                              inline
                              label="Mr"
                              type="radio"
                              className="fw-bold"
                           />
                           <Form.Check 
                              inline
                              label="Mrs"
                              type="radio"
                              className="fw-bold"
                           />
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Name</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Email</Form.Label>
                                <Form.Control type="email"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Mobile Number</Form.Label>
                                <Form.Control type="tel"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Address</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <button className="py-2 px-4 text-white rounded fw-bold" style={{backgroundColor:'burlywood '}}>Update</button>
                            </div>
                          </Form>
                       </div>

                </>
            )
        }
        else if(dashboard==4){
            return(
                <>
                  <Form className="border p-2">
                   <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Current Password</Form.Label>
                                <Form.Control type="password"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">New Password</Form.Label>
                                <Form.Control type="password"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-2">Confirm Password</Form.Label>
                                <Form.Control type="password"></Form.Control>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <button className="py-2 px-4 text-white rounded fw-bold" style={{backgroundColor:'burlywood '}}>Change Password</button>
                            </div>
                    </Form>
                </>
            )
        }
       } 
    return (
        <>
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
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard==0?'dashboard-active':''}`} id="box" onClick={()=>setDashboard(0)}>My Dashboard</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard==1?'dashboard-active':''}`} id="box1" onClick={()=>setDashboard(1)}>Orders</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard==2?'dashboard-active':''}`} id="box2" onClick={()=>setDashboard(2)}>Address</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard==3?'dashboard-active':''}`} id="box3" onClick={()=>setDashboard(3)}>My Profile</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard==4?'dashboard-active':''}`} id="box4" onClick={()=>setDashboard(4)}>Change Password</li>
                                <li className={`dashboard-list ps-2 py-2 mb-2  rounded text-white fw-bold ${dashboard==5?'dashboard-active':''}`} id="box5" onClick={()=>setDashboard(5)}>Log Out</li>
                            </ul>
                        </Col>

                        <Col>
                           <div className="p-2">
                               {dashBoardItem()}
                           </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
