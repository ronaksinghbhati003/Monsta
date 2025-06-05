'use client'
import axios from "axios";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars, FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { cartData } from "../slice/cartSlice";
import { logOut } from "../slice/loginSlice";


export default function Header() {
  let userData = useSelector((store) => store.loginStore.user);
  let token = useSelector((store) => store.loginStore.token);
  let dispatch = useDispatch();
  let cart=useSelector((store)=>store.cartStore.cart)
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [show, setShow] = useState(false);
  const [living, setLiving] = useState(false);
  let [table, setTable] = useState(false);
  let [storage, setStorage] = useState(false);
  let [mirror, setMirror] = useState(false);
  let [sofa, setSofa] = useState(false);
  let [sofaBed, setSofaBed] = useState(false);
  let [sofaSet, setSofaSet] = useState(false);
  let [jhula, setJhula] = useState(false);
  let [pages, setPages] = useState(false);
  let [headerCart, setHeaderCart] = useState(false);
  let [contact, setContact] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let logo = useRef(null);
  let Offcanvaslogo = useRef(null);

  useEffect(() => {
    gsap.from(logo.current, {
      x: -500,
      opacity: 0,
      duration: 1,
      delay: 1
    })

    let header = document.querySelector('header')
    let img = document.querySelector('.deskstop-menu-logo')
    let headerAnimation = () => {
      if (window.scrollY > 126) {
        header.style.position = "sticky";
        header.style.top = "0";
        img.style.display = "block";
        header.classList.add('startAnimation');
        header.style.backgroundColor = "white";
      }
      else {
        img.style.display = "none"
        header.classList.remove('startAnimation');
        header.style.background = "none";
      }
    }

    window.addEventListener("scroll", headerAnimation)

  }, [])

  let offCanvasAnimation = () => {
    gsap.to(Offcanvaslogo.current, {
      x: 0,
      opacity: 1,
      duration: 1,
    })
  }

  let getData = () => {
    axios.get(`${apiUrl}/company/view`)
      .then(res => {
        setContact(res.data.viewData);
      })
      .catch(err => {
        console.log(err);
      })
  }

  let getCartData = () => {
    axios.post(`${apiUrl}/cart/viewcart`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res);
        dispatch(cartData({ cartData: res.data.viewCart, imagePath: res.data.staticPath }));
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getData();
    if (token) {
      getCartData();
    }
  }, [token])
  return (
    <>
      <HeaderCart data={{ headerCart, setHeaderCart }} />

      <Container fluid className="border-bottom d-lg-block d-none">
        <Container className="py-2">
          <div className="d-flex justify-content-between">
            <div className="header-top">
              Contact us 24/7 : {contact[0]?.companyMobile} / {contact[0]?.companyEmail}
            </div>
            <div className="header-top">
              {userData ? <span><span style={{ color: 'burlywood', fontSize: '16px', fontFamily: 'sans-serif', }} className="me-2">{userData.userName}</span><span style={{ cursor: 'pointer' }} onClick={() => dispatch(logOut())}>Log Out</span></span> : <Link href={'/login'} style={{ color: 'black', textDecoration: 'none' }}><span>Login/Register</span></Link>}
            </div>
          </div>
        </Container>
      </Container>




      <Container fluid className="border-bottom">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center gap-2">

            <div>
              <img src="/logo.png" alt='Logo' className="header-logo" ref={logo} />
            </div>


            <div className="d-flex justify-content-evenly align-items-center gap-3">
              <form className="header-search-box d-lg-block d-none">
                <input type="text" placeholder="Search Product" className=" header-input" />
                <FaSearch className="searcg-logo" />
              </form>
              <div className="header-heart">
                <FaHeart className="heart" />
              </div>
              <div className="d-flex align-items-center header-cart gap-2" onClick={() => setHeaderCart(!headerCart)}>
                <div className="cart-number d-flex justify-content-center align-items-center">{cart.length}</div>
                <div className="pe-2 border-end"><FaShoppingCart /></div>
                <div className="cart-price d-sm-block d-none">Rs:{cart.reduce((accumlator,item)=>accumlator+item.product.productSalePrice,0)}</div>
              </div>
            </div>


            <Button onClick={handleShow} className="d-lg-none d-block mobile-menu">
              <FaBars />
            </Button>

            <Offcanvas show={show} onHide={handleClose} onEntered={offCanvasAnimation}>


              <Offcanvas.Header closeButton>
                <Offcanvas.Title >
                  <img src="/logo.png" width={150} ref={Offcanvaslogo} className="offcanvas-logo" />
                </Offcanvas.Title>
              </Offcanvas.Header>




              <Offcanvas.Body>
                <h1 className="mobile-menu-header">Contact us 24/7 : +91-9781234560</h1>
                <h1 className="mobile-menu-header">furniture@gmail.com</h1>


                <ul className="offcanvas-menu">
                  <li className="offcanvas-menu-list"><span className="ps-2">Home</span></li>


                  <li className="offcanvas-menu-list"><span className="ps-2">Living</span>
                    <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${living ? 'rotate' : ''}`} onClick={() => setLiving(!living)} />

                    <ul className={`living-submenu ${living ? 'showSubMenu' : ""}`}>
                      <li>Tables
                        <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${table ? 'rotate' : ''}`} onClick={() => setTable(!table)} />
                        <ul className={`table-sub-menu ${table ? 'show-table-sub-menu' : ''}`}>
                          <li>Side And end Tables</li>
                          <li>Nest Of Tables</li>
                          <li>Console Table</li>
                          <li>Coffe Table sets</li>
                          <li>Coffe Tables</li>
                        </ul>
                      </li>


                      <li>Living Storage
                        <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${storage ? 'rotate' : ''}`} onClick={() => setStorage(!storage)} />
                        <ul className={`table-sub-menu ${storage ? 'show-table-sub-menu' : ''}`}>
                          <li>Prayer Units</li>
                          <li>Display Unit</li>
                          <li>Shoe Racks</li>
                          <li>Chest Of Drawers</li>
                          <li>Cabinets and Sideboard</li>
                          <li>Bookshelves</li>
                          <li>Tv Units</li>

                        </ul>
                      </li>

                      <li>Mirrors
                        <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${mirror ? 'rotate' : ''}`} onClick={() => setMirror(!mirror)} />
                        <ul className={`table-sub-menu ${mirror ? 'show-table-sub-menu' : ''}`}>
                          <li>Wooden Mirrors</li>
                        </ul>
                      </li>

                    </ul>
                  </li>



                  <li className="offcanvas-menu-list"><span className="ps-2">Sofa</span>
                    <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${sofa ? 'rotate' : ''}`} onClick={() => setSofa(!sofa)} />

                    <ul className={`living-submenu ${sofa ? 'showSubMenu' : ""}`}>
                      <li>Sofa Cum Bed
                        <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${sofaBed ? 'rotate' : ''}`} onClick={() => setSofaBed(!sofaBed)} />
                        <ul className={`table-sub-menu ${sofaBed ? 'show-table-sub-menu' : ''}`}>
                          <li>Wooden Sofa Cum Bed</li>
                        </ul>
                      </li>


                      <li>Sofa Sets
                        <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${sofaSet ? 'rotate' : ''}`} onClick={() => setSofaSet(!sofaSet)} />
                        <ul className={`table-sub-menu ${sofaSet ? 'show-table-sub-menu' : ''}`}>
                          <li>L Shape Sofa</li>
                          <li>1 Seater Sofa</li>
                          <li>2 Seater Sofa</li>
                          <li>3 Seater Sofa</li>
                          <li>Wooden Sofa Sets</li>
                        </ul>
                      </li>

                      <li>Swing Jhula
                        <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${jhula ? 'rotate' : ''}`} onClick={() => setJhula(!jhula)} />
                        <ul className={`table-sub-menu ${jhula ? 'show-table-sub-menu' : ''}`}>
                          <li>Wooden Jhula</li>
                        </ul>
                      </li>

                    </ul>
                  </li>


                  <li className="offcanvas-menu-list"><span className="ps-2">Pages</span>
                    <MdKeyboardArrowDown className={`offcanvas-menu-arrow ${pages ? 'rotate' : ''}`} onClick={() => setPages(!pages)} />
                    <ul className={`living-submenu ${pages ? 'showSubMenu' : ''}`}>
                      <li>About Us</li>
                      <li>Cart</li>
                      <li>Checkout</li>
                      <li>Fequently Questions</li>
                    </ul>
                  </li>



                  <li className="offcanvas-menu-list"><span className="ps-2">Login/Register</span>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>

          </div>
        </Container>
      </Container>

      <header className="header">
        <Container fluid className="d-lg-block d-none border-bottom">
          <Container className="py-2">
            <ul className="d-flex justify-content-center align-items-center gap-5 deskstop-header-menu">
              <img src="/logo.png" width={150} className="deskstop-menu-logo" />
              <li><Link href={'/'} style={{ color: 'black', textDecoration: 'none' }}>Home</Link></li>
              <li>Living
                <MdKeyboardArrowDown className="deskstop-heade-menu-arrow" />
                <div className="deskstop-header-submenu d-flex justify-content-between">
                  <ul className="deskstop-header-submenu-list">
                    <h1>Tables</h1>
                    <li><Link href={'/cart'} style={{ color: "gray", textDecoration: "none" }}>Side And end Tables</Link></li>
                    <li>Nest of Tables</li>
                    <li>Console Table</li>
                    <li>Coffe Table Sets</li>
                    <li>Coffe Tables</li>
                  </ul>
                  <ul className="deskstop-header-submenu-list">
                    <h1>Prayers Unit</h1>
                    <li>Display Unit</li>
                    <li>Shoe Racks</li>
                    <li>Chest of Drawers</li>
                    <li>Caninets and Sideboard</li>
                    <li>Bookshelves</li>
                    <li>TV unit</li>
                  </ul>
                  <ul className="deskstop-header-submenu-list">
                    <h1>Mirrors</h1>
                    <li>Wooden Mirrors</li>
                  </ul>
                </div>
              </li>

              <li>Sofa
                <MdKeyboardArrowDown className="deskstop-heade-menu-arrow" />
                <div className="deskstop-header-submenu d-flex justify-content-between">
                  <ul className="deskstop-header-submenu-list">
                    <h1>Sofa Cum Bed</h1>
                    <li>Wooden Sofa Cum Bed</li>
                  </ul>
                  <ul className="deskstop-header-submenu-list">
                    <h1>Sofa Seats</h1>
                    <li>L shape Sofa</li>
                    <li>1 Seater Sofa</li>
                    <li>2 Seater Sofa</li>
                    <li>3 Seater Sofa</li>
                    <li>Wooden Sofa Sets</li>
                  </ul>
                  <ul className="deskstop-header-submenu-list">
                    <h1>Swing Jhula</h1>
                    <li>Wooden Jhula</li>
                  </ul>
                </div>
              </li>

              <li>Pages
                <MdKeyboardArrowDown className="deskstop-heade-menu-arrow" />
                <div className="deskstop-header-submenu pages d-flex justify-content-between">
                  <ul className="deskstop-header-submenu-list">
                    <li><Link href={'/about-us'} style={{ color: "gray", textDecoration: "none" }}>About us</Link></li>
                    <li><Link href={'/cart'} style={{ color: "gray", textDecoration: "none" }}>Cart</Link></li>
                    <li><Link href={'/checkout'} style={{ color: "gray", textDecoration: "none" }}>Check Out</Link></li>
                    <li><Link href={'/question'} style={{ color: "gray", textDecoration: "none" }}>Frequently Question</Link></li>
                  </ul>
                </div>
              </li>

              <li>
                <Link href={'/contact-us'} style={{ color: "black", textDecoration: "none" }}>Contact Us</Link>

              </li>
            </ul>
          </Container>
        </Container>
      </header>
    </>
  )
}

