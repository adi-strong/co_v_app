import {Button, Modal, Spinner} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {initExpenseErrorState, initExpenseState, onExpenseSubmit} from "../model/bonDeDepensesService.ts";
import {usePostBonDepensesMutation} from "../model/bonDeDepenses.api.slice.ts";
import {handleShow} from "../../../../services/services.ts";
import PostExpenseFields from "./PostExpenseFields.tsx";

export default function PostNewExpenseModal(props: { show: boolean; onHide: () => void; onRefresh: () => void }) {
  
  const { show, onHide, onRefresh } = props
  
  const [confirm, setConfirm] = useState<boolean>(false)
  const [expense, setExpense] = useState(initExpenseState())
  const [errors, setErrors] = useState(initExpenseErrorState())
  
  const [postExpense, { isLoading }] = usePostBonDepensesMutation()
  
  const onAbort = (): void => {
    setExpense(initExpenseState())
    setErrors(initExpenseErrorState())
    onHide()
  }
  
  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-light'>
          <i className='bi bi-plus'/> Nouveau bon de dépenses
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <PostExpenseFields
          setState={setExpense}
          errors={errors}
          loader={isLoading}
          state={expense}
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
                onExpenseSubmit(
                  expense,
                  setErrors,
                  postExpense,
                  onHide,
                  onRefresh,
                  setExpense
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
