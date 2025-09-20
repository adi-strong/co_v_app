import type {DocumentSuivi} from "../model/documentSuiviService.ts";
import {ReactNode, useState} from "react";
import {
  getDocStatusOptions,
  initDocumentSuiviErrorState,
  initDocumentSuiviState, onDocumentSuiviSubmit
} from "../model/documentSuiviService.ts";
import {Button, Col, Spinner} from "react-bootstrap";
import {CheckField, FormRequiredFieldsNoticeText, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {
  useEditDocumentSuiviMutation,
  useGetDocumentSuivisQuery,
  usePostDocumentSuiviMutation
} from "../model/documentSuivi.api.slice.ts";
import useSetDocSuiviData from "../hooks/useSetDocSuiviData.ts";
import {useGetPatientsQuery, useLazyGetSearchPatientsQuery} from "../../../patients/patient/model/patient.api.slice.ts";
import useGetPatientsOptions from "../../../patients/patient/hooks/useGetPatientsOptions.ts";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import toast from "react-hot-toast";
import SingleAsyncSelectField from "../../../../components/forms/SingleAsyncSelectField.tsx";
import {useNavigate} from "react-router-dom";

export default function DocumentForm({ data, handleRefresh, loader = false }: {
  data?: DocumentSuivi,
  handleRefresh?: () => void
  loader?: boolean
}) {
  
  const navigate = useNavigate()
  
  const [doc, setDoc] = useState(initDocumentSuiviState())
  const [errors, setErrors] = useState(initDocumentSuiviErrorState())
  const [getSearchPatients] = useLazyGetSearchPatientsQuery()
  const [onPostDocumentSuivi, { isLoading }] = usePostDocumentSuiviMutation()
  const [onEditDocumentSuivi, { isLoading: isEditLoading }] = useEditDocumentSuiviMutation()
  
  const { refetch } = useGetDocumentSuivisQuery('LIST')
  const { refetch: patientsRefresh, isFetching: isPatientsFetching } = useGetPatientsQuery('LIST')
  
  useSetDocSuiviData(data, setDoc)
  const patientsOptions = useGetPatientsOptions()
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
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
      <FormRequiredFieldsNoticeText/>
      <form className='row' onSubmit={e => onDocumentSuiviSubmit(
        e,
        doc,
        setErrors,
        data ? onEditDocumentSuivi : onPostDocumentSuivi,
        data ? handleRefresh : onRefresh,
        navigate
      )}>
        <Col md={6} className='mb-3'>
          {!data && (
            <SingleAsyncSelectField
              required
              disabled={loader || isLoading || isEditLoading || isPatientsFetching}
              onRefresh={async (): Promise<void> => {
                await patientsRefresh()
              }}
              options={patientsOptions()}
              value={doc?.fkPatient ?? null}
              onChange={e => setDoc(d => ({...d, fkPatient: e}))}
              name='fkPatient'
              label='Patient(e)'
              placeholder='-- Aucun(e) patient(e) sélectionné(e) --'
              error={errors.fkPatient}
              loadOptions={onSearchPatients}
            />
          ) as ReactNode}
          
          {data && data?.fkPatient && (
            <>
              <h4>
                <i className='bi bi-person-fill me-1'/>
                {data.fkPatient?.fullName?.toUpperCase() ?? data.fkPatient.nom.toUpperCase()}
              </h4>
            </>
          ) as ReactNode}
          
          {data && !data?.fkPatient && '—'}
        </Col>
        
        <Col md={6} className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading || isPatientsFetching}
            name='motif'
            onChange={(e): void => handleChange(e, doc, setDoc)}
            value={doc.motif}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Motif'
            maxLength={255}
            error={errors.motif}
          />
        </Col>
        
        <Col md={6} className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading || isPatientsFetching}
            type='date'
            name='dateDebut'
            onChange={(e): void => handleChange(e, doc, setDoc)}
            value={doc.dateDebut}
            label='Date début de suivi'
            error={errors.dateDebut}
          />
        </Col>
        
        {data && (
          <Col md={6} className='mb-3'>
            <SelectField
              disabled={isLoading || isEditLoading || isPatientsFetching}
              name='statut'
              value={doc.statut}
              onChange={e => handleChange(e, doc, setDoc)}
              error={errors.statut}
              label='STATUT'
              options={getDocStatusOptions()}
            />
          </Col>
        ) as ReactNode}
        
        {!data && (
          <Col md={6} className='mb-3 pt-6'>
            <Button disabled={loader || isLoading || isEditLoading} type='submit' className='w-100'>
              {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
              {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'Valider'}
            </Button>
          </Col>
        ) as ReactNode} {/* Submit button */}
        
        {data && (
          <Col md={doc.end ? 4 : 12} className='mb-3 pt-3'>
            <CheckField
              inline
              disabled={isLoading || isEditLoading || isPatientsFetching}
              label='Clôturer la fiche'
              name='end'
              value={doc.end}
              checked={doc.end}
              onChange={e => handleChange(e, doc, setDoc)}
            />
          </Col>
        ) as ReactNode}
        
        {doc?.end && (
          <>
            <Col md={doc.end ? 8 : 6} className='mb-3'>
              <TextField
                required
                disabled={isLoading || isEditLoading || isPatientsFetching}
                type='date'
                name='dateFin'
                onChange={(e): void => handleChange(e, doc, setDoc)}
                value={doc.dateFin}
                label='Date de fin de suivi / traitement'
                error={errors.dateFin}
              />
            </Col>
            
            {data?.hospitalisation && (
              <Col md={6} className='mb-3'>
                <TextField
                  required
                  disabled={isLoading || isEditLoading || isPatientsFetching}
                  type='date'
                  name='dateSortie'
                  onChange={(e): void => handleChange(e, doc, setDoc)}
                  value={doc.dateSortie}
                  label="Date de fin d'hospitalisation"
                  error={errors.dateSortie}
                />
              </Col>
            ) as ReactNode}
          </>
        ) as ReactNode}
        
        {data && (
          <Col md={data && data.hospitalisation && doc.end ? 6 : 12} className='mb-3'>
            <Button disabled={loader || isLoading || isEditLoading} type='submit' className='w-100'>
              {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
              {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'Modifier'}
            </Button>
          </Col>
        ) as ReactNode}
      </form>
    </>
  )
  
}
