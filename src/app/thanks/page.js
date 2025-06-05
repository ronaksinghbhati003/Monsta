"use client"

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Thank() {
  let register=useRef(null);
  console.log(register);
  useEffect(()=>{
      let thanks=gsap.context(()=>{
           gsap.from(register.current,{
           x:-200,
           duration:2,
           opacity:1
        })
      })

     return()=>thanks.revert();
        
  },[])
  return (
    <>
    <div className="border shadow-lg py-4 thanks" >
       <h3 className="text-center fw-semibold" ref={register}>Register Successfully</h3>
       <p className="text-center fs-5 fw-bold">Thanks for registering! Welcome to Monsta — you’re all set to dive in.</p>
       <div className="thanks-button-parent"><Link href={'/login'}><button>Log In</button></Link></div>
    </div>
    </>
  )
}
