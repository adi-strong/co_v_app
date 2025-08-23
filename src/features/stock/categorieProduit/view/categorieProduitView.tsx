import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import CategorieProduitForm from "./CategorieProduitForm.tsx";
import CategorieProduitList from "./CategorieProduitList.tsx";

const CategorieProduitView = () => {
  
  useDocumentTitle('Catégories des produits')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Catégories des produits'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <CategorieProduitForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <CategorieProduitList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(CategorieProduitView)
