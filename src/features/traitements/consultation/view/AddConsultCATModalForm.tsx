import type {Consultation} from "../model/consultationService.ts";
import {Button, Modal, Spinner} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {handleShow} from "../../../../services/services.ts";
import {usePostSuiviTraitementsMutation} from "../../documentSuivi/model/documentSuivi.api.slice.ts";
import useGetTraitementsOptions from "../../traitement/hooks/useGetTraitementsOptions.ts";
import {useGetTraitementsQuery} from "../../traitement/model/traitement.api.slice.ts";
import {
  FormRequiredFieldsNoticeText,
  MultiSelectField,
  TextAreaField,
  TextField
} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {DocumentSuivi} from "../../documentSuivi/model/documentSuiviService.ts";
import {
  initSuiviTraitementErrorState,
  initSuiviTraitementState, onSuiviTraitementSubmit
} from "../../documentSuivi/model/documentSuiviService.ts";

export default function AddConsultCATModalForm(props: {
  show: boolean
  onHide: () => void
  onRefresh: () => void
  consult?: Consultation
  suiviDdoc?: DocumentSuivi
}) {
  
  const [state, setState] = useState(initSuiviTraitementState())
  const [errors, setErrors] = useState(initSuiviTraitementErrorState())
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [onPostSuiviTraitements, { isLoading }] = usePostSuiviTraitementsMutation()
  
  const { refetch: treatsRefresh, isFetching: isTreatsLoading } = useGetTraitementsQuery('LIST')
  const { show, consult, onHide, onRefresh, suiviDdoc } = props
  const documentSuivi = consult && consult?.documentSuivi ? consult.documentSuivi : undefined
  
  const traitementsOptions = useGetTraitementsOptions()
  
  return (
    <Modal show={show} onHide={onHide} size='lg'>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-light'>
          <i className='bi bi-journal-medical'/> Enregistrer C.A.T & Traitement
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <FormRequiredFieldsNoticeText/>
        
        <div className='mb-3'>
          <TextField
            disabled={isLoading}
            type='datetime-local'
            name='releasedAt'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.releasedAt}
            label='Date'
            error={errors.releasedAt}
            text='Le système assignera la date courante comme la date par défaut.'
          />
        </div>
        
        <div className='mb-3'>
          <MultiSelectField
            name='suivisItems'
            options={traitementsOptions()}
            value={state.suivisItems}
            onChange={e => setState(s => ({ ...s, suivisItems: e }))}
            onRefresh={async (): Promise<void> => { await treatsRefresh() }}
            disabled={isLoading || isTreatsLoading}
            placeholder='-- Plusieurs options sont valables --'
            label='Traitement(s) :'
          />
        </div>
        
        <div className='mb-3'>
          <TextAreaField
            required
            disabled={isLoading}
            name='observation'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.observation}
            label='Observation :'
            error={errors.observation}
            rows={7}
            placeholder='Détails du suivi, C.A.T & Observation(s)...'
          />
        </div>
        
        <TextAreaField
          required
          disabled={isLoading}
          name='diagnostic'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.diagnostic}
          label='Plainte(s) & Diagnostic :'
          error={errors.diagnostic}
          rows={7}
        />
      </Modal.Body>
      
      <Modal.Footer>
        {!isConfirmed && (
          <>
            <Button disabled={isLoading} variant='outline-dark' size='sm' onClick={onHide}>
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
              onClick={(): void => {
                handleShow(setIsConfirmed)
                onSuiviTraitementSubmit(
                  state,
                  setState,
                  setErrors,
                  onPostSuiviTraitements,
                  onRefresh,
                  onHide,
                  documentSuivi ?? suiviDdoc
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
