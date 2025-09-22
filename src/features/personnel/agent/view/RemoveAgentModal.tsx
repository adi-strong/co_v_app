import {useNavigate} from "react-router-dom";
import {useDeleteFonctionMutation} from "../../fonction/model/fonction.api.slice.ts";
import {Button, Modal} from "react-bootstrap";
import type {Agent} from "../model/agentService.ts";
import {onDeleteAgentSubmit} from "../model/agentService.ts";

export default function RemoveAgentModal(props: {
  data: Agent
  show: boolean
  isRedirect?: boolean
  onHide: () => void
  onRefresh: () => void
}) {
  
  const navigate = useNavigate()
  
  const { show, data, onHide, onRefresh, isRedirect } = props
  
  const [onDeleteFonction] = useDeleteFonctionMutation()
  
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
          <b className='mx-1'>Agent</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteAgentSubmit(
            data,
            onDeleteFonction,
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
