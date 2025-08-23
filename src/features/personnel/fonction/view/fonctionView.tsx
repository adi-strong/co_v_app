import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import FonctionForm from "./FonctionForm.tsx";
import FonctionsList from "./FonctionsList.tsx";

const FonctionView = () => {
  
  useDocumentTitle('Fonctions')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Fonctions'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <FonctionForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <FonctionsList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(FonctionView)
