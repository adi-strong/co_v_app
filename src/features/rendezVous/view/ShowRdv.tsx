import type {RendezVous} from "../model/rendezVousService.ts";
import {Card, Col, Row} from "react-bootstrap";
import moment from "moment";

export default function ShowRdv({ rdv }: { rdv: RendezVous }) {
  
  const {
    nom,
    objet,
    tel,
    email,
    done,
    date,
    releasedAt,
    fkAgent,
  } = rdv
  
  return (
    <>
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Nom</Col>
        <Col md={8} className='text-uppercase'>: {nom}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Objet</Col>
        <Col md={8} className='text-uppercase'>: {objet}</Col>
      </Row>
      
      <div className='bg-light-subtle p-2 mb-4' style={{ borderRadius: 6 }}>
        <Card.Title as='h4' className='mt-3 mb-3'><i className='bi bi-pin'/> Rencontre avec :</Card.Title>
        <p className='fw-bold text-uppercase fst-italic'>
          <i className='bi bi-person-fill me-1'/>
          {fkAgent ? fkAgent?.fullName ?? fkAgent.nom : '—'}
        </p>
        
        <p className='text-uppercase fst-italic'>
          <i className='bi bi-bag-check me-1'/>
          {fkAgent && fkAgent?.fkFonction ? fkAgent.fkFonction.nom : '—'}
        </p>
      </div>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>N° Tél.</Col>
        <Col md={8} className='text-uppercase'>: {tel ?? '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>E-mail</Col>
        <Col md={8} className='text-lowercase'>: {email ? email : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Effectivité</Col>
        <Col md={8} className='text-uppercase'>: {done ? 'OUI' : 'NON'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Date du rendez-vous</Col>
        <Col md={8} className='text-uppercase'>: {date ? moment(date).calendar() : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Date de publication</Col>
        <Col md={8} className='text-uppercase'>: {releasedAt ? moment(releasedAt).calendar() : '—'}</Col>
      </Row>
    </>
  )
  
}
