import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import ServiceForm from "./ServiceForm.tsx";
import ServicesList from "./ServicesList.tsx";

const ServiceView = () => {
  
  useDocumentTitle('Services')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Services'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <ServiceForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <ServicesList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(ServiceView)
