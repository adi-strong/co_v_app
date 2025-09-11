import type {Consultation} from "../model/consultationService.ts";
import {ReactNode, useState} from "react";
import {
  getConsultStatusOptions,
  initConsultationErrorState,
  initConsultationState, onConsultEndChange, onConsultExamsChange, onConsultIsExamsChange,
  onConsultIsSignChange
} from "../model/consultationService.ts";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {
  CheckField,
  FormRequiredFieldsNoticeText,
  MultiSelectField,
  SingleSelectField, TextAreaField, TextField
} from "../../../../components";
import SignesVitauxFields from "./SignesVitauxFields.tsx";
import {handleChange} from "../../../../services/form.hander.service.ts";
import ConfirmationConsultModal from "./ConfirmationConsultModal.tsx";
import useSetConsultData from "../hooks/useSetConsultData.ts";
import useGetTypeConsultOptions from "../../typeConsultation/hooks/useGetTypeConsultOptions.ts";
import useGetAgentsByFunctionOptions from "../../../personnel/agent/hooks/useGetAgentsByFunctionOptions.ts";
import {useGetTypeConsultationsQuery} from "../../typeConsultation/model/typeConsultation.api.slice.ts";
import {useGetAgentsByFonctionQuery} from "../../../personnel/agent/model/agent.api.slice.ts";
import {useGetPatientsQuery, useLazyGetSearchPatientsQuery} from "../../../patients/patient/model/patient.api.slice.ts";
import useGetPatientsOptions from "../../../patients/patient/hooks/useGetPatientsOptions.ts";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import toast from "react-hot-toast";
import type {SelectOptionType} from "../../../../services/services.ts";
import {handleShow} from "../../../../services/services.ts";
import SingleAsyncSelectField from "../../../../components/forms/SingleAsyncSelectField.tsx";
import {useEditConsultationMutation, usePostConsultationMutation} from "../model/consultation.api.slice.ts";
import useGetExamOptions from "../../examen/hooks/useGetExamOptions.ts";
import {useGetExamensQuery} from "../../examen/model/examen.api.slice.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {Link} from "react-router-dom";

