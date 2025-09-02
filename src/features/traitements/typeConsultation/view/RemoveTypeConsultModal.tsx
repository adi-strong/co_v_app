import type {CategorieExam} from "../../categorieExam/model/categorieExamService.ts";
import {useDeleteCategorieExamMutation} from "../../categorieExam/model/categorieExam.api.slice.ts";
import {Button, Modal} from "react-bootstrap";
import {onDeleteCategorieExamSubmit} from "../../categorieExam/model/categorieExamService.ts";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import {useDeleteTypeConsultationMutation} from "../model/typeConsultation.api.slice.ts";
import {onDeleteTypeConsultationSubmit} from "../model/typeConsultationService.ts";

export default function RemoveTypeConsultModal(props: {
  data: TypeConsultation,
  show: boolean,
  onHide: () => void,
  onRefresh: () => void }
) {
  
  const { show, data, onHide, onRefresh } = props
  
  const [onDeleteTypeConsult] = useDeleteTypeConsultationMutation()
  
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
          <b className='mx-1'>type de fiche</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-dark'><i className='bi bi-x'/> Annuler</Button>
        <Button
          autoFocus
          variant='danger'
          onClick={async (): Promise<void> => onDeleteTypeConsultationSubmit(
            data,
            onDeleteTypeConsult,
            onRefresh,
            onHide
          )}
        >
          <i className='bi bi-trash'/> Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
