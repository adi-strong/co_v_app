import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import ExamsList from "./ExamsList.tsx";
import ExamForm from "./ExamForm.tsx";

const ExamenView = () => {
  
  useDocumentTitle('Examens')
  useActivePage('treats')

  return (
    <BodyContainer>
      <PageTitles title='Examens'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <ExamForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <ExamsList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(ExamenView)
