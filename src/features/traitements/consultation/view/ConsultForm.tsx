import type {Consultation} from "../model/consultationService.ts";
import {ReactNode, useState} from "react";
import {
  initConsultationErrorState,
  initConsultationState, onConsultExamsChange, onConsultIsExamsChange,
  onConsultIsSignChange
} from "../model/consultationService.ts";
import {Button, Card, Col, Row} from "react-bootstrap";
import {
  CheckField,
  FormRequiredFieldsNoticeText,
  MultiSelectField,
  SingleSelectField, TextAreaField
} from "../../../../components";
import SignesVitauxFields from "./SignesVitauxFields.tsx";
import useGetExamOptions from "../../examen/hooks/useGetExamOptions.ts";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {handleShow} from "../../../../services/services.ts";
import ConfirmationConsultModal from "./ConfirmationConsultModal.tsx";

export default function ConsultForm({ data }: { data?: Consultation }) {
  
  const examOptions = useGetExamOptions()
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState(initConsultationState())
  const [errors/*, setErrors */] = useState(initConsultationErrorState())
  
  return (
    <>
      <FormRequiredFieldsNoticeText/>
      <h3 className='mb-3'><i className='bi bi-lungs-fill'/> Formuaire de consultation</h3>
      <form onSubmit={e => {
        e.preventDefault()
        handleShow(setShow)
      }}>
        <Row>
          <Col md={4} className='mb-3'>
            <SingleSelectField
              required
              disabled={false}
              options={[]}
              value={state?.fkType ?? null}
              onChange={e => setState(p => ({...p, fkType: e}))}
              name='fkType'
              placeholder='-- --'
              label='Fiche'
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <SingleSelectField
              required
              disabled={false}
              options={[]}
              value={state?.fkAgent ?? null}
              onChange={e => setState(p => ({...p, fkAgent: e}))}
              name='fkAgent'
              placeholder='-- --'
              label='Médecin / Docteur'
            />
          </Col>
          
          <Col md={4} className='mb-3'>
            <SingleSelectField
              required
              disabled={false}
              options={[]}
              value={state?.fkPatient ?? null}
              onChange={e => setState(p => ({...p, fkPatient: e}))}
              name='fkPatient'
              placeholder='-- --'
              label='Patient(e)'
            />
          </Col>
        </Row>
        
        <Card>
          <Card.Body>
            {!data && (
              <>
                <div className={`mb-${state?.isSign ? '3' : '0'}`}>
                  <CheckField
                    inline
                    disabled={false}
                    name='isSign'
                    value={state.isSign}
                    checked={state.isSign}
                    onChange={(): void => onConsultIsSignChange(setState)}
                    label='Prélèvement des signes vitaux :'
                  />
                </div>
                {state?.signes && (<SignesVitauxFields signes={state.signes}/>) as ReactNode}
              </>
            ) as ReactNode}
            
            <div className={`mb-${state?.isExam ? '3' : '0'}`}>
              <CheckField
                inline
                disabled={false}
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
                    disabled={false}
                    onRefresh={(): void => {
                    }}
                    options={examOptions()}
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
                    disabled={false}
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
            disabled={false}
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
            disabled={false}
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
            disabled={false}
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
        
        <Button type='submit' disabled={false} className='w-100'>
          <i className='me-1 bi-floppy'/>
          {data ? 'Modifier ' : 'Enregistrer '}
          cette fiche
        </Button>
      </form>
      
      <ConfirmationConsultModal show={show} onHide={(): void => handleShow(setShow)} state={state} />
    </>
  )
  
}
