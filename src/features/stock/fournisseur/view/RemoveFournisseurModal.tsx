import {Button, Modal} from "react-bootstrap";
import type {Fournisseur} from "../model/fournisseurService.ts";
import {useDeleteFournisseurMutation} from "../model/fournisseur.api.slice.ts";
import {onDeleteFournisseurSubmit} from "../model/fournisseurService.ts";

export default function RemoveFournisseurModal(props: {
  data: Fournisseur,
  show: boolean,
  onHide: () => void,
  onRefresh: () => void
}) {
  
  const { show, data, onHide, onRefresh } = props
  
  const [onDeleteFournisseur] = useDeleteFournisseurMutation()
  
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
          <b className='mx-1'>Fournisseur</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteFournisseurSubmit(
            data,
            onDeleteFournisseur,
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
