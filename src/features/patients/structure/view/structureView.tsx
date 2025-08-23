import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import StructureForm from "./StructureForm.tsx";
import StructureList from "./StructureList.tsx";

const StructureView = () => {
  
  useDocumentTitle('Structures')
  useActivePage('structures')
  
  return (
    <BodyContainer>
      <PageTitles title='Structures'/>
      
      <Row>
        <Col md={3} className='mb-3'>
          <StructureForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={9} className='mb-3'>
          <StructureList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(StructureView)
