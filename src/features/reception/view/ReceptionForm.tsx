import {ReactNode, useState} from "react";
import {Button, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import {
  CheckField,
  FormRequiredFieldsNoticeText,
  TextAreaField,
  TextField
} from "../../../components";
import {
  getReceiptReasonOptions,
  initReceptionErrorState,
  initReceptionState, onReceptionSubmit,
  setReceptionEstCePatient,
  setReceptionPatientName
} from "../model/receptionService.ts";
import {handleChange} from "../../../services/form.hander.service.ts";
import useGetPatientsOptions from "../../patients/patient/hooks/useGetPatientsOptions.ts";
import SelectField from "../../../components/forms/SelectField.tsx";
import {useGetReceptionsQuery, usePostReceptionMutation} from "../model/reception.api.slice.ts";
import {useGetPatientsQuery, useLazyGetSearchPatientsQuery} from "../../patients/patient/model/patient.api.slice.ts";
import SingleAsyncSelectField from "../../../components/forms/SingleAsyncSelectField.tsx";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import type {Patient} from "../../patients/patient/model/patientService.ts";
import toast from "react-hot-toast";
import type {SelectOptionType} from "../../../services/services.ts";
import {getSexOptions, handleShow} from "../../../services/services.ts";
import {useNavigate} from "react-router-dom";

const ConfirmModal = ({ show, onHide, onSubmit }: {
  show: boolean
  onHide: () => void
  onSubmit: (onHide: () => void) => void
}) => {
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-warning' closeButton>
        <Modal.Title><i className='bi bi-exclamation-triangle-fill'/> Confirmation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        <p><code><small><i className='bi bi-exclamation-circle-fill'/> Cette action est irréversible.</small></code></p>
        Êtes-vous certain(e) de vouloir valider cette opération <i className='bi bi-question-circle text-warning'/>
      </Modal.Body>
      
      <Modal.Footer>
        <Button type='button' variant='outline-dark' onClick={onHide}><i className='bi bi-x'/> Annuler</Button>
        <Button autoFocus type='button' variant='outline-warning' onClick={(): void => onSubmit(onHide)}>
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}

export default function ReceptionForm() {
  
  const navigate = useNavigate()
  
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [reception, setReception] = useState(initReceptionState())
  const [errors, setErrors] = useState(initReceptionErrorState())
  const [onPostReception, { isLoading }] = usePostReceptionMutation()
  const [getSearchPatients] = useLazyGetSearchPatientsQuery()
  
  const { refetch } = useGetReceptionsQuery('LIST')
  const { refetch: patientsRefresh, isFetching: isPatientsFetching } = useGetPatientsQuery('LIST')
  
  const patientsOptions = useGetPatientsOptions()
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  /* ----------------------------------------------------------------------------- */
  // Get Searched Patients Items
  
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
  
  // END Get Searched Patients Items
  /* ----------------------------------------------------------------------------- */
  
  
  /* ----------------------------------------------------------------------------- */
  // Get On Validate
  
  const onSubmit = (onHide: () => void): void => {
    onReceptionSubmit(
      reception,
      setErrors,
      onPostReception,
      onHide,
      navigate,
      onRefresh
    )
  }
  
  // END On Validate
  /* ----------------------------------------------------------------------------- */
  
  return (
    <>
      <FormRequiredFieldsNoticeText/>
      <form className='row' onSubmit={e => {
        e.preventDefault()
        handleShow(setIsConfirmed)
      }}>
        <Row>
          <Col md={6} className='mb-3 pt-7'>
            <CheckField
              inline
              disabled={isLoading}
              type='switch'
              name='estCePatient'
              value={reception.estCePatient}
              checked={reception.estCePatient}
              onChange={(): void => setReceptionEstCePatient(setReception)}
              error={errors.estCePatient}
              label='Est-ce un(e) patient(e) enregistré(e)'
            />
          </Col>
          
          {reception?.estCePatient && (
            <Col md={6} className='mb-3'>
              <SingleAsyncSelectField
                required
                disabled={isLoading || isPatientsFetching}
                onRefresh={async (): Promise<void> => { await patientsRefresh() }}
                options={patientsOptions()}
                value={reception?.patient ?? null}
                onChange={(e): void => setReceptionPatientName(e, setReception)}
                name='patient'
                label='Patient(e)'
                placeholder='-- Aucun(e) patient(e) sélectionné(e) --'
                loadOptions={onSearchPatients}
              />
            </Col>
          ) as ReactNode}
        </Row>
        
        <hr/>
        
        <Col md={6}>
          <div className='mb-3'>
            <TextField
              required
              disabled={(!!reception?.patient)}
              name='nomComplet'
              onChange={(e): void => handleChange(e, reception, setReception)}
              value={reception.nomComplet}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='Nom complet'
              size='sm'
              minLength={2}
              maxLength={255}
              error={errors.nomComplet}
            />
          </div>
          
          <div className='mb-3'>
            <SelectField
              required
              name='sexe'
              size='sm'
              value={reception.sexe}
              onChange={e => handleChange(e, reception, setReception)}
              error={errors.sexe}
              options={getSexOptions()}
              label='Sexe'
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              disabled={isLoading}
              name='tel'
              onChange={(e): void => handleChange(e, reception, setReception)}
              value={reception.tel}
              label='Numéro de téléphone'
              size='sm'
              maxLength={255}
              error={errors.tel}
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              disabled={isLoading}
              type='email'
              name='email'
              onChange={(e): void => handleChange(e, reception, setReception)}
              value={reception.email}
              label='E-mail'
              size='sm'
              maxLength={255}
              error={errors.email}
            />
          </div>
        </Col>
        
        <Col md={6}>
          <Form.Label>Lieu & date de naissance :</Form.Label>
          <Row>
            <Col md={6} className='mb-3'>
              <TextField
                disabled={isLoading}
                name='lieuNaissance'
                onChange={(e): void => handleChange(e, reception, setReception)}
                value={reception.lieuNaissance}
                size='sm'
                maxLength={255}
                error={errors.lieuNaissance}
                placeholder='lieu...'
              />
            </Col>
            
            <Col md={6} className='mb-3'>
              <TextField
                disabled={isLoading}
                type='date'
                name='dateNaissance'
                onChange={(e): void => handleChange(e, reception, setReception)}
                value={reception.dateNaissance}
                size='sm'
                maxLength={255}
                error={errors.dateNaissance}
              />
            </Col>
          </Row>
          
          <div style={{marginTop: 24}} className='mb-3'>
            <SelectField
              required
              name='motif'
              size='sm'
              value={reception.motif}
              onChange={e => handleChange(e, reception, setReception)}
              error={errors.motif}
              options={getReceiptReasonOptions()}
              label='Motif'
            />
          </div>
          
          <div className='mb-3'>
            <TextAreaField
              disabled={isLoading}
              name='commentaire'
              onChange={(e): void => handleChange(e, reception, setReception)}
              value={reception.commentaire}
              label='Commentaire(s)'
              size='sm'
              error={errors.commentaire}
              rows={4}
            />
          </div>
          
          <Button type='submit' disabled={isLoading} size='sm' className='w-100'>
            {isLoading && <Spinner className='me-1' animation='border' size='sm' />}
            {isLoading ? 'Veuillez patienter' : 'Valider'}
          </Button>
        </Col>
      </form>
      
      <ConfirmModal
        show={isConfirmed}
        onHide={(): void => handleShow(setIsConfirmed)}
        onSubmit={(): void => onSubmit((): void => handleShow(setIsConfirmed))}
      />
    </>
  )
  
}
