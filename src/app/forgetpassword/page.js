"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
let intervalId;
export default function ForgetPass() {
    let [otp, setOtp] = useState(false);
    let [navLogin, setNavLogin] = useState(false);
    let [count, setCount] = useState(1);
    let [resend, setResend] = useState(false);
    let[forgetEmail,setForgetEmail]=useState('');
    
    
    let otpTimer = () => {
        clearInterval(intervalId);
        setResend(false);
        setCount(1);
       intervalId = setInterval(() => {
               setCount(prev=>{
                if(prev<=60){
                    return prev+1;
                }
                else{
                    setResend(true);
                    clearInterval(intervalId);
                }
               })
        }, 1000)
    }

    let resetPassword = (event) => {
        event.preventDefault();
        let obj;
        if (otp) {
            obj = {
                forgetEmail: event.target.forgetEmail.value,
                forgetOtp: event.target.forgetOtp.value,
                forgetPass: event.target.forgetPass.value
            }
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/newpassword`, obj)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        toast.success(res.data.msg, {
                            position: "top-center",
                            theme: "dark",
                            autoClose: 1500
                        })
                        setTimeout(()=>{
                            setNavLogin(true);
                        },1500)
                        
                    }
                    else {
                        toast.error(res.data.msg, {
                            position: "top-center",
                            theme: "dark",
                            autoClose: 1500
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }


        else {
            setForgetEmail(event.target.forgetEmail.value);
            obj = { forgetEmail: event.target.forgetEmail.value }
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/resetpassword`, obj)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        toast.success(res.data.msg, {
                            position: "top-center",
                            theme: "dark",
                            autoClose: 1500
                        })
                        setOtp(true);
                        otpTimer();

                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


    let resendOtp= ()=>{
                 axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/resetpassword`,{forgetEmail})
                .then(async (res) => {
                    console.log(res);
                    if (res.data.status) {
                        toast.success(res.data.msg, {
                            position: "top-center",
                            theme: "dark",
                            autoClose: 1500
                        })
                        otpTimer();

                    }
                })
                .catch((err) => {
                    console.log(err);
                })
    }



    useEffect(() => {
        if (navLogin) redirect('/login')
    }, [navLogin])

    return (
        <>
            <ToastContainer />
            <div className="forget-pass-parent py-5">
                <Form className="forget-pass-form rounded-2 p-2 shadow-lg" onSubmit={resetPassword}>
                    <h3 className="mt-3">Reset Password</h3>
                    <Form.Group className="mb-2">
                        <Form.Label>Enter Email Address</Form.Label>
                        <Form.Control type="email" name="forgetEmail" placeholder="Enter Email Address"></Form.Control>
                    </Form.Group>
                    {otp &&
                        <div>
                            <Form.Group className="mb-4">
                                <Form.Label>OTP</Form.Label>
                                <Form.Control type="text" name="forgetOtp" placeholder="Enter Otp"></Form.Control>
                                <p className="mt-2">Expires in 60 Seconds: {resend ? <span className="text-primary" style={{ cursor: "pointer", fontSize: "16px" }} onClick={resendOtp}>resend otp</span> : count}</p>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Enter New Password</Form.Label>
                                <Form.Control type="password" name="forgetPass" placeholder="Enter New Password"></Form.Control>
                            </Form.Group>
                        </div>}

                    <div className="mb-4 mt-3" style={{ display: "flex", justifyContent: "center" }}>
                        <button className="reset-pass-button">Reset Password</button>
                    </div>
                </Form>
            </div>
        </>
    )
}