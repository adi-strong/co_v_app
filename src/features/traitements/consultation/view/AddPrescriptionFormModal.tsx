import type {Consultation} from "../model/consultationService.ts";
import {Button, Modal, Spinner} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {handleShow} from "../../../../services/services.ts";
import {
  initPrescriptionErrorState,
  initPrescriptionState,
  onPrescriptionSubmit
} from "../../prescription/model/prescriptionService.ts";
import PrescriptionCartForm from "./PrescriptionCartForm.tsx";
import {FormRequiredFieldsNoticeText, TextAreaField} from "../../../../components";
import {PrescriptionCartTab} from "./PrescriptionCartTab.tsx";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {usePostPrescriptionMutation} from "../../prescription/model/prescription.api.slice.ts";

export default function AddPrescriptionFormModal(props: {
  show: boolean
  onHide: () => void
  onRefresh: () => void
  consult?: Consultation
}) {
  
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [state, setState] = useState(initPrescriptionState())
  const [errors, setErrors] = useState(initPrescriptionErrorState())
  const [onPostPrescription, { isLoading }] = usePostPrescriptionMutation()
  
  const { consult, show, onRefresh, onHide } = props
  
  const handleHide = (): void => {
    setState(initPrescriptionState())
    onHide()
  }
  
  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-light'>
          <i className='bi bi-file-earmark-text'/> Ajouter une prescription médicale
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <FormRequiredFieldsNoticeText/>
        
        <PrescriptionCartForm loader={isLoading} state={state} setState={setState} />
        
        <PrescriptionCartTab state={state} setState={setState} loader={isLoading} />
        
        <div className='mt-3'>
          <TextAreaField
            disabled={isLoading}
            name='comment'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.comment}
            label='Commentaire(s) :'
            rows={3}
            error={errors.comment}
          />
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        {!isConfirmed && (
          <>
            <Button disabled={isLoading} variant='outline-dark' size='sm' onClick={handleHide}>
              <i className='bi bi-x'/> Annuler
            </Button>
            
            <Button
              disabled={isLoading}
              variant='outline-primary'
              size='sm'
              onClick={(): void => handleShow(setIsConfirmed)}
            >
              {!isLoading && (<i className='bi bi-check me-1'/>) as ReactNode}
              {isLoading && (<Spinner className='me-1' animation='border' size='sm' />) as ReactNode}
              {isLoading ? 'Veuillez patienter' : 'Valider'}
            </Button>
          </>
        ) as ReactNode}
        
        {isConfirmed && (
          <>
            <Button variant='outline-dark' size='sm' onClick={(): void => handleShow(setIsConfirmed)}>
              <i className='bi bi-x'/> Annuler la confirmation
            </Button>
            
            <Button
              variant='outline-danger'
              size='sm'
              onClick={async (): Promise<void> => {
                handleShow(setIsConfirmed)
                onPrescriptionSubmit(
                  state,
                  setState,
                  setErrors,
                  onPostPrescription,
                  onRefresh,
                  onHide,
                  consult
                )
              }}>
              <i className='bi bi-exclamation-circle-fill'/> Veuillez confirmer cette opération
            </Button>
          </>
        ) as ReactNode}
      </Modal.Footer>
    </Modal>
  )
}
