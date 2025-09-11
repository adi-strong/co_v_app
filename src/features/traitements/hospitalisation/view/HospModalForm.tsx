import type {Consultation} from "../../consultation/model/consultationService.ts";
import {Button, Col, Modal, Row, Spinner} from "react-bootstrap";
import {useGetAvailableBedsQuery} from "../../lit/model/lit.api.slice.ts";
import {ReactNode, useState} from "react";
import {CheckField, FormRequiredFieldsNoticeText, SingleSelectField, TextField} from "../../../../components";
import useGetLitsOptions from "../../lit/hooks/useGetLitsOptions.ts";
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {
  useEditHospitalisationMutation,
  usePostHospitalisationMutation
} from "../model/hospitalisation.api.slice.ts";
import type {Hospitalisation} from "../model/hospitalisationService.ts";
import {
  getHospEntryModeOptions, getHospLeaveModeOptions,
  initHospitalisationErrorState,
  initHospitalisationState, onHospitalisationSubmit
} from "../model/hospitalisationService.ts";
import useSetHospData from "../hooks/useSetHospData.ts";

export default function HospModalForm(props: {
  show: boolean
  onHide: () => void
  onRefresh: () => void
  consult: Consultation
  data?: Hospitalisation
}) {
  
  const {
    show,
    onHide,
    consult,
    onRefresh,
    data,
  } = props
  
  const [state, setState] = useState(initHospitalisationState())
  const [errors, setErrors] = useState(initHospitalisationErrorState())
  const [onPostHospitalisation, { isLoading }] = usePostHospitalisationMutation()
  const [onEditHospitalisation, { isLoading: isEditLoading }] = useEditHospitalisationMutation()
  
  const { refetch: bedRefresh, isFetching: isBedFetching } = useGetAvailableBedsQuery('LIST')
  
  const litOptions = useGetLitsOptions()
  useSetHospData(data, setState)
  
  return (
    <Modal show={show} onHide={onHide} size='lg'>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-light'>
          <i className='bi bi-hospital-fill me-1'/>
          {data && "Clôturer l'"}Hospitalisation
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <FormRequiredFieldsNoticeText/>
        
        {!data && (
          <>
            <Row>
              <Col md={6} className='mb-3'>
                <SingleSelectField
                  required
                  disabled={isBedFetching || isLoading || isEditLoading}
                  onRefresh={async (): Promise<void> => {
                    await bedRefresh()
                  }}
                  options={litOptions()}
                  value={state?.fkLit ?? null}
                  onChange={e => setState(s => ({...s, fkLit: e}))}
                  name='fkLit'
                  placeholder='-- --'
                  label='Lit'
                  error={errors.fkLit}
                />
              </Col>
              
              <Col md={6} className='mb-3'>
                <TextField
                  required
                  disabled={isLoading || isEditLoading}
                  name='motif'
                  onChange={(e): void => handleChange(e, state, setState)}
                  value={state.motif}
                  label='Motif'
                  minLength={2}
                  maxLength={255}
                  error={errors.motif}
                />
              </Col>
            </Row>
            
            <div className='mb-3'>
              <SelectField
                required
                disabled={isLoading || isEditLoading}
                name='modeEntree'
                onChange={(e): void => handleChange(e, state, setState)}
                value={state.modeEntree}
                label="Mode d'entrée"
                error={errors.modeEntree}
                options={getHospEntryModeOptions()}
              />
            </div>
            
            <div>
              <TextField
                required
                disabled={isLoading || isEditLoading}
                type='datetime-local'
                name='dateAdmission'
                onChange={(e): void => handleChange(e, state, setState)}
                value={state.dateAdmission}
                label="Date d'admission"
                error={errors.dateAdmission}
              />
            </div>
          </>
        ) as ReactNode}
        
        {data && (
          <>
            <CheckField
              disabled={isEditLoading}
              label='Veuillez côcher afin de clôturer'
              name='finished'
              value={state.finished}
              checked={state.finished}
              onChange={(): void => setState(s => ({
                ...s, finished: !s.finished,
                dateSortie: '',
                modeSortie: ''
              }))}
              error={errors.finished}
            />
            
            {state.finished && (
              <>
                <div className='mb-3 mt-3'>
                  <SelectField
                    required
                    disabled={isLoading || isEditLoading}
                    name='modeSortie'
                    onChange={(e): void => handleChange(e, state, setState)}
                    value={state.modeSortie}
                    label='Mode de sortie'
                    error={errors.modeEntree}
                    options={getHospLeaveModeOptions()}
                  />
                </div>
                
                <TextField
                  required
                  disabled={isLoading || isEditLoading}
                  type='datetime-local'
                  name='dateSortie'
                  onChange={(e): void => handleChange(e, state, setState)}
                  value={state.dateSortie}
                  label='Date de sortie'
                  error={errors.dateSortie}
                />
              </>
            )}
          </>
        ) as ReactNode}
      </Modal.Body>
      
      <Modal.Footer>
        <Button size='sm' disabled={isLoading || isEditLoading} variant='outline-dark' onClick={onHide}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button
          size='sm'
          disabled={isLoading || isEditLoading}
          variant='outline-primary'
          onClick={async (): Promise<void> => onHospitalisationSubmit(
            state,
            setErrors,
            data ? onEditHospitalisation : onPostHospitalisation,
            onHide,
            consult,
            onRefresh
          )}>
          {!(isLoading || isEditLoading) && (<i className='bi bi-check me-1'/>) as ReactNode}
          {(isLoading || isEditLoading) && (<Spinner className='me-1' animation='border' size='sm'/>) as ReactNode}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'Valider'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
