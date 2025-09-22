import type {Dispatch, SetStateAction} from "react";
import {Button, Modal} from "react-bootstrap";
import type {AgentImage} from "../model/agentService.ts";
import {onUpdateAgentProfileSubmit} from "../model/agentService.ts";

export default function RemoveAgentProfileModal(props: {
  show: boolean
  onHide: () => void
  state: AgentImage
  setState: Dispatch<SetStateAction<AgentImage>>
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
      <Modal.Header closeButton className='bg-warning'>
        <Modal.Title>
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
        
        <Button variant='warning' onClick={async (): Promise<void> => onUpdateAgentProfileSubmit(
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
