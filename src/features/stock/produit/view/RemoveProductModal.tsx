import {Button, Modal} from "react-bootstrap";
import type {Produit} from "../model/produitService.ts";
import {useDeleteProduitMutation} from "../model/produit.api.slice.ts";
import {onDeleteProduitSubmit} from "../model/produitService.ts";
import {useNavigate} from "react-router-dom";

export default function RemoveProductModal(props: {
  data: Produit
  show: boolean
  onHide: () => void
  onRefresh: () => void
  isRedirect?: boolean
}) {
  
  const navigate = useNavigate()
  
  const { show, data, onHide, onRefresh, isRedirect } = props
  
  const [onDeleteProduct] = useDeleteProduitMutation()
  
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
          <b className='mx-1'>Produit</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteProduitSubmit(
            data,
            onDeleteProduct,
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
