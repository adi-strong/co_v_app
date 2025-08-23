import {memo} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import CategorieExamForm from "./CategorieExamForm.tsx";
import CategorieExamList from "./CategorieExamList.tsx";
import {useActivePage, useDocumentTitle} from "../../../../hooks";

const CategorieExamView = () => {
  
  useDocumentTitle('Catégories des examens')
  useActivePage('params')

  return (
    <BodyContainer>
      <PageTitles title='Catégories des examens'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <CategorieExamForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <CategorieExamList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(CategorieExamView)
