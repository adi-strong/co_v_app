import {Card, Col, Image, Row} from "react-bootstrap";
import logo from '../../../../assets/images/logo-md.png'
import moment from "moment";

export default function PrescriptionToPrint() {
  
  return (
    <>
      <Row>
        <Col sm={4}>
          <Card.Title as='h5' className='text-primary mb-0'>
            Dr. Nom & Prénom
          </Card.Title>
          Médecin Généraliste <br/>
          Tél : +243 891 759 667 <br/>
          E-mail : adi.life91@gmail.com
        </Col>
        
        <Col sm={4} className='text-center'>
          <Image
            roundedCircle
            width={100}
            height={100}
            src={logo}
            alt='logo'
          />
        </Col>
        
        <Col sm={4} className='text-end'>
          <Card.Title as='h5' className='text-primary mb-0'>
            Nom du Centre
          </Card.Title>
          Adresse : ici ... <br/>
          Tél : +243 904 651 464 <br/>
          E-mail : backoffice.pro@gmail.com
        </Col>
      </Row>
      
      <hr className='mt-7 border-2 text-primary'/>
      
      <Row className='mt-7'>
        <Col sm={6} className='mb-3'>
          <Card.Title as='h4' className='text-dark'><i className='bi bi-capsule-pill'/> Ordonnance Médicale</Card.Title>
        </Col>
        
        <Col sm={6} className='mb-3 text-end'>
          Le {moment(new Date()).format('DD MMMM YYYY')}
        </Col>
      </Row>
      
      <div className='text-dark pt-8'>
        <h5>Nom du patient</h5>
        <p className='mb-8'>âge du patient</p>
        
        <p>- NOM DU PRODUIT dosage, posologie et commentaires</p>
        <p>- NOM DU PRODUIT dosage, posologie et commentaires</p>
        <p>- NOM DU PRODUIT dosage, posologie et commentaires</p>
      </div>
    </>
  )
  
}
