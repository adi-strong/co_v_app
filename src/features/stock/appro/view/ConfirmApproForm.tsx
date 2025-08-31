import type {SaveAppro} from "../model/approService.ts";
import {Button, Modal} from "react-bootstrap";

export default function ConfirmApproForm(props: {
  show: boolean
  onHide: () => void
  state: SaveAppro
}) {
  
  const { show, onHide } = props
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-warning' closeButton>
        <Modal.Title><i className='bi bi-exclamation-triangle-fill' /> Confirmation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        <p>
          <code>
            <small>
              <i className='bi bi-exclamation-circle-fill'/> Cette action est irréversible.
            </small>
          </code>
        </p>
        
        Êtes-vous certain(e) de vouloir valider cet approvionnement <i className='bi bi-question-circle-fill text-warning'/>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button variant='outline-warning' onClick={onHide}>
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
