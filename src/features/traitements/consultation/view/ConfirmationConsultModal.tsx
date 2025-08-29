import type {SaveConsultation} from "../model/consultationService.ts";
import {Button, Modal} from "react-bootstrap";

export default function ConfirmationConsultModal(props: {
  show: boolean
  onHide: () => void
  state: SaveConsultation
}) {
  
  const { show, onHide, } = props
  
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
        
        <Button autoFocus type='button' variant='outline-warning' onClick={onHide}>
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
