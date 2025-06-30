'use client'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
export default function page() {

  const [data, setData] = useState([]);

  let getFaq = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq/view`)
      .then((res) => {
        console.log(res);
        setData(res.data.viewData);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getFaq();
  }, [])
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
            {data.map((item, index) => {
              const { faqQuestion, faqAnswer } = item;
              return (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header className='faq-question'>{faqQuestion}</Accordion.Header>
                  <Accordion.Body className='border'>{faqAnswer}
                  </Accordion.Body>
                </Accordion.Item>
              )
            })}
          </Accordion>
        </Container>
      </Container>
    </>
  )
}
