'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
export default function page() {
    let[show,setShow]=useState(null);
  return (
    <>

         <Container fluid className="border-bottom py-5 px-0 mb-5">
                <div>
                    <h2 className="text-center">Frequently Question</h2>
                    <p className="text-center"><span style={{ cursor: 'pointer' }}><Link href={'/'} style={{ color: "gray", textDecoration: "none" }}>Home</Link></span>&gt;<span style={{ color: 'burlywood', cursor: 'pointer' }}>Frequently Question</span></p>
                </div>
          </Container>

       <Container fluid className='py-5'>
        <Container>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='faq-question'>Accordion Item</Accordion.Header>
                    <Accordion.Body className='border'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                           aliquip ex ea commodo consequat. Duis aute irure dolor in
                           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                           culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header className='faq-question'>Accordion Item</Accordion.Header>
                    <Accordion.Body className='border'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                           aliquip ex ea commodo consequat. Duis aute irure dolor in
                           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                           culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header className='faq-question'>Accordion Item</Accordion.Header>
                    <Accordion.Body className='border'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                           aliquip ex ea commodo consequat. Duis aute irure dolor in
                           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                           culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header className='faq-question'>Accordion Item</Accordion.Header>
                    <Accordion.Body className='border'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                           aliquip ex ea commodo consequat. Duis aute irure dolor in
                           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                           culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
              </Accordion>
        </Container>
       </Container>
    </>
  )
}
