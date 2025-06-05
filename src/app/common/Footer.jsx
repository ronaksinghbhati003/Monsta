"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";


export default function Footer() {
let[contact,setContact]=useState([]);
   let getData=()=>{
      let apiUrl=process.env.NEXT_PUBLIC_API_URL;
      axios.get(`${apiUrl}/company/view`)
      .then(res=>{
        setContact(res.data.viewData);
      })
      .catch(err=>{
        console.log(err);
      })
    }

    useEffect(()=>{
         getData();
    },[])
  return (
    <Container fluid className="py-5">
        <Container className=" d-flex justify-content-between flex-wrap  gap-3" >
            <ul className="p-1 deskstop-footer-menu">
                <h3 className="  mb-4 fw-bold">Contact Us</h3>
                <li className=" fs-6 mb-2 fw-medium"><span>Address: {contact[0]?.companyAddress}</span></li>
                <li className=" fs-6 mb-2 fw-medium"><span>Phone: {contact[0]?.companyMobile}</span></li>
                <li className=" fs-6 mb-2 fw-medium"><span>Email: {contact[0]?.companyEmail}</span></li>
                <li className=" fs-6 mt-4 d-flex justify-content-evenly align-items-center">
                     <div className=" social-media border d-flex justify-content-center align-items-center">
                        <a href={contact[0]?.companyFacebook} target="_blank"> <FaFacebookF style={{fontSize:'20px',color:'black'}}/></a>
                    </div>
                    

                    


                    <div className="social-media border d-flex justify-content-center align-items-center">
                         <a href={contact[0]?.companyInstagram} target="_blank"> <FaInstagram style={{fontSize:'20px',color:'black'}}/></a>
                    </div>

                    <div className="social-media border d-flex justify-content-center align-items-center">
                         <a href={contact[0]?.companyTwitter} target="_blank"><FaTwitter style={{fontSize:'20px',color:'black'}}/></a>
                    </div>

                    <div className="social-media border d-flex justify-content-center align-items-center">
                         <a href={contact[0]?.companyLinkedin} target="_blank"><FaLinkedinIn style={{fontSize:'20px',color:'black'}}/></a>
                    </div>

                    <div className="social-media border d-flex justify-content-center align-items-center">
                         <a href={contact[0]?.companyYoutube} target="_blank"><FaYoutube style={{fontSize:'20px',color:'black'}}/></a>
                    </div>

                    <div className="social-media border d-flex justify-content-center align-items-center">
                         <a href={contact[0]?.companyTelegram} target="_blank" ><FaTelegram style={{fontSize:'20px',color:'black'}}/></a>
                    </div>
 
               </li>
            </ul>

            <ul className="p-1 deskstop-footer-menu">
                <h3 className="  mb-4 fw-bold">Information</h3>
                <li className=" fs-6 mb-2 fw-medium"><span>About us</span></li>
                <li className=" fs-6 mb-2 fw-medium"><span>Contact Us</span></li>
                <li className=" fs-6 mb-2 fw-medium"><span>Frequently Asked Question</span></li>
            </ul>

            <ul className="p-1 deskstop-footer-menu">
                <h3 className="  mb-4 fw-bold">My Account</h3>
                <li className=" fs-6 mb-2 fw-medium"><span><Link href={'/dashboard'} style={{color:'black',textDecoration:'none'}}>My Dashboard</Link></span></li>
                <li className=" fs-6 mb-2 fw-medium"><span><Link href={'/wishlist'} style={{color:'black',textDecoration:'none'}}>Wishlist</Link></span></li>
                <li className=" fs-6 mb-2 fw-medium"><span><Link href={'/cart'} style={{color:'black',textDecoration:'none'}}>Cart</Link></span></li>
                <li className=" fs-6 mb-2 fw-medium"><span><Link href={'/checkout'} style={{color:'black',textDecoration:'none'}}>Check Out</Link></span></li>
            </ul>

            <ul className="p-1">
                <h3 className="  mb-4 fw-bold">Top Rated Products</h3>
                <li className=" fs-6 mb-2 d-flex gap-2">
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617989633213Winona%20Mirror__.jpg" width={150} className="align-self-start" />
                    <div>
                        <p className="p-0 m-0 fs-6">Wooden Mirrors</p>
                        <p className="fw-bold">Winona Mirrors</p>
                        <p><s style={{marginRight:'5px'}}>Rs.2000</s><span style={{color:'burlywood', fontSize:'18px',fontWeight:'bold'}}>Rs.1500</span></p>
                    </div>
                </li>

                <li className=" fs-6 mb-2 d-flex gap-2">
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828789760Rex%20Console%20Table__.jpg" width={150} className="align-self-start" />
                    <div>
                        <p className="p-0 m-0 fs-6">Console Table</p>
                        <p className="fw-bold">Rex Console Table</p>
                        <p><s style={{marginRight:'5px'}}>Rs.3000</s><span style={{color:'burlywood', fontSize:'18px',fontWeight:'bold'}}>Rs.2200</span></p>
                    </div>
                </li>
           
            </ul>

        </Container>
        <Container className="mt-3 py-2 border-top border-bottom d-flex justify-content-center">
            <ul className="d-flex justify-content-center flex-wrap gap-5">
                <li className="fs-5 fw-medium">Home</li>
                <li className="fs-5 fw-medium">Online Store</li>
                <li className="fs-5 fw-medium">Privacy Policy</li>
                <li className="fs-5 fw-medium">Term of Use</li>
            </ul>
        </Container>
        <Container className="py-3">
              <p className="text-center fs-5">All Rights Reserved By Furniture | © 2025</p>
              <div>
              <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" className="mx-auto d-block mt-4"/>
              </div>
        </Container>
    </Container>
  )
}
