import {Button, Modal} from "react-bootstrap";
import type {CategorieLit} from "../model/categorieLitService.ts";
import {useDeleteCategorieLitMutation} from "../model/categorieLit.api.slice.ts";
import {onDeleteCategorieLitSubmit} from "../model/categorieLitService.ts";

export default function RemoveCategorieLitModal(props: {
  data: CategorieLit,
  show: boolean,
  onHide: () => void,
  onRefresh: () => void }
) {
  
  const { show, data, onHide, onRefresh } = props
  
  const [onDeleteCategory] = useDeleteCategorieLitMutation()
  
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
          <b className='mx-1'>catégorie</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteCategorieLitSubmit(
            data,
            onDeleteCategory,
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
