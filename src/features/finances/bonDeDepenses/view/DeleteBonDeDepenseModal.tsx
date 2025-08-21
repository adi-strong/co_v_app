import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {useDeleteExpenseMutation} from "../model/bonDeDepenses.api.slice";
import {ExpenseFormModalProps, onDeleteExpenseSubmit} from "../model/bonDeDepensesService";

const DeleteBonDeDepenseModal = ({ data, show, onHide, onRefresh }: ExpenseFormModalProps) => {
  
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const onConfirmed = (): void => { setConfirmed(!confirmed) }
  
  const [deleteExpense] = useDeleteExpenseMutation()
  
  return (
    <>
      <Modal show={show} onHide={onHide} className='modal-transition' animation>
        <Modal.Header className='bg-danger' closeButton>
          <Modal.Title className='text-light'>
            <i className='bi bi-exclamation-triangle-fill' /> Suppression du bon de dépenses : <br/>
            <span className='text-decoration-underline'>`{data?.objet.toUpperCase()}`</span>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className='text-center'>
          <small>
            <code>
              <i className='bi bi-exclamation-circle-fill' /> Cette action est irréversible.
            </code>
          </small>
          
          <div>
            Êtes-vous certain(e) de vouloir supprimer <br/>
            ce bon de dépenses <i className='bi bi-question-circle-fill text-danger' />
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          {!confirmed && (
            <>
              <Button onClick={onHide} variant='outline-secondary'>
                <i className='bi bi-x' /> Annuler
              </Button>
              
              <Button autoFocus onClick={onConfirmed} variant='outline-danger'>
                <i className='bi bi-trash' /> Supprimer
              </Button>
            </>
          )}
          
          {confirmed && (
            <>
              <Button onClick={onConfirmed} variant='outline-secondary'>
                <i className='bi bi-x' /> Annuler
              </Button>
              
              {data &&
                <Button autoFocus onClick={() => onDeleteExpenseSubmit(
                  data,
                  deleteExpense,
                  onRefresh,
                  onHide
                )} variant='warning'>
                  <i className='bi bi-exclamation-circle-fill' /> Valider
                </Button>}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
  
};

export default DeleteBonDeDepenseModal;
