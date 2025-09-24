import {ReactNode, useState} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import {handleShow} from "../../../../services/services.ts";
import {initBonEntreeErrorState, initBonEntreeState, onBonEntreeSubmit} from "../model/bonEntreeService.ts";
import {usePostBonEntreeMutation} from "../model/bonEntree.api.slice.ts";
import PostEntryFields from "./PostEntryFields.tsx";

export default function PostNewEntryModal(props: { show: boolean; onHide: () => void; onRefresh: () => void }) {
  
  const { show, onHide, onRefresh } = props
  
  const [confirm, setConfirm] = useState<boolean>(false)
  const [entry, setEntry] = useState(initBonEntreeState())
  const [errors, setErrors] = useState(initBonEntreeErrorState())
  
  const [postEntry, { isLoading }] = usePostBonEntreeMutation()
  
  const onAbort = (): void => {
    setEntry(initBonEntreeState())
    setErrors(initBonEntreeErrorState())
    onHide()
  }
  
  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-light'>
          <i className='bi bi-plus'/> Nouveau bon d'entrées
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <PostEntryFields
          setState={setEntry}
          errors={errors}
          loader={isLoading}
          state={entry}
        />
      </Modal.Body>
      
      <Modal.Footer>
        {!confirm && (
          <>
            <Button size='sm' disabled={isLoading} variant='outline-dark' onClick={onAbort}>
              <i className='bi bi-x'/> Fermer
            </Button>
            
            <Button
              size='sm'
              disabled={isLoading}
              variant='outline-primary'
              onClick={(): void => handleShow(setConfirm)}>
              {!isLoading && (<i className='bi bi-floppy me-1'/>) as ReactNode}
              {isLoading && (<Spinner className='me-1' animation='grow' size='sm'/>) as ReactNode}
              {isLoading ? 'Veuillez patienter' : 'Enregistrer'}
            </Button>
          </>
        ) as ReactNode}
        
        {confirm && (
          <>
            <Button size='sm' disabled={isLoading} variant='outline-dark' onClick={(): void => handleShow(setConfirm)}>
              <i className='bi bi-x'/> Annuler
            </Button>
            
            <Button
              size='sm'
              disabled={isLoading}
              variant='warning'
              onClick={() => {
                setConfirm(false)
                onBonEntreeSubmit(
                  entry,
                  setEntry,
                  setErrors,
                  postEntry,
                  onRefresh,
                  onHide
                )
              }}>
              <i className='bi bi-exclamation-circle-fill'/> Valider
            </Button>
          </>
        ) as ReactNode}
      </Modal.Footer>
    </Modal>
  )
  
}
