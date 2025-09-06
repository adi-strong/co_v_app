import type {ApproError, SaveAppro} from "../model/approService.ts";
import {Button, Modal} from "react-bootstrap";
import type {Dispatch, SetStateAction} from "react";
import {onApproSubmit} from "../model/approService.ts";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";

export default function ConfirmApproForm(props: {
  show: boolean
  onHide: () => void
  state: SaveAppro
  setState: Dispatch<SetStateAction<SaveAppro>>
  setErrors: Dispatch<SetStateAction<ApproError>>
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>
  onPostAppro: (data?: SaveAppro) => Promise<any>
}) {
  
  const {
    show,
    onHide,
    onPostAppro,
    state,
    setErrors,
    setState,
    setTaxes,
  } = props
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-warning' closeButton>
        <Modal.Title><i className='bi bi-exclamation-triangle-fill' /> Confirmation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        <p>
          <code>
            <small>
              <i className='bi bi-exclamation-circle-fill'/> Cette action est irréversible.
            </small>
          </code>
        </p>
        
        Êtes-vous certain(e) de vouloir valider cet approvionnement <i className='bi bi-question-circle-fill text-warning'/>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button autoFocus variant='outline-warning' onClick={async (): Promise<void> => onApproSubmit(
          state,
          setState,
          setErrors,
          setTaxes,
          onPostAppro,
          onHide
        )}>
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
