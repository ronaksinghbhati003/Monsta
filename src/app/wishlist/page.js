import Link from "next/link";
import { Container, Table } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";

export default function page() {
  return (
    <>
         <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">My Wishlist</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>My Wishlist</span></p>
                </div>
          </Container>

          <Container fluid className="py-5">
            <Container className="border p-0">
                <Table className="w-100" border={0}>
                    <thead className="wishlist-head">
                        <tr className="text-center wishlist-head">
                            <th className="wishlist-heading-data">Delete</th>
                            <th className="wishlist-heading-data" style={{maxWidth:'200px'}}>Image</th>
                            <th className="wishlist-heading-data" style={{maxWidth:'250px'}}>Product</th>
                            <th className="wishlist-heading-data">Price</th>
                            <th className="wishlist-heading-data">Stock Status</th>
                            <th className="wishlist-heading-data">Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center" style={{minHeight:'150px',}}>
                                    <RxCross2 style={{color:'burlywood',fontSize:'30px'}}/>
                                </div>
                            </td>
                            <td className="border-1" style={{minHeight:'150px'}}>
                                 <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620077669499Erica%20Bookshelfs_brown.jpg" width={200} height={150} className="border " />
                            </td>
                            <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center" style={{minHeight:'150px',}}>
                                     Erica Bookshelfs
                                </div>
                             </td>
                             <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center fw-bold" style={{minHeight:'150px',}}>
                                     Rs. 30,000
                                </div>
                             </td>
                             <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center fw-bold" style={{minHeight:'150px',}}>
                                     Out Of Stock
                                </div>
                             </td>
                             <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center fw-bold" style={{minHeight:'150px',}}>
                                     <button className="py-2 px-4 text-white fw-bold border-0 rounded" style={{backgroundColor:"burlywood"}}>Add to Cart</button>
                                </div>
                             </td>
                        </tr>
                        <tr>
                            <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center" style={{minHeight:'150px',}}>
                                    <RxCross2 style={{color:'burlywood',fontSize:'30px'}}/>
                                </div>
                            </td>
                            <td className="border-1" style={{minHeight:'150px'}}>
                                 <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620077669499Erica%20Bookshelfs_brown.jpg" width={200} height={150} className="border " />
                            </td>
                            <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center" style={{minHeight:'150px',}}>
                                     Erica Bookshelfs
                                </div>
                             </td>
                             <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center fw-bold" style={{minHeight:'150px',}}>
                                     Rs. 30,000
                                </div>
                             </td>
                             <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center fw-bold" style={{minHeight:'150px',}}>
                                     Out Of Stock
                                </div>
                             </td>
                             <td className="p-3 border-1" style={{minHeight:'150px'}}>
                                <div className="d-flex justify-content-center align-items-center fw-bold" style={{minHeight:'150px',}}>
                                     <button className="py-2 px-4 text-white fw-bold border-0 rounded" style={{backgroundColor:"burlywood"}}>Add to Cart</button>
                                </div>
                             </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
          </Container>
    </>
  )
}
