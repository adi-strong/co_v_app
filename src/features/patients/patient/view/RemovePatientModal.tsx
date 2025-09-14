import {Button, Modal} from "react-bootstrap";
import type {Patient} from "../model/patientService.ts";
import {useDeletePatientMutation} from "../model/patient.api.slice.ts";
import {onDeletePatientSubmit} from "../model/patientService.ts";
import {useNavigate} from "react-router-dom";

export default function RemovePatientModal(props: {
  data: Patient,
  show: boolean,
  onHide: () => void,
  onRefresh: () => void
  isRedirect?: boolean
}) {
  
  const navigate = useNavigate()
  
  const { show, data, onHide, onRefresh, isRedirect } = props
  
  const [onDeletePatient] = useDeletePatientMutation()
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-danger' closeButton>
        <Modal.Title className='text-light'><i className='bi bi-trash'/> Suppression</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        <p>
          <code>
            <small><i className='bi bi-exclamation-triangle-fill'/> Cette action est irreversible.</small>
          </code>
        </p>
        
        <code className='text-dark'>
          Êtes-vous certain(e) de vouloir supprimer cet(te)
          <b className='mx-1'>Patient(e)</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeletePatientSubmit(
            data,
            onDeletePatient,
            onRefresh,
            onHide,
            isRedirect ? navigate : undefined
          )}
        >
          <i className='bi bi-trash'/> Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
