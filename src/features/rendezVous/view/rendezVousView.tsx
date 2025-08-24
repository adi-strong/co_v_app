import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles} from "../../../components";
import {Col, Row} from "react-bootstrap";
import RdvList from "./RdvList.tsx";
import RdvForm from "./RdvForm.tsx";

const RendezVousView = () => {
  
  useDocumentTitle('Rendez-vous')
  useActivePage('home')
  
  return (
    <BodyContainer>
      <PageTitles title='Rendez-vous' />
      
      <Row>
        <Col md={4} className='mb-3'>
          <RdvForm/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <RdvList/>
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(RendezVousView)
