import {ReactNode, useState} from "react";
import {useGetPatientsQuery} from "../../../patients/patient/model/patient.api.slice.ts";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {formatNumberWithSpaces, handleShow} from "../../../../services/services.ts";
import moment from "moment/moment";
import type {Produit} from "../model/produitService.ts";
import RemoveProductModal from "./RemoveProductModal.tsx";
import {SideContent} from "../../../../components";
import ProduitForm from "./ProduitForm.tsx";
import {quantityAlertColor} from "../model/produitService.ts";

export default function UniqueProduitData({ produit, isFetching, onRefresh }: {
  produit: Produit,
  isFetching: boolean,
  onRefresh: () => void
}) {
  
  const [show, setShow] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  
  const {
    nom,
    createdAt,
    updatedAt,
    code,
    fkUnite,
    quantity,
    description,
    fkCategorie,
  } = produit
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
          <Button size='sm' className='me-1' onClick={(): void => handleShow(setIsEdit)}>
            <i className='bi bi-pencil-square'/> Modifier
          </Button>
          
          <Button size='sm' disabled={isFetching} variant='danger' onClick={(): void => handleShow(setShow)}>
            <i className='bi bi-trash me-1'/> Supprimer
          </Button>
        </Col>
      </Row>
      
      <hr className='mt-0'/>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Dénomination du produit</Col>
        <Col md={8} className='text-uppercase fw-bold'>: {nom}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Code du produit</Col>
        <Col md={8} className='text-uppercase'>: {code}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Unité de consommation</Col>
        <Col md={8} className='text-uppercase'>: {fkUnite ? fkUnite.nom : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Catégorie</Col>
        <Col md={8} className='text-uppercase'>: {fkCategorie ? fkCategorie.nom : '—'}</Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Quantité en stock</Col>
        <Col md={8} className={`text-uppercase fw-bold text-${quantityAlertColor(quantity)}`}>
          {': '}
          {Number(quantity) < 42 && (<i className='bi bi-exclamation-circle-fill me-1' />) as ReactNode}
          {formatNumberWithSpaces(quantity.toFixed(1))+' ('}
          {fkUnite && (<span className='text-lowercase'>{fkUnite.nom})</span>) as ReactNode}
        </Col>
      </Row>
      
      <Row className='mb-4'>
        <Col md={4} className='theme-label'>Description du produit</Col>
        <Col md={8}>:</Col>
        
        <div className='white-space mt-3'>{description && description}</div>
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
      
      <RemoveProductModal
        isRedirect
        data={produit} show={show}
        onHide={(): void => handleShow(setShow)}
        onRefresh={async (): Promise<void> => { await refetch() }}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un produit'
        icon='pencil-square'
        children={(
          <ProduitForm
            onHide={(): void => handleShow(setIsEdit)}
            onRefresh={onRefresh}
            data={produit}
          />
        ) as ReactNode}
      />
    </>
  )
  
}
