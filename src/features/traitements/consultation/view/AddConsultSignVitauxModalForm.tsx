import type {Consultation} from "../model/consultationService.ts";
import {Button, Col, Modal, Row, Spinner} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {handleShow} from "../../../../services/services.ts";
import {initSigneVitalErrorState, initSigneVitalState, onConsultSigneVitalSubmit} from "../model/consultationService.ts";
import {FormRequiredFieldsNoticeText, TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {usePostSignesVitauxMutation} from "../model/consultation.api.slice.ts";
import type {DocumentSuivi} from "../../documentSuivi/model/documentSuiviService.ts";

export default function AddConsultSignVitauxModalForm(props: {
  show: boolean
  onHide: () => void
  onRefresh: () => void
  consult?: Consultation
  suiviDdoc?: DocumentSuivi
}) {
  
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [state, setState] = useState(initSigneVitalState())
  const [errors, setErrors] = useState(initSigneVitalErrorState())
  const [onPostSignesVitaux, { isLoading }] = usePostSignesVitauxMutation()
  
  const { show, consult, onHide, onRefresh, suiviDdoc } = props
  
  return (
    <Modal show={show} onHide={onHide} size='lg'>
      <Modal.Header closeButton className='bg-danger'>
        <Modal.Title className='text-light'>
          <i className='bi bi-activity'/> Ajouter constantes vitales
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <FormRequiredFieldsNoticeText/>
        
        <Row>
          <Col md={4} className='mb-3'>
            <TextField
              required
              autoFocus
              disabled={isLoading}
              type='number'
              name='temperature'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.temperature}
              label='Température °'
              size='sm'
              error={errors.temperature}
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <TextField
              required
              disabled={isLoading}
              type='number'
              name='poids'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.poids}
              label='Poids (kg)'
              size='sm'
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <TextField
              disabled={isLoading}
              name='tensionArterielle'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.tensionArterielle}
              label='Tension artérielle (Cm Hg, ...)'
              size='sm'
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <TextField
              disabled={isLoading}
              name='frequenceRespiratoire'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.frequenceRespiratoire}
              label='Fréquence respiratoire (Pm, ...)'
              size='sm'
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <TextField
              disabled={isLoading}
              name='frequenceCardiaque'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.frequenceCardiaque}
              label='Fréquence cardiaque (bpm, ...)'
              size='sm'
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <TextField
              disabled={isLoading}
              name='saturationEnOxygene'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.saturationEnOxygene}
              label='Saturation en oxygène (SpO2, ...)'
              size='sm'
            />
          </Col>
        </Row>
        
        <TextAreaField
          disabled={isLoading}
          name='comment'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.comment}
          label='Commentaire :'
          placeholder='Votre commentaire ici...'
          rows={5}
        />
      </Modal.Body>
      
      <Modal.Footer>
        {!isConfirmed && (
          <>
            <Button disabled={isLoading} variant='outline-dark' size='sm' onClick={onHide}>
              <i className='bi bi-x'/> Annuler
            </Button>
            
            <Button
              disabled={isLoading}
              variant='outline-danger'
              size='sm'
              onClick={(): void => handleShow(setIsConfirmed)}
            >
              {!isLoading && (<i className='bi bi-check me-1'/>) as ReactNode}
              {isLoading && (<Spinner className='me-1' animation='border' size='sm' />) as ReactNode}
              {isLoading ? 'Veuillez patienter' : 'Valider'}
            </Button>
          </>
        ) as ReactNode}
        
        {isConfirmed && (
          <>
            <Button variant='outline-dark' size='sm' onClick={(): void => handleShow(setIsConfirmed)}>
              <i className='bi bi-x'/> Annuler la confirmation
            </Button>
            
            <Button
              variant='outline-primary'
              size='sm'
              onClick={(): void => {
                handleShow(setIsConfirmed)
                onConsultSigneVitalSubmit(
                  state,
                  setState,
                  setErrors,
                  onPostSignesVitaux,
                  onRefresh,
                  onHide,
                  consult,
                  suiviDdoc
                )
              }
            }>
              <i className='bi bi-exclamation-circle-fill'/> Veuillez confirmer cette opération
            </Button>
          </>
        ) as ReactNode}
      </Modal.Footer>
    </Modal>
  )
  
}
