import {memo} from 'react';
import {BodyContainer, PageTitles, SearchComp} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Col, Row} from "react-bootstrap";
import CategorieLitList from "./CategorieLitList.tsx";
import CategorieLitForm from "./CategorieLitForm.tsx";

const CategorieLitView = () => {
  
  useDocumentTitle('Catégories des lits')
  useActivePage('params')

  return (
    <BodyContainer>
      <PageTitles title="Catégories des lits d'h'ospitalisation"/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <CategorieLitForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <CategorieLitList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(CategorieLitView)
