import {Button, Modal} from "react-bootstrap";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import {useDeleteUniteConsommationMutation} from "../model/uniteConsommation.api.slice.ts";
import {onDeleteUniteConsommationSubmit} from "../model/uniteConsommationService.ts";
import {useNavigate} from "react-router-dom";

export default function RemoveUniteConsommationModal(props: {
  data: UniteConsommation,
  show: boolean,
  isRedirect?: boolean,
  onHide: () => void,
  onRefresh: () => void
}) {
  
  const navigate = useNavigate()
  
  const { show, data, onHide, onRefresh, isRedirect } = props
  
  const [onDeleteUnite] = useDeleteUniteConsommationMutation()
  
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
          Êtes-vous certain(e) de vouloir supprimer cette
          <b className='mx-1'>Unité de consommation</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteUniteConsommationSubmit(
            data,
            onDeleteUnite,
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
