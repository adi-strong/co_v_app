import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import TypeConsultForm from "./TypeConsultForm.tsx";
import TypeConsultList from "./TypeConsultList.tsx";

const TypeConsultationView = () => {
  
  useDocumentTitle('Types des fiches de consultations')
  useActivePage('params')

  return (
    <BodyContainer>
      <PageTitles title='Types des fiches de consultations'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <TypeConsultForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <TypeConsultList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(TypeConsultationView)