export default function ConsultForm({ data, onRefresh, loader }: {
  data?: Consultation, 
  onRefresh: () => void
  loader?: boolean
}) {
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState(initConsultationState())
  const [errors, setErrors] = useState(initConsultationErrorState())
  
  const [getSearchPatients] = useLazyGetSearchPatientsQuery()
  const [onPostConsultation, { isLoading }] = usePostConsultationMutation()
  const [onEditConsultation, { isLoading: isEditLoading }] = useEditConsultationMutation()
  
  const { refetch: typesRefresh, isFetching: typesLoader } = useGetTypeConsultationsQuery('LIST')
  const { refetch: patientsRefresh, isFetching: isPatientsFetching } = useGetPatientsQuery('LIST')
  const { refetch: examsRefresh, isFetching: examsLoader } = useGetExamensQuery('LIST')
  const { refetch: agentsRefresh, isFetching: agentsLoader } = useGetAgentsByFonctionQuery('médecin')
  
  useSetConsultData(data, setState)
  
  const typeOptions = useGetTypeConsultOptions()
  const patientsOptions = useGetPatientsOptions()
  const doctorsOptions = useGetAgentsByFunctionOptions('médecin')
  const examsOptios = useGetExamOptions()
  
  const onSearchPatients = async (keywords: string): Promise<any> => {
    let options: SelectOptionType[] = []
    
    try {
      const { data: patients, error }: JsonLdApiResponseInt<Patient[]> = await getSearchPatients(keywords)
      if (errors && error?.data && error.data?.detail) toast.error(error.data.detail)
      if (patients) patients.forEach(({ id, nom, fullName }: Patient): void => {
        const label: string = fullName?.toUpperCase() ?? nom.toUpperCase()
        const data: string = `/api/patients/${id}`
        const value: string = label
        
        options.push({
          label,
          value,
          data,
        })
      })
    } catch (error: { message?: string }) {
      toast.error(error?.message ?? 'Une erreur est survénue.')
    }
    
    return options
  }
  
  return (
    <>
      <Row>
        <Col md={6} className='mb-3'>
          <FormRequiredFieldsNoticeText/>
        </Col>
        
        {data && (
          <Col md={6} className='mb-3 text-md-end'>
            <Link to={`/app/consultations/${data.id}`} className='btn btn-sm btn-link'>
              Voir le dossier <i className='bi bi-chevron-right'/>
            </Link>
          </Col>
        ) as ReactNode}
      </Row>
      
      {!data && (<h3 className='mb-3'><i className='bi bi-lungs-fill'/> Formulaire de consultation</h3>) as ReactNode}
      
      <form onSubmit={e => {
        e.preventDefault()
        handleShow(setShow)
      }}>
        <Row>
          <Col md={data ? 12 : 4} className='mb-3'>
            <SingleSelectField
              required
              disabled={typesLoader || isLoading || isEditLoading || loader}
              onRefresh={async (): Promise<void> => { await typesRefresh() }}
              options={typeOptions()}
              value={state?.fkType ?? null}
              onChange={e => setState(p => ({...p, fkType: e}))}
              name='fkType'
              placeholder='-- --'
              label='Fiche'
            />
          </Col>
          
          {!data && (
            <>
              <Col md={4} className='mb-3'>
                <SingleSelectField
                  disabled={agentsLoader || isLoading || isEditLoading || loader}
                  onRefresh={async (): Promise<void> => { await agentsRefresh() }}
                  options={doctorsOptions()}
                  value={state?.fkAgent ?? null}
                  onChange={e => setState(p => ({...p, fkAgent: e}))}
                  name='fkAgent'
                  placeholder='-- --'
                  label='Médecin / Docteur'
                />
              </Col>
              
              <Col md={4} className='mb-3'>
                <SingleAsyncSelectField
                  required
                  disabled={isPatientsFetching || isLoading || isEditLoading || loader}
                  onRefresh={async (): Promise<void> => { await patientsRefresh() }}
                  options={patientsOptions()}
                  value={state?.fkPatient ?? null}
                  onChange={e => setState(p => ({...p, fkPatient: e}))}
                  name='fkPatient'
                  placeholder='-- --'
                  label='Patient(e)'
                  loadOptions={onSearchPatients}
                />
              </Col>
            </>
          ) as ReactNode}
        </Row>
        
        <Card>
          <Card.Body>
            {!data && (
              <>
                <div className={`mb-${state?.isSign ? '3' : '0'}`}>
                  <CheckField
                    inline
                    disabled={isLoading || isEditLoading || loader}
                    name='isSign'
                    value={state.isSign}
                    checked={state.isSign}
                    onChange={(): void => onConsultIsSignChange(setState)}
                    label='Prélèvement des signes vitaux :'
                  />
                </div>
                
                {state?.signes && (
                  <SignesVitauxFields
                    signes={state.signes}
                    setState={setState}
                    loader={isLoading || isEditLoading || loader}
                    state={state}
                    setConsult={setState}
                  />) as ReactNode}
              </>
            ) as ReactNode}
            
            <div className={`mb-${state?.isExam ? '3' : '0'}`}>
              <CheckField
                inline
                disabled={isLoading || isEditLoading || loader}
                name='isExam'
                value={state.isExam}
                checked={state.isExam}
                onChange={(): void => onConsultIsExamsChange(setState)}
                label='Prescription des examens :'
              />
            </div>
            {state?.isExam && (
              <>
                <div className='mb-3'>
                  <MultiSelectField
                    required
                    disabled={isLoading || isEditLoading || examsLoader || loader}
                    onRefresh={async (): Promise<void> => { await examsRefresh() }}
                    options={examsOptios()}
                    value={state.exams}
                    onChange={(e): void => onConsultExamsChange(e, setState)}
                    name='exams'
                    label='Examens'
                    placeholder='-- Aucun examen sélectionné --'
                  />
                </div>
                
                <div>
                  <TextAreaField
                    required
                    disabled={isLoading || isEditLoading || loader}
                    name='renseignementClinic'
                    onChange={(e): void => handleChange(e, state, setState)}
                    value={state.renseignementClinic}
                    label='Renseignement clinic :'
                    placeholder='Suite aux examens prescrits, ici les renseignements...'
                    rows={5}
                    size='sm'
                    error={errors.renseignementClinic}
                  />
                </div>
              </>
            ) as ReactNode}
          </Card.Body>
        </Card>
        
        <div className='mb-3 mt-4'>
          <TextAreaField
            disabled={isLoading || isEditLoading || loader}
            name='diagnostic'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.diagnostic}
            label='Plaintes & diagnostics :'
            placeholder='Diagnostic...'
            rows={5}
            size='sm'
            error={errors.diagnostic}
          />
        </div>
        
        <div className='mb-3 mt-4'>
          <TextAreaField
            disabled={isLoading || isEditLoading || loader}
            name='conclusion'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.conclusion}
            label='Conclusions :'
            placeholder='Vos conclusions ici...'
            rows={5}
            size='sm'
            error={errors.conclusion}
          />
        </div>
        
        <div className='mb-3'>
          <TextAreaField
            disabled={isLoading || isEditLoading || loader}
            name='comment'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.comment}
            label='Commentaire(s) :'
            placeholder='Autres commentaires ici...'
            rows={5}
            size='sm'
            error={errors.comment}
          />
        </div>
        
        <Row>
          <Col md={4} className='mb-3'>
            <TextField
              required
              disabled={isLoading || isEditLoading || loader}
              type='date'
              name='dateDebut'
              value={state.dateDebut}
              onChange={e => handleChange(e, state, setState)}
              label="Date d'admission"
            />
          </Col>
          
          {data && (
            <>
              <Col md={4} className='mb-3'>
                <SelectField
                  name='statut'
                  value={state.statut}
                  onChange={e => handleChange(e, state, setState)}
                  label='Statut'
                  error={errors.statut}
                  options={getConsultStatusOptions()}
                  disabled={isLoading || isEditLoading || loader}
                />
              </Col>
              
              <Col md={4} className='mb-3'>
                <CheckField
                  inline
                  name='end'
                  value={state.end}
                  checked={state.end}
                  onChange={e => onConsultEndChange(setState)}
                  label='Clôturer cette fiche :'
                  error={errors.end}
                />
                
                {state.end && (
                  <TextField
                    required
                    disabled={isLoading || isEditLoading || loader}
                    type='date'
                    name='dateFin'
                    value={state.dateFin}
                    onChange={e => handleChange(e, state, setState)}
                    label='Date de clôture'
                  />
                ) as ReactNode}
              </Col>
            </>
          ) as ReactNode}
        </Row>
        
        <Button type='submit' disabled={isLoading || isEditLoading || loader} className='w-100'>
          {!(isLoading || isEditLoading) && (<i className='me-1 bi-floppy me-1'/>) as ReactNode}
          {(isLoading || isEditLoading) && (<Spinner className='me-1' animation='border' size='sm'/>) as ReactNode}
          {data ? 'Modifier ' : 'Enregistrer '}
          cette fiche
        </Button>
      </form>
      
      <ConfirmationConsultModal
        show={show}
        onHide={(): void => handleShow(setShow)}
        state={state}
        setErrors={setErrors}
        onSubmit={data ? onEditConsultation : onPostConsultation}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
