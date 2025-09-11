import {Button, Modal} from "react-bootstrap";
import type {Hospitalisation} from "../model/hospitalisationService.ts";
import {useDeleteHospitalisationMutation} from "../model/hospitalisation.api.slice.ts";
import {onDeleteHospSubmit} from "../model/hospitalisationService.ts";

export default function RemoveHospModal(props: {
  data: Hospitalisation
  show: boolean
  onHide: () => void
  onRefresh: () => void
}) {
  
  const { show, data, onHide, onRefresh } = props
  
  const [onDeleteHosp] = useDeleteHospitalisationMutation()
  
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
          Êtes-vous certain(e) de vouloir valider cette opération
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteHospSubmit(
            data,
            onDeleteHosp,
            onRefresh,
            onHide
          )}
        >
          <i className='bi bi-trash'/> Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
