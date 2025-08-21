import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {ExpenseTypeFormModalProps, onDeleteExpenseTypeSubmit} from "../model/typesDepensesService";
import {useDeleteExpenseTypeMutation} from "../model/typesDepenses.api.slice";

const DeleteExpenseTypeModal = ({ data, show, onHide, onRefresh }: ExpenseTypeFormModalProps) => {
  
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const onConfirmed = (): void => { setConfirmed(!confirmed) }
  
  const [deleteExpenseType] = useDeleteExpenseTypeMutation()
  
  return (
    <>
      <Modal show={show} onHide={onHide} className='modal-transition' animation>
        <Modal.Header className='bg-danger' closeButton>
          <Modal.Title className='text-light'>
            <i className='bi bi-exclamation-triangle-fill' /> Suppression du type de dépenses : <br/>
            <span className='text-decoration-underline'>`{data?.nom.toUpperCase()}`</span>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className='text-center'>
          <small>
            <code>
              <i className='bi bi-exclamation-circle-fill' /> Cette action est irréversible.
            </code>
          </small>
          
          <div>
            Êtes-vous certain(e) de vouloir supprimer <br/> ce type de dépenses
            <i className='bi bi-question-circle-fill text-danger mx-1' />
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
              
              <Button autoFocus onClick={() => onDeleteExpenseTypeSubmit(
                data,
                deleteExpenseType,
                onRefresh,
                onHide
              )} variant='warning'>
                <i className='bi bi-exclamation-circle-fill' /> Valider
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
  
};

export default DeleteExpenseTypeModal;
