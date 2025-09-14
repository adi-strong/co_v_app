import type {Structure} from "../model/structureService.ts";
import {Col, Row} from "react-bootstrap";
import type {ReactNode} from "react";
import moment from "moment/moment";

export default function UniqueStructureData({ structure }: { structure: Structure }) {
  
  const {
    nom,
    tel,
    email,
    focal,
    createdAt,
    updatedAt,
  } = structure
  
  return (
    <>
      <Row className='mb-4 mt-4'>
        <Col md={3} className='theme-label fw-bold'>Dénomination</Col>
        <Col md={9} className='text-uppercase'>: {nom}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={3} className='theme-label fw-bold'>Point focal</Col>
        <Col md={9} className='text-uppercase'>: {focal ? focal : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={3} className='theme-label fw-bold'>Contact</Col>
        <Col md={9} className='text-uppercase'>: {tel ? tel : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={3} className='theme-label fw-bold'>E-mail</Col>
        <Col md={9} className='text-lowercase'>
          : {email ? (<span className='fst-italic text-primary text-decoration-underline'>{email}</span>) as ReactNode : '—'}
        </Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={3} className='theme-label fw-bold'>Date d'enregistrement</Col>
        <Col md={9} className='text-capitalize'>
          : {createdAt ? moment(createdAt).format('DD MMMM YYYY à HH:MM\'') : '—'}
        </Col>
      </Row>
      
      {updatedAt && (
        <Row className='mb-4 fw-bold'>
          <Col md={3} className='theme-label fst-italic'>Dernière modification</Col>
          <Col md={9} className='text-capitalize'>
            : <span className='fst-italic'>{moment(updatedAt).format('DD MMMM YYYY à HH:MM\'')}</span>
          </Col>
        </Row>
      )}
    </>
  )
  
}
