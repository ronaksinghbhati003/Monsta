'use client';
import { redirect } from "next/navigation";

export default function not_found() {
  let homePage=()=>{
    redirect('/');  
  }
  return (
    <div className="py-5">
         <h1 className="text-center page-not-found">404 Page Not Found</h1>
         <div className="text-center mt-5"><button className="py-2 px-3 fw-bold rounded-2" onClick={()=>homePage()}>Home Page</button></div>
    </div>
  )
}
