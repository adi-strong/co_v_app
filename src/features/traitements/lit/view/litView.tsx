import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import LitForm from "./LitForm.tsx";
import LitsLits from "./LitsLits.tsx";

const LitView = () => {
  
  useDocumentTitle("Lits d'hospitalisation")
  useActivePage('treats')
  
  return (
    <BodyContainer>
      <PageTitles title="Lits d'hospitalisation"/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <LitForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <LitsLits/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(LitView)
