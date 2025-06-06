'use client'
import { Provider } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import myStore from "../store/myStore";



export default function MainLayout({children}) {
  /*useEffect(()=>{
         let color=['linear-gradient(to right, #8d6e63, #ffffff)',
          ' linear-gradient(to right, #deb887, #ffffff)',
          'radial-gradient(circle, #deb887, #ffffff)',
          'linear-gradient(to right, #deb887, #f5f5f5, #ffffff)'
        ]
         
         const interval=setInterval(()=>{
          let index=Math.floor(Math.random()*4);
          let body=document.querySelector('body');
           body.style.background=color[index];
           return()=>clearInterval(interval);
         },2000)
          return ()=>clearInterval(interval);
        
  },[])*/

  
  return (
      
         <Provider store={myStore}>
           {children}
         </Provider>
    
  )
}
