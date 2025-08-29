import type {DocumentSuivi} from "../model/documentSuiviService.ts";
import {ReactNode, useState} from "react";
import {
  getDocStatusOptions,
  initDocumentSuiviErrorState,
  initDocumentSuiviState
} from "../model/documentSuiviService.ts";
import {Col, Row} from "react-bootstrap";
import {CheckField, FormRequiredFieldsNoticeText, SingleSelectField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";

export default function DocumentForm({ data }: { data?: DocumentSuivi }) {
  
  const [doc, setDoc] = useState(initDocumentSuiviState())
  const [errors/*, setErrors */] = useState(initDocumentSuiviErrorState())
  
  return (
    <>
      <FormRequiredFieldsNoticeText/>
      <form className='row' onSubmit={e => e.preventDefault()}>
        <Col md={5}>
          <div className='mb-3'>
            <SingleSelectField
              disabled={false}
              onRefresh={(): void => { }}
              options={[]}
              value={doc?.fkType ?? null}
              onChange={e => setDoc(d => ({ ...d, fkType: e }))}
              name='fkType'
              label='Type de fiche'
              placeholder='-- Aucune option sélectionnée --'
              error={errors.fkType}
            />
          </div>
          
          <div className='mb-3'>
            <SingleSelectField
              disabled={false}
              onRefresh={(): void => { }}
              options={[]}
              value={doc?.fkAgent ?? null}
              onChange={e => setDoc(d => ({ ...d, fkAgent: e }))}
              name='fkAgent'
              label='Infirmier / Médecin'
              placeholder='-- --'
              error={errors.fkAgent}
            />
          </div>
          
          <div className='mb-3'>
            <SingleSelectField
              required
              disabled={false}
              onRefresh={(): void => { }}
              options={[]}
              value={doc?.fkType ?? null}
              onChange={e => setDoc(d => ({ ...d, fkPatient: e }))}
              name='fkPatient'
              label='Patient(e)'
              placeholder='-- Aucun(e) patient(e) sélectionné(e) --'
              error={errors.fkPatient}
            />
          </div>
        </Col>
        
        <Col md={7}>
          <div className='mb-3'>
            <TextField
              disabled={false}
              name='motif'
              onChange={(e): void => handleChange(e, doc, setDoc)}
              value={doc.motif}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='Motif'
              maxLength={255}
              error={errors.motif}
            />
          </div>
          
          <Row>
            <Col md={6} className='mb-3'>
              <TextField
                required
                disabled={false}
                type='date'
                name='dateDebut'
                onChange={(e): void => handleChange(e, doc, setDoc)}
                value={doc.dateDebut}
                label='Date début de suivi'
                error={errors.dateDebut}
              />
            </Col>
            
            <Col md={6} className='mb-3'>
              <SelectField
                disabled={false}
                name='statut'
                value={doc.statut}
                onChange={e => handleChange(e, doc, setDoc)}
                error={errors.statut}
                label='STATUT'
                options={getDocStatusOptions()}
              />
            </Col>
            
            {data && (
              <Col md={4} className='mb-3 pt-3'>
                <CheckField
                  inline
                  disabled={false}
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
                <Col md={4} className='mb-3'>
                  <TextField
                    disabled={false}
                    type='date'
                    name='dateFin'
                    onChange={(e): void => handleChange(e, doc, setDoc)}
                    value={doc.dateFin}
                    label='Date de fin de suivi / traitement'
                    error={errors.dateFin}
                    text="Si la date n'est pas renseignée le système affectera la date en cours par défaut."
                  />
                </Col>
                
                <Col md={4} className='mb-3'>
                  <TextField
                    disabled={false}
                    type='date'
                    name='dateSortie'
                    onChange={(e): void => handleChange(e, doc, setDoc)}
                    value={doc.dateSortie}
                    label="Date de fin d'hospitalisation"
                    text="Si la date n'est pas renseignée le système affectera la date en cours par défaut."
                    error={errors.dateSortie}
                  />
                </Col>
              </>
            ) as ReactNode}
          </Row>
        </Col>
      </form>
    </>
  )
  
}
