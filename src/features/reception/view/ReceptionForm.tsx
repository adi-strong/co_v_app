import {ReactNode, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {
  CheckField,
  FormRequiredFieldsNoticeText,
  SingleSelectField,
  TextAreaField,
  TextField
} from "../../../components";
import type {Reception} from "../model/receptionService.ts";
import {
  getReceiptReasonOptions,
  initReceptionErrorState,
  initReceptionState,
  setReceptionEstCePatient,
  setReceptionPatientName
} from "../model/receptionService.ts";
import {handleChange} from "../../../services/form.hander.service.ts";
import useGetPatientsOptions from "../../patients/patient/hooks/useGetPatientsOptions.ts";
import SelectField from "../../../components/forms/SelectField.tsx";
import {getSexOptions, handleShow} from "../../../services/services.ts";

const ConfirmModal = ({ show, onHide, onSubmit }: {
  show: boolean
  onHide: () => void
  onSubmit: () => void
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
        <Button autoFocus type='button' variant='outline-warning' onClick={onHide}>
          <i className='bi bi-check'/> Valider
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}

export default function ReceptionForm({ data }: { data?: Reception }) {
  
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [reception, setReception] = useState(initReceptionState())
  const [errors/*, setErrors */] = useState(initReceptionErrorState())
  
  const patientsOptions = useGetPatientsOptions()
  
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
              disabled={false}
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
              <SingleSelectField
                required
                disabled={false}
                options={patientsOptions()}
                value={reception?.patient ?? null}
                onChange={(e): void => setReceptionPatientName(e, setReception)}
                name='patient'
                label='Patient(e)'
                placeholder='-- Aucun(e) patient(e) sélectionné(e) --'
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
              disabled={false}
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
              disabled={false}
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
                disabled={false}
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
                disabled={false}
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
              disabled={false}
              name='commentaire'
              onChange={(e): void => handleChange(e, reception, setReception)}
              value={reception.commentaire}
              label='Commentaire(s)'
              size='sm'
              error={errors.commentaire}
              rows={4}
            />
          </div>
          
          <Button type='submit' disabled={false} size='sm' className='w-100'>
            Valider
          </Button>
        </Col>
      </form>
      
      <ConfirmModal
        show={isConfirmed}
        onHide={(): void => handleShow(setIsConfirmed)}
        onSubmit={(): void => {}}
      />
    </>
  )
  
}
