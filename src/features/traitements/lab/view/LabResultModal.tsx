import type {Lab} from "../model/labService.ts";
import {Button, Col, Modal, Row, Spinner} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {initLabErrorState, initLabState, onLabSubmit} from "../model/labService.ts";
import useSetLabData from "../hooks/useSetLabData.ts";
import {useEditLabMutation} from "../model/lab.api.slice.ts";
import {TextAreaField, TextField} from "../../../../components";
import {handleChange, handleSubItemToTheItemArrayChange} from "../../../../services/form.hander.service.ts";

export default function LabResultModal(props: {
  show: boolean
  onHide: () => void
  onRefresh: () => void
  data?: Lab
}) {
  
  const {
    show,
    data,
    onHide,
    onRefresh,
  } = props
  
  const [state, setState] = useState(initLabState())
  const [errors, setErrors] = useState(initLabErrorState())
  const [onEditLab, { isLoading }] = useEditLabMutation()
  
  useSetLabData(data, setState)
  
  return (
    <Modal show={show} onHide={onHide} size='lg'>
      <Modal.Header closeButton className='bg-danger-subtle'>
        <Modal.Title><i className='bi bi-file-earmark-medical'/> Résultats après analyses labo</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className='bg-light-subtle p-2' style={{ borderRadius: 6 }}>
          {state.examsItems.length > 0 && state.examsItems.map((exam, index) => (
            <Row key={index}>
              <Col md={6} className='mb-3'>
                <TextField
                  disabled={isLoading}
                  name='resultats'
                  label={<>Résultat : <b>{exam.label}</b></>}
                  value={exam.resultats}
                  size='sm'
                  onChange={e => handleSubItemToTheItemArrayChange(
                    e,
                    index,
                    setState,
                    'examsItems'
                  )}
                />
              </Col>
              
              <Col md={6} className='mb-3'>
                <TextField
                  disabled={isLoading}
                  name='valeurNormale'
                  label='Valeur(s) normale(s)'
                  value={exam.valeurNormale}
                  size='sm'
                  onChange={e => handleSubItemToTheItemArrayChange(
                    e,
                    index,
                    setState,
                    'examsItems'
                  )}
                />
              </Col>
            </Row>
          ) as ReactNode)}
        </div>
        
        <div className='mb-3 mt-3'>
          <TextAreaField
            disabled={isLoading}
            name='conclusion'
            value={state.conclusion}
            onChange={e => handleChange(e, state, setState)}
            label='Conclusion(s) :'
            rows={5}
            error={errors.conclusion}
          />
        </div>
        
        <div className='mb-3'>
          <TextAreaField
            disabled={isLoading}
            name='comment'
            value={state.comment}
            onChange={e => handleChange(e, state, setState)}
            label='Commentaire(s) :'
            rows={5}
            error={errors.comment}
          />
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button
          size='sm'
          variant='outline-dark'
          onClick={onHide}
          disabled={isLoading}>
          <i className='bi bi-x'/> Annuler
        </Button>
        
        <Button
          size='sm'
          variant='outline-primary'
          disabled={isLoading}
          onClick={async (): Promise<void> => onLabSubmit(
            state,
            setErrors,
            onEditLab,
            onHide,
            onRefresh
          )}>
          {!isLoading && (<i className='bi bi-check me-1'/>) as ReactNode}
          {isLoading && (<Spinner className='me-1' animation='border' size='sm'/>) as ReactNode}
          {isLoading ? 'Veuillez patienter' : 'Publier'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}
