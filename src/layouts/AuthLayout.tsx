// src/layouts/AuthLayout.tsx
import {Link, Outlet} from 'react-router-dom'
import {Card, Col, Container, Image, Row} from 'react-bootstrap'
import logo from '../assets/images/logo-md.png'

export default function AuthLayout() {
  return (
    <Container className='d-flex flex-column'>
      <Row className='align-items-center justify-content-center g-0 min-vh-100'>
        <Col md={8} lg={6} xxl={4} className='py-8 py-xl-0'>
          <Card className='smooth-shadow-md'>
            <Card.Body className='p-6'>
              <div className='mb-4 text-center'>
                <Link to='/' className='text-center'>
                  <Image
                    roundedCircle
                    src={logo}
                    className='mb-2'
                    alt=''
                    width={120}
                    height={120}
                  />
                </Link>
                <p className='mb-6'>Veuillez saisir vos informations d'utilisateur.</p>
              </div>
              
              <Outlet/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
