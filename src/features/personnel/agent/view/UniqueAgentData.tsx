import type {Agent} from "../model/agentService.ts";
import RemoveAgentModal from "./RemoveAgentModal.tsx";
import {handleShow, sexLabel} from "../../../../services/services.ts";
import {ReactNode, useState} from "react";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import moment from "moment/moment";

export default function UniqueAgentData({ agent, isFetching, onRefresh }: {
  agent: Agent
  onRefresh: () => void
  isFetching: boolean
}) {
  
  const [show, setShow] = useState<boolean>(false)
  
  const {
    id,
    slug,
    fullName,
    nom,
    sexe,
    tel,
    email,
    fkFonction,
    fkDepartement,
    createdAt,
    updatedAt,
    fkService,
  } = agent
  
  return (
    <>
      <Row>
        <Col md={6} className='mb-3'>
          <Button size='sm' disabled={isFetching} variant='outline-primary' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1'/>) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm'/>) as ReactNode}
            Actualiser
          </Button>
        </Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Link to={`/app/agents/${id}/${slug}/edit`} className='btn btn-sm btn-primary me-1'>
            <i className='bi bi-pencil-square me-1'/> Modifier
          </Link>
          
          <Button size='sm' disabled={isFetching} variant='danger' onClick={(): void => handleShow(setShow)}>
            <i className='bi bi-trash me-1'/> Supprimer
          </Button>
        </Col>
      </Row>
      
      <hr className='mt-0'/>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Nom complet</Col>
        <Col md={8} className='text-uppercase'>: {fullName ?? nom}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Sexe</Col>
        <Col md={8} className='text-uppercase'>: {sexe ? sexLabel[sexe] : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>N° Tél</Col>
        <Col md={8} className='text-uppercase'>: {tel}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>E-mail</Col>
        <Col md={8} className='text-lowercase'>: {email ? email : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Département</Col>
        <Col md={8} className='text-uppercase'>: {fkDepartement ? fkDepartement.nom : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Service</Col>
        <Col md={8} className='text-uppercase'>: {fkService ? fkService.nom : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Fonction</Col>
        <Col md={8} className='text-uppercase'>: {fkFonction ? fkFonction.nom : '—'}</Col>
      </Row>
      
      <hr/>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Date d'enregistrement</Col>
        <Col md={8} className='text-capitalize'>
          : {createdAt ? moment(createdAt).format('DD MMMM YYYY à HH:MM\'') : '—'}
        </Col>
      </Row>
      
      {updatedAt && (
        <Row className='mb-4 fw-bold'>
          <Col md={4} className='theme-label fst-italic'>Dernière modification</Col>
          <Col md={8} className='text-capitalize'>
            : <span className='fst-italic'>{moment(updatedAt).format('DD MMMM YYYY à HH:MM\'')}</span>
          </Col>
        </Row>
      )}
      
      <RemoveAgentModal
        isRedirect
        onHide={(): void => handleShow(setShow)}
        data={agent}
        show={show}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
