import type {Dispatch, SetStateAction} from "react";
import {Button, Modal} from "react-bootstrap";
import type {ProduitImage} from "../model/produitService.ts";
import {onUpdateProduitImageSubmit} from "../model/produitService.ts";

export default function RemoveProduitImageModal(props: {
  show: boolean
  onHide: () => void
  state: ProduitImage
  setState: Dispatch<SetStateAction<ProduitImage>>
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
        
        <Button variant='warning' onClick={async (): Promise<void> => onUpdateProduitImageSubmit(
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
