import type {ConsultationError, SaveConsultation} from "../model/consultationService.ts";
import {Button, Modal} from "react-bootstrap";
import {onConsultSubmit} from "../model/consultationService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

export default function ConfirmationConsultModal(props: {
  show: boolean
  onHide: () => void
  onRefresh: () => void
  state: SaveConsultation
  setErrors: Dispatch<SetStateAction<ConsultationError>>
  onSubmit: (params?: SaveConsultation) => Promise<any>
}) {
  
  const navigate = useNavigate()
  
  const {
    show,
    onHide,
    state,
    setErrors,
    onSubmit,
    onRefresh,
  } = props
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-warning' closeButton>
        <Modal.Title><i className='bi bi-exclamation-triangle-fill'/> Confirmation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        Êtes-vous certain(e) de vouloir confirmer cette opération <i className='bi bi-question-circle-fill text-warning'/>
      </Modal.Body>
      
      <Modal.Footer>
        <Button type='button' variant='outline-dark' onClick={onHide}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button
          autoFocus
          type='button'
          variant='outline-warning'
          onClick={async (): Promise<any> => onConsultSubmit(
            state,
            setErrors,
            onSubmit,
            navigate,
            onHide,
            onRefresh
          )}
        >
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
