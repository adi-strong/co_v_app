import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import UniteConsommationForm from "./UniteConsommationForm.tsx";
import UniteConsommationList from "./UniteConsommationList.tsx";

const UniteConsommationView = () => {
  
  useDocumentTitle('Unités de consommations')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Unités de consommations'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <UniteConsommationForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <UniteConsommationList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(UniteConsommationView)
