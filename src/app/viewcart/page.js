"use client";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ViewCart() {
    let cart=useSelector((store)=>store.cartStore.cart);
    let imagePath=useSelector((store)=>store.cartStore.imagePath);
    let subTotal=cart.reduce((acc,item)=>acc+(item.product.productSalePrice*item.quantity),0);
    let shipping=0;
    let total=subTotal+shipping;

    let removeCart=(id)=>{
        alert(id);
    }
  return (
     <>
      <Container fluid className="py-3">
         <Container className=" py-2">
            <Row>
                <Col lg={8}>
                 <table className="view-cart-table" >
                    <thead>
                        <tr>
                            <th className="view-cart-table-heading">Sr.No</th>
                            <th className="view-cart-table-heading">Product Image</th>
                            <th className="view-cart-table-heading">Product Name</th>
                            <th className="view-cart-table-heading">Price</th>
                            <th className="view-cart-table-heading">Color</th>
                            <th className="view-cart-table-heading">Quantity</th>
                            <th className="view-cart-table-heading">SubTotal</th>
                            <th className="view-cart-table-heading">Remove Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length!=0?
                          cart.map((item,index)=>{
                            let{color,product,quantity,_id}=item;
                            return(
                            <tr>
                                     <td className="view-cart-table-body">{index+1}</td>
                                     <td className="view-cart-table-body">
                                         <img src={imagePath+product.productImage}  width={150} height={100}/>
                                     </td>
                                     <td className="view-cart-table-body">
                                         {product.productName}
                                     </td>
                                     <td className="view-cart-table-body">{product.productSalePrice}</td>
                                     <td className="view-cart-table-body">
                                        <input type="color" disabled value={color.colorCode} style={{width:'30px',height:'30px'}} />
                                     </td>
                                     <td className="view-cart-table-body">
                                        <div className="d-flex gap-2">
                                            <span style={{cursor:'pointer'}}>-</span>
                                            <input type="text" style={{width:'30px',textAlign:'center'}} value={quantity}/>
                                            <span style={{cursor:'pointer'}}>+</span>
                                        </div>
                                     </td>
                                     <td className="view-cart-table-body">{product.productSalePrice*quantity}</td>
                                     <td className="view-cart-table-body">
                                         <button className="view-cart-table-button" onClick={()=>removeCart(_id)}>Remove</button>
                                     </td>
                             </tr>
                            )
                          })
                          :
                           <tr className="">
                            <td colSpan={8}>
                                <div className="d-flex justify-content-center">
                                <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" alt="Empty Cart Image"/>
                                </div>
                                <div style={{color:'burlywood'}} className="text-center fw-bold fs-5">Cart is Empty</div>
                            </td>
                           </tr>
                         } 
                        
                    </tbody>
                 </table>
                 </Col>
                 <Col>
                    <div className="p-3 border border-1 border-dark rounded-2 mt-3 mt-lg-0">
                        <h3 style={{color:'burlywood'}}>Cart Summary</h3>
                        <div className="d-flex justify-content-between mt-3">
                            <p style={{fontSize:'18px'}}>Sub Total</p>
                            <p style={{fontSize:'18px'}}>Rs: {subTotal}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p style={{fontSize:'18px'}}>Shipping</p>
                            <p style={{fontSize:'18px'}}>Free</p>
                        </div>
                         <div className="d-flex justify-content-between">
                            <p style={{fontSize:'18px'}} className="fw-bold">Total</p>
                            <p style={{fontSize:'18px'}} className="fw-bold">Rs: {total}</p>
                        </div>
                        <div>
                            <Link href={'/checkout'}><button className="w-100 rounded-2 py-1 fw-bold " style={{background:'burlywood',color:'white'}}>Proceed to Checkout</button></Link>
                            <Link href={'/'}><button className="w-100 rounded-2 py-1 fw-bold mt-2 ">Continue shoping</button></Link>
                        </div>
                    </div>
                 </Col>
                </Row>
          </Container>
      </Container>
     </>
  )
}
