import {Button, Modal} from "react-bootstrap";
import type {RendezVous} from "../model/rendezVousService.ts";
import {useDeleteRendezVousMutation} from "../model/rendezVous.api.slice.ts";
import {onDeleteRdvSubmit} from "../model/rendezVousService.ts";

export default function RemoveRdvModal(props: {
  data: RendezVous,
  show: boolean,
  onHide: () => void,
  onRefresh: () => void
}) {
  
  const { show, data, onHide, onRefresh } = props
  
  const [onDeleteRdv] = useDeleteRendezVousMutation()
  
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
          Êtes-vous certain(e) de vouloir supprimer cet
          <b className='mx-1'>Rendez-vous</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteRdvSubmit(
            data,
            onDeleteRdv,
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
