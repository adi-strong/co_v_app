import {Button, Modal} from "react-bootstrap";
import type {Structure} from "../model/structureService.ts";
import {useDeleteStructureMutation} from "../model/structure.api.slice.ts";
import {onDeleteStructureSubmit} from "../model/structureService.ts";

export default function RemoveStructureModal(props: {
  data: Structure,
  show: boolean,
  onHide: () => void,
  onRefresh: () => void
}) {
  
  const { show, data, onHide, onRefresh } = props
  
  const [onDeleteStructure] = useDeleteStructureMutation()
  
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
          onClick={async (): Promise<void> => onDeleteStructureSubmit(
            data,
            onDeleteStructure,
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
