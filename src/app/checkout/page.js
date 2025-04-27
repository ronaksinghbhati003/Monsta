"use client";
import Link from "next/link";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
export default function page() {
    return (
        <>
            <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">CheckOut</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>Checkout</span></p>
                </div>
            </Container>

            <Container fluid className="py-3">
                <Container className="">
                    <Form>
                    <Row className="g-5">
                        <Col lg={6}>
                            <div>
                                <p className="py-2 ps-2 checkout-heading">BILLING DETAILS</p>
                                    <div className="d-flex gap-3 mb-3">
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">Name *</Form.Label>
                                            <Form.Control type="text"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">Mobile Number *</Form.Label>
                                            <Form.Control type="tel"></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="d-flex gap-3 mb-3">
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">Billing Name *</Form.Label>
                                            <Form.Control type="text"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">Billing Email *</Form.Label>
                                            <Form.Control type="tel"></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Billing Mobile Number *</Form.Label>
                                        <Form.Control type="tel"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Billing Address *</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <p className="fw-bold m-1">Country *</p>
                                    <Form.Select className="mb-3">
                                        <option>Select Country</option>
                                        <option>India</option>
                                        <option>Pakistan</option>
                                        <option>China</option>
                                    </Form.Select>
                                    <div className="d-flex gap-3 mb-3">
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">State *</Form.Label>
                                            <Form.Control type="text"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="w-50">
                                            <Form.Label className="fw-bold">City *</Form.Label>
                                            <Form.Control type="text"></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mt-4">
                                        <input type="checkbox" style={{ width: '18px', height: "18px" }} id="Checkbox" />
                                        <label style={{ padding: "5px 10px", backgroundColor: "black", color: "white" }} htmlFor="Checkbox">Ship to a different address?</label>
                                    </div>
                                    <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className="fw-bold">Order Notes</Form.Label>
                                        <Form.Control as="textarea" rows={5} style={{ resize: 'none' }} placeholder=" Notes about your order, e.g. special notes for delivery." />
                                    </Form.Group>
                            </div>
                        </Col>

                        <Col lg={6}>
                        <p className="py-2 ps-2 checkout-heading">Your Order</p>
                        <Table>
                            <thead>
                                <tr className="text-center fs-5">
                                    <td style={{backgroundColor:'gray'}} className="border-end">Product</td>
                                    <td style={{backgroundColor:'gray'}}>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center fw-bold">
                                    <td>Caroline Study Tables × 1</td>
                                    <td>Rs. 2,500</td>
                                </tr>
                                <tr className="text-center fw-bold">
                                    <td>Cart Sub Total</td>
                                    <td>Rs. 2,500</td>
                                </tr>
                                <tr className="text-center fw-bold">
                                    <td>Discount (-)</td>
                                    <td>0</td>
                                </tr>
                                <tr className="text-center fw-bold">
                                    <td>Order Total</td>
                                    <td>Rs. 2,500</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="w-100 mt-5 d-flex justify-content-end">
                            <button className="py-2 px-4 fw-bold" style={{backgroundColor:'burlywood',color:'white'}}>Place Order</button>
                        </div>
                        </Col>
                    </Row>
                    </Form>
                </Container>
            </Container>
        </>
    )
}
