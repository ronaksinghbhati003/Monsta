'use client'
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function page() {
  let[show,setShow]=useState(false);
  return (
    <>
         
         <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">My Account</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>My Account</span></p>
                </div>
          </Container>

       <Container fluid className="py-5">
        <Container className="">
            <Row>
                <Col lg={6}>
                   <Form className="">
                      <h3 className="fw-bold mb-4">Login</h3>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium mb-2">Username or Email</Form.Label>
                        <Form.Control type="text"></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium mb-2">Password</Form.Label>
                        <Form.Control type="password"></Form.Control>
                      </Form.Group>
                      <div><p style={{color:'burlywood',cursor:'pointer'}} className="fw-bold">Lost your password</p></div>
                      <div className="d-flex align-items-center gap-3">
                        <label htmlFor="remember">Remember me</label>
                        <input type="checkbox" style={{width:'18px',height:'18px'}} id="remember" />
                      </div>
                      <button className="mt-4 fw-bold" style={{padding:'5px 20px',backgroundColor:'burlywood',borderRadius:'20px',color:'white'}}>Login</button>
                   </Form>
                </Col>
                <Col lg={6}>
                    <Form className="">
                         <h3 className="fw-bold mb-4">Register</h3>
                      <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">Email Address</Form.Label>
                            <Form.Control type="email"></Form.Control>
                      </Form.Group>
                      
                      <Form.Group  className="mb-4">
                      <Form.Label className="fw-medium mb-2">Password</Form.Label>
                       <InputGroup>
                           <Form.Control type={show?"text":"password"}></Form.Control>
                           <InputGroup.Text>{show?<FaEyeSlash onClick={()=>setShow(false)}/>:<FaEye onClick={()=>setShow(true)}/>}</InputGroup.Text>
                       </InputGroup>
                       </Form.Group>
                       <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">OTP *</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Otp"></Form.Control>
                      </Form.Group>
                      <div className="d-flex gap-3 justify-content-end ">
                      <button className="mt-4 fw-bold" style={{padding:'5px 20px',backgroundColor:'burlywood',borderRadius:'20px',color:'white'}}>Get Otp</button>
                      <button className="mt-4 fw-bold" style={{padding:'5px 20px',backgroundColor:'burlywood',borderRadius:'20px',color:'white'}}>Register</button>
                      </div>
                      </Form>
                </Col>
            </Row>
        </Container>
       </Container>
    </>
  )
}
