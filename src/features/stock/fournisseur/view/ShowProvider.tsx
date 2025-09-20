import type {Fournisseur} from "../model/fournisseurService.ts";
import {Col, Row} from "react-bootstrap";

export default function ShowProvider({ provider }: { provider: Fournisseur }) {
  
  const {
    nom,
    tel,
    email,
    nomCommercial,
    adresse,
    focal,
    abreviation,
    // createdAt,
    // updatedAt,
  } = provider
  
  return (
    <>
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Nom</Col>
        <Col md={8} className='text-uppercase'>: {nomCommercial}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Abréviation</Col>
        <Col md={8} className='text-uppercase'>: {abreviation ? abreviation : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Propriétaire</Col>
        <Col md={8} className='text-uppercase'>: {nom ? nom : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>N° Tél.</Col>
        <Col md={8} className='text-uppercase'>: {tel ? tel : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>E-mail</Col>
        <Col md={8} className='text-lowercase'>: {email ? email : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Point focal</Col>
        <Col md={8} className='text-uppercase'>: {focal ? focal : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Adresse</Col>
        <Col md={8} className='text-uppercase'>:</Col>
        <div className='white-space'>{adresse && adresse}</div>
      </Row>
    </>
  )
  
}
