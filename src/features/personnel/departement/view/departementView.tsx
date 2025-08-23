import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import DepartementForm from "./DepartementForm.tsx";
import DepartementsList from "./DepartementsList.tsx";

const DepartementView = () => {
  
  useDocumentTitle('Départements')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Départements'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <DepartementForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <DepartementsList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(DepartementView)
