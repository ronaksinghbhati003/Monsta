'use client'
import axios from "axios";
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../Config';
import { logInUser } from "../slice/loginSlice";


export default function page() {
  
  let dispatch=useDispatch();

  let[show,setShow]=useState(false);
  let[otp,setOtp]=useState(false);
  let[nav,setNav]=useState(false);
  let[loginNav,setLoginNav]=useState(false);
   let insertData=(event)=>{
           event.preventDefault();
           let form=new FormData(event.target);
           if(otp){
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/insert`,form)
                .then((res)=>{
                  console.log(res);
                  if(res.data.status){
                       toast.success(res.data.msg,{
                         position:"top-center",
                         theme:"dark",
                         autoClose:1500
                       })
                       setOtp(false);
                       setTimeout(()=>{
                          setNav(true);
                       },1500)
                       
                       event.target.reset();
                  }
                  else{
                      toast.error(res.data.msg,{
                        position:"top-center",
                        theme:"dark",
                        autoClose:1500
                      })
                  }
                })
                .catch((err)=>{
                  console.log(err)
                })
           }
           else{
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`,form)
           .then((res)=>{
            console.log(res);
            if(res.data.status==1){
              setOtp(true);
              toast.success(res.data.msg,{
                position:"top-center",
                theme:"dark",
                autoClose:1500
              })
            }
           })
           .catch((err)=>{
            console.log(err);
           })
           }
           
   } 


   let loginUser=(event)=>{
          event.preventDefault();
          let form =new FormData(event.target);
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/insert`,form)
          .then((res)=>{
            console.log(res);
            if(res.data.status){
              toast.success(res.data.msg,{
                position:"top-center",
                theme:"dark",
                autoClose:1500
              })
              dispatch(logInUser(res.data.findUser));
              setTimeout(()=>{
                  setLoginNav(true);
              },1500)
              
              event.target.reset();
            }
            else{
              toast.error(res.data.msg,{
                position:"top-center",
                theme:"dark",
                autoClose:1500
              })
            }
          })
          .catch((err)=>{
            console.log(err);
          })
   }
   const provider=new GoogleAuthProvider();
   let googleLogin=()=>{
       signInWithPopup(auth,provider,browserPopupRedirectResolver)
       .then((result)=>{
         // This gives you a Google Access Token. You can use it to access the Google API.
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
         const user = result.user;
         console.log(user);
         console.log(token);
         console.log(credential);
         let sendObj={
          username:user.displayName,
          useremail:user.email,
          verified:user.emailVerified,
          userphone:user.phoneNumber??''
         }
         
         axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/google-login`,sendObj)
         .then((res)=>{
          console.log(res);
          dispatch(logInUser({token:res.data.token,userData:res.data.obj}));
         })
         .catch((err)=>{
          console.log(err);
         })
         
       })
       .catch((error)=>{
        // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
       })
   }



   useEffect(()=>{
    if(nav) redirect("/thanks")
    if(loginNav) redirect("/dashboard");
       
   },[nav,loginNav])
  return (
    <>
        <ToastContainer/> 
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
                   <Form className="" onSubmit={loginUser}>
                      <h3 className="fw-bold mb-4">Login</h3>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium mb-2">Username or Email</Form.Label>
                        <Form.Control type="text" name="loginEmail"></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium mb-2">Password</Form.Label>
                        <Form.Control type="password" name="loginPass"></Form.Control>
                      </Form.Group>
                      <div><Link href={'/forgetpassword'} className="text-decoration-none"><p style={{color:'burlywood',cursor:'pointer'}} className="fw-bold">Lost your password</p></Link></div>
                      <div className="d-flex align-items-center gap-3">
                        <label htmlFor="remember">Remember me</label>
                        <input type="checkbox" style={{width:'18px',height:'18px'}} id="remember" />
                      </div>
                      <button className="mt-4 fw-bold" style={{padding:'5px 20px',backgroundColor:'burlywood',borderRadius:'20px',color:'white'}}>Login</button>
                      <div className="google-icon-parent" onClick={googleLogin}><span className="google-icon"><FcGoogle/></span></div>
                   </Form>
                </Col>
                <Col lg={6}>
                    <Form className="" onSubmit={insertData}>
                         <h3 className="fw-bold mb-4">Register</h3>
                      <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">Enter UserName </Form.Label>
                            <Form.Control type="text" name="registerUserName" placeholder="Enter Username"></Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">Email Address</Form.Label>
                            <Form.Control type="email" name="registerEmail" placeholder="Enter Email Id"></Form.Control>
                      </Form.Group>
                      
                      <Form.Group  className="mb-4">
                      <Form.Label className="fw-medium mb-2">Password</Form.Label>
                       <InputGroup>
                           <Form.Control type={show?"text":"password"} name="registerPassword" placeholder="Enter Password"></Form.Control>
                           <InputGroup.Text>{show?<FaEyeSlash onClick={()=>setShow(false)}/>:<FaEye onClick={()=>setShow(true)}/>}</InputGroup.Text>
                       </InputGroup>
                       </Form.Group>
                       <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Address" name="registerAddress"></Form.Control>
                      </Form.Group>
                       <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">Mobile Number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter Your Number" name="registerNumber"></Form.Control>
                      </Form.Group>
                      {otp && 
                      <Form.Group className="mb-4">
                            <Form.Label className="fw-medium mb-2">OTP *</Form.Label>
                            <Form.Control type="text" placeholder="Enter OTP" name="registerOtp"></Form.Control>
                      </Form.Group>}
                      <div className="d-flex gap-3 justify-content-end ">
                      {/*<button className="mt-4 fw-bold" style={{padding:'5px 20px',backgroundColor:'burlywood',borderRadius:'20px',color:'white'}}>Get Otp</button>*/}
                      <button className="mt-4 fw-bold" style={{padding:'5px 20px',backgroundColor:'burlywood',borderRadius:'20px',color:'white'}}>{otp?"Verify":"Register"}</button>
                      </div>
                      </Form>
                </Col>
            </Row>
        </Container>
       </Container>
    </>
  )
}
