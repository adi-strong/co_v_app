import type {Reception} from "../model/receptionService.ts";
import {Col, Row} from "react-bootstrap";
import {sexLabel} from "../../../services/services.ts";
import moment from "moment";

export default function ShowReception({ reception }: { reception: Reception }) {
  
  return (
    <>
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Nom</Col>
        <Col md={8} className='text-uppercase'>: {reception.nomComplet}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Motif</Col>
        <Col md={8} className='text-uppercase'>: {reception.motif}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Patient(e) ?</Col>
        <Col md={8} className='text-uppercase'>: {reception?.estCePatient ? 'Oui' : 'Non'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Sexe</Col>
        <Col md={8} className='text-uppercase'>: {sexLabel[reception.sexe]}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Lieu de naissance</Col>
        <Col md={8} className='text-uppercase'>: {reception?.lieuNaissance ? reception.lieuNaissance : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>Date de naissance</Col>
        <Col md={8} className='text-uppercase'>
          : {reception?.dateNaissance ? moment(reception.dateNaissance).format('DD/MM/YY') : '—'}
        </Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>N° Tél</Col>
        <Col md={8} className='text-uppercase'>: {reception?.tel ? reception.tel : '—'}</Col>
      </Row>
      
      <Row className='text-dark mb-4'>
        <Col md={4} className='fw-bold'>E-mail</Col>
        <Col md={8} className='text-lowercase fst-italic'>: {reception?.email ? reception.email : '—'}</Col>
      </Row>
      
      <div className='text-dark mb-4'>
        <div className='fw-bold'>Commentaire(s) :</div>
        <div className='fst-italic white'>{reception?.commentaire ? reception.commentaire : '...'}</div>
      </div>
    </>
  )
  
}
