import {Button, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {
  ExpenseError,
  ExpenseFormModalProps,
  ExpenseSaver,
  initExpenseErrorState,
  initExpenseState, onExpenseSubmit
} from "../model/bonDeDepensesService";
import {useEditExpenseMutation} from "../model/bonDeDepenses.api.slice";
import ExpenseForm from "./ExpenseForm";

const EditExpenseFormModal = ({ data, show, onHide, onRefresh }: ExpenseFormModalProps) => {
  
  const [expense, setExpense] = useState<ExpenseSaver>(initExpenseState())
  const [errorState, setErrorState] = useState<ExpenseError>(initExpenseErrorState())
  
  const [editExpense, {
    isLoading,
    isError,
    error
  }] = useEditExpenseMutation()
  
  const handleCancel = (): void => { onHide() }
  
  return (
    <Modal size='lg' show={show} onHide={onHide} className='modal-transition' animation>
      <Modal.Header className='bg-primary' closeButton>
        <Modal.Title className='text-light'>
          <i className='bi bi-pencil-square' /> Modification du bon de commandes
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className='mb-3 text-decoration-underline'>
          <i className='bi bi-arrow-90deg-down me-1' />
          {data?.objet.toUpperCase()}
        </div>
        
        <ExpenseForm
          data={data}
          error={error}
          isError={isError}
          state={expense}
          isLoading={isLoading}
          setState={setExpense}
          errorState={errorState}
        />
      
      </Modal.Body>
      
      <Modal.Footer>
        <Button disabled={isLoading} variant='outline-secondary' onClick={handleCancel}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button
          disabled={isLoading}
          variant='outline-primary'
          onClick={() => onExpenseSubmit(
            expense,
            setErrorState,
            editExpense,
            onHide,
            onRefresh
          )}>
          {isLoading && <Spinner className='me-1' animation='border' size='sm'/>}
          {!isLoading && <i className='bi bi-check-all me-1'/>}
          {isLoading ? 'Veuillez patienter' : 'Modifier'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
};

export default EditExpenseFormModal;
