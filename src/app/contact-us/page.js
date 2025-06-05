'use client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

export default function page() {
    let apiUrl=process.env.NEXT_PUBLIC_API_URL;
    let[check,setCheck]=useState({
        name:null,email:null,number:null
    })
    let[contact,setContact]=useState(null);

    let getData= ()=>{
          axios.get(`${apiUrl}/company/view`)
         .then((res)=>{
            setContact(
            {
                companyMap:res.data.viewData[0].companyMap,
                companyAddress:res.data.viewData[0].companyAddress,
                companyEmail:res.data.viewData[0].companyEmail,
                companyMobile:res.data.viewData[0].companyMobile
            })
         })
         .catch((err)=>{
            console.log(err);
         })
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
           <Container fluid className="border-bottom py-5 px-0 mb-5">
              <div>
                 <h2 className="text-center">Contact Us</h2>
                 <p className="text-center"><span style={{cursor:'pointer'}}><Link href={'/'} style={{color:"gray",textDecoration:"none"}}>Home</Link></span>&gt;<span style={{color:'burlywood',cursor:'pointer'}}>Contact Us</span></p>
              </div>
          </Container>

       <Container fluid className="py-4">
           <Container className="border p-0">
           <iframe src={contact?.companyMap} width="100%" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
           </iframe>
           </Container>
       </Container>

       <Container fluid className="py-4">
          <Container>
              <Row className="g-5">

                <Col lg={6}>
                   <div>
                     <ul className="p-0">
                         <li className="pb-2 border-bottom mb-2">
                            <h3 className="fw-bold">Contact Us</h3>
                         </li>
                         <li className="pb-2 border-bottom mb-2 d-flex align-items-center gap-2 ">
                              <FaBuilding/><p className="fw-bold" style={{position:'relative',top:'5.5px'}}>{contact?.companyAddress}</p>
                         </li>
                         <li className="pb-2 border-bottom mb-2 d-flex align-items-center gap-2 ">
                              <IoIosCall/><p className="fw-bold" style={{position:'relative',top:'5.5px'}}>{contact?.companyMobile}</p>
                         </li>
                         <li className="pb-2 border-bottom mb-2 d-flex align-items-center gap-2 ">
                              <MdOutlineEmail/><p className="fw-bold" style={{position:'relative',top:'5.5px'}}>{contact?.companyEmail}</p>
                         </li>
                     </ul>
                   </div>
                </Col>

                <Col lg={6}>
                    <Form>
                        <h3 className="fw-bold mb-4">Tell US Your Question</h3>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-3">Your Name (required)</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" required name="username" onChange={(event)=>{
                                  setCheck({...check,name:event.target.value.trim()})
                            }}></Form.Control>
                            {check.name?'':<div className="text-danger mt-2" style={{fontSize:'14px'}}>Please Enter Value input can't be Empty</div>}
                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-3">Your Email (required)</Form.Label>
                            <Form.Control type="emial" placeholder="Enter Email" required name="useremail" onChange={(event)=>{
                                setCheck({...check,email:event.target.value.trim()})
                            }}></Form.Control>
                            {check.email?'':<div className="text-danger mt-2" style={{fontSize:'14px'}}>Please Enter Value input can't be Empty</div>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-3">Your Mobile Number(required)</Form.Label>
                            <Form.Control type="tel" placeholder="Enter Mobile Number" required name="usermobile" onChange={(event)=>{
                                setCheck({...check,number:event.target.value.trim()})
                            }}></Form.Control>
                        </Form.Group>
                        {check.number?'':<div className="text-danger mt-2" style={{fontSize:'14px'}}>Please Enter Value input can't be Empty</div>}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold mb-3">Subject(required)</Form.Label>
                            <Form.Control type="text" placeholder="Subject" required name="subject"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                             <Form.Label>Your Message</Form.Label>
                             <Form.Control as="textarea" rows={5} style={{resize:'none'}} placeholder="Enter Message" />
                       </Form.Group>
                       <Button type="submit" style={{backgroundColor:'black',color:"white"}} className="px-3 mt-2">Send</Button>
                    </Form>
                </Col>

              </Row>
          </Container>
       </Container>
    </>
  )
}