function HeaderCart({ data }) {
  let { headerCart, setHeaderCart } = data;
  let cartData = useSelector((store) => store.cartStore.cart);
  let imagePath = useSelector((store) => store.cartStore.imagePath)
  return (
    <>
      {headerCart ?
        <div className="fixed" onClick={() => setHeaderCart(false)}>
          <div className={`header-cart-menu p-4 ${headerCart ? 'header-cart-menu-show' : " "}`}>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <h1 className="fs-5 fw-bold">Cart</h1>
              <RxCross1 className="header-cart-closeButton" onClick={() => setHeaderCart(!headerCart)} />
            </div>


            {
              cartData.length == 0 ?
                <div>
                  <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" alt="Empty Cart Image" />
                  <div style={{color:'burlywood'}} className="text-center fw-bold fs-5">Cart is Empty</div>
                </div>
                :


                cartData.map((item, index) => {
                  let{product,quantity,color}=item;
                  return (
                    <div className="d-flex justify-content-between mt-4 pb-4 border-bottom gap-2" key={index}>
                      < div className="d-flex align-items-center gap-2">
                        <div className="header-cart-image">
                          <img  src={imagePath+product.productImage} width={150} height={150}/>
                        </div>
                        <div className="header-cart-item-detail">
                          <h6>{product.productName}</h6>
                          <p>Qty : {quantity}</p>
                          <p style={{ fontSize: '16px', color: 'burlywood', marginTop: '-10px' }}>Rs : {product.productSalePrice}</p>
                          <label>Color</label>
                          <input type="color" value={color.colorCode} style={{width:'25px',height:'25px',position:'relative',left:'30px',top:'6px'}} className="rounded-circle" disabled />
                        </div>
                      </div>
                      <div>
                        <RxCross1 />
                      </div>
                    </div>
                  )
                })


            }



            {/*<div className="d-flex justify-content-between mt-4 pb-4 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <div className="header-cart-image">
                  <img className="img-fluid" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg" />
                </div>
                <div className="header-cart-item-detail">
                  <h6>Louise Cabinet</h6>
                  <p>Qty :2</p>
                  <p style={{ fontSize: '16px', color: 'burlywood', marginTop: '-10px' }}>Rs :46000</p>
                </div>
              </div>
              <div>
                <RxCross1 />
              </div>
            </div>*/}


            <div className="d-flex justify-content-between header-cart-subtotal mt-3 pb-2 border-bottom">
              <p>SubTotal Rs :</p>
              <p>{cartData.reduce((accumlator,item)=>accumlator+item.product.productSalePrice,0)}</p>
            </div>

            <div className="p-3 bg-black">
              <Link href={'/viewcart'}><Button className="btn btn-dark w-100 fw-bold">View Cart</Button></Link>
              <Link href={'/checkout'}><Button className="w-100 mt-3 fw-bold" style={{ background: 'burlywood' }}>Check Out</Button></Link>
            </div>

          </div>
        </div>
        : ''}
    </>
  )
}
