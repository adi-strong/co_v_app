import {Button, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {
  ExpenseError,
  ExpenseFormModalProps,
  ExpenseSaver,
  initExpenseErrorState,
  initExpenseState, onExpenseSubmit
} from "../model/bonDeDepensesService";
import {usePostExpenseMutation} from "../model/bonDeDepenses.api.slice";
import ExpenseForm from "./ExpenseForm";

const PostNewExpenseModal = ({ show, onHide, onRefresh }: ExpenseFormModalProps) => {
  
  const [expense, setExpense] = useState<ExpenseSaver>(initExpenseState())
  const [errorState, setErrorState] = useState<ExpenseError>(initExpenseErrorState())
  
  const [postExpense, {
    isLoading,
    isError,
    error
  }] = usePostExpenseMutation()
  
  return (
    <Modal size='lg' show={show} onHide={onHide} className='modal-transition' animation>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className='bi bi-plus' /> Nouveau bon de dépenses
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        
        <ExpenseForm
          error={error}
          isError={isError}
          state={expense}
          isLoading={isLoading}
          setState={setExpense}
          errorState={errorState}
        />
      
      </Modal.Body>
      
      <Modal.Footer>
        <Button disabled={isLoading} variant='outline-secondary' onClick={onHide}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button
          disabled={isLoading}
          variant='outline-primary'
          onClick={() => onExpenseSubmit(
            expense,
            setErrorState,
            postExpense,
            onHide,
            onRefresh,
            setExpense
          )}>
          {isLoading && <Spinner className='me-1' animation='border' size='sm'/>}
          {!isLoading && <i className='bi bi-check-all me-1'/>}
          {isLoading ? 'Veuillez patienter' : 'Enregistrer'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
};

export default PostNewExpenseModal;
