import {memo} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import CategorieExamForm from "../../categorieExam/view/CategorieExamForm.tsx";
import CategorieExamList from "../../categorieExam/view/CategorieExamList.tsx";
import TypeDocSuiviForm from "./TypeDocSuiviForm.tsx";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import TypeDocSuiviList from "./TypeDocSuiviList.tsx";

const TypeDocSuiviView = () => {
  
  useDocumentTitle('Types des documents de suivi')
  useActivePage('params')

  return (
    <BodyContainer>
      <PageTitles title='Types des documents de suivi'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <TypeDocSuiviForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <TypeDocSuiviList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(TypeDocSuiviView)
