import type {Patient} from "../model/patientService.ts";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import type {ReactNode} from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {etatCivilLabel, handleShow, sexLabel} from "../../../../services/services.ts";
import RemovePatientModal from "./RemovePatientModal.tsx";
import {useGetPatientsQuery} from "../model/patient.api.slice.ts";
import moment from "moment";

export default function UniquePatientData({ patient, isFetching, onRefresh }: {
  patient: Patient,
  isFetching: boolean,
  onRefresh: () => void
}) {
  
  const [show, setShow] = useState<boolean>(false)
  
  const {
    id,
    slug,
    fullName,
    nom,
    sexe,
    etatCivil,
    lieuDeNaissance,
    dateDeNaissance,
    nationalite,
    pere,
    mere,
    tel,
    email,
    createdAt,
    updatedAt,
    fkStructure,
  } = patient
  const { refetch } = useGetPatientsQuery('LIST')
  
  return (
    <>
      <Row>
        <Col md={6} className='mb-3'>
          <Button size='sm' disabled={isFetching} variant='outline-primary' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1' />) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm' />) as ReactNode}
            Actualiser
          </Button>
        </Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Link to={`/app/patients/${id}/${slug}/edit`} className='btn btn-sm btn-primary me-1'>
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
        <Col md={4} className='theme-label'>État-civil</Col>
        <Col md={8} className='text-uppercase'>: {etatCivil ? etatCivilLabel[etatCivil] : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Lieu de naissance</Col>
        <Col md={8} className='text-uppercase'>: {lieuDeNaissance ? lieuDeNaissance : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Date de naissance</Col>
        <Col md={8} className='text-uppercase'>
          : {dateDeNaissance ? moment(dateDeNaissance).format('DD / MM / YYYY') : '—'}
        </Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Nationalité</Col>
        <Col md={8} className='text-uppercase'>: {nationalite ? nationalite : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>N° Tél.</Col>
        <Col md={8} className='text-uppercase'>: {tel ? tel : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>E-mail</Col>
        <Col md={8} className='text-lowercase'>
          : {email ? (<span className='text-decoration-underline text-primary fst-italic'>{email}</span>) as ReactNode : '—'}
        </Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Père</Col>
        <Col md={8} className='text-uppercase'>: {pere ? pere : '—'}</Col>
      </Row>
      
      <Row>
        <Col md={4} className='theme-label'>Mère</Col>
        <Col md={8} className='text-uppercase'>: {mere ? mere : '—'}</Col>
      </Row>
      
      <hr/>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Date d'enregistrement</Col>
        <Col md={8} className='text-capitalize'>
          : {createdAt ? moment(createdAt).format('DD MMMM YYYY à HH:MM\'') : '—'}
        </Col>
      </Row>
      
      {fkStructure && (
        <Row className='mb-4 fw-bold'>
          <Col md={4} className='theme-label'>Convention</Col>
          <Col md={8} className='text-uppercase'>
            {': '}
            <Link to={`/app/structures/${fkStructure.id}/${fkStructure?.slug}`}>
              {fkStructure.nom}
            </Link>
          </Col>
        </Row>
      )}
      
      {updatedAt && (
        <Row className='mb-4 fw-bold'>
          <Col md={4} className='theme-label fst-italic'>Dernière modification</Col>
          <Col md={8} className='text-capitalize'>
            : <span className='fst-italic'>{moment(updatedAt).format('DD MMMM YYYY à HH:MM\'')}</span>
          </Col>
        </Row>
      )}
      
      <RemovePatientModal
        isRedirect
        data={patient} show={show}
        onHide={(): void => handleShow(setShow)}
        onRefresh={async (): Promise<void> => { await refetch() }}
      />
    </>
  )
  
}
