import {Button, Modal} from "react-bootstrap";
import type {PatientImage} from "../model/patientService.ts";
import type {Dispatch, SetStateAction} from "react";
import {onUpdatePatientProfileSubmit} from "../model/patientService.ts";

export default function RemovePatientProfileModal(props: {
  show: boolean
  onHide: () => void
  state: PatientImage
  setState: Dispatch<SetStateAction<PatientImage>>
  onSubmit: (data: FormData) => Promise<any>
  onRefresh: () => void
}) {
  
  const {
    onHide,
    onSubmit,
    setState,
    onRefresh,
    show,
    state,
  } = props
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className='bg-danger'>
        <Modal.Title className='text-light'>
          <i className='bi bi-trash'/> Suppression
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        <code className='text-dark'>
          Êtes-vous certain(e) de vouloir valider cette opération
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={onHide} variant='outline-dark'>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button variant='danger' onClick={async (): Promise<void> => onUpdatePatientProfileSubmit(
          state,
          setState,
          onSubmit,
          onRefresh,
          onHide
        )}>
          <i className='bi bi-trash'/> Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
