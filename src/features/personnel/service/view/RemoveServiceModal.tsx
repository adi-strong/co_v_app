import {Button, Modal} from "react-bootstrap";
import {useDeleteServiceMutation} from "../model/service.api.slice.ts";
import type {Service} from "../model/serviceService.ts";
import {onDeleteServiceSubmit} from "../model/serviceService.ts";
import {useNavigate} from "react-router-dom";

export default function RemoveServiceModal(props: {
  data: Service
  show: boolean
  isRedirect?: boolean
  onHide: () => void
  onRefresh: () => void
}) {
  
  const navigate = useNavigate()
  
  const { show, data, onHide, onRefresh, isRedirect } = props
  
  const [onDeleteService] = useDeleteServiceMutation()
  
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
          Êtes-vous certain(e) de vouloir supprimer ce
          <b className='mx-1'>Service</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteServiceSubmit(
            data,
            onDeleteService,
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
