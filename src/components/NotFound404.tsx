import {Col, Container, Image, Row} from "react-bootstrap";
import errorImg from '../assets/images/error/404-error-img.png'
import {Link} from "react-router-dom";
import {useDocumentTitle} from "../hooks";

const NotFound404 = () => {
  
  useDocumentTitle('Erreur 404 !')

  return (
    <Container className='min-vh-100 d-flex justify-content-center align-items-center'>
      <Row>
        <Col>
          <div className='text-center'>
            <div className='mb-3'>
              <Image fluid src={errorImg}/>
            </div>
            
            <h1 className='display-4 fw-bold'>Oups ! la page n'a pas été trouvée.</h1>
            <p className='mb-4'>Ou profitez simplement de l’expertise de notre équipe IT.</p>
            <Link to='/app/profil' className='btn btn-primary'><i className='bi bi-chevron-left' /> Retour</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
  
};

export default NotFound404;
