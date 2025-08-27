import type {ProduitError, SaveProduit} from "../model/produitService.ts";
import type {Dispatch, SetStateAction} from "react";
import {Button, Modal} from "react-bootstrap";

export default function ConfirmProduitModal(props: {
  produit: SaveProduit
  setErrors: Dispatch<SetStateAction<ProduitError>>
  show: boolean
  onHide: () => void
}) {
  
  const {
    show,
    onHide,
    // produit,
    // setErrors,
  } = props
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-warning' closeButton>
        <Modal.Title><i className='bi bi-exclamation-triangle-fill'/> Confirmation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        Êtes-vous certain(e) de vouloir valider cet enregistrement <i className='bi bi-question-circle-fill text-warning'/>
      </Modal.Body>
      
      <Modal.Footer>
        <Button type='button' variant='outline-dark' onClick={onHide}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button autoFocus type='button' variant='outline-warning' onClick={onHide}>
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
