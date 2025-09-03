import type {CompteCaisse} from "../model/compteCaisseService.ts";
import {ReactNode, useState} from "react";
import {initCompteCaisseErrorState, initCompteCaisseState, onCompteCaisseSubmit} from "../model/compteCaisseService.ts";
import useSetCompteData from "../hooks/useSetCompteData.ts";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {deviseLabel} from "../../../../services/services.ts";
import {useEditCompteCaisseMutation} from "../model/compteCaisse.api.slice.ts";

export default function UniqueCompteForm({ data, onRefresh }: { data?: CompteCaisse, onRefresh: () => void }) {
  
  const [state, setState] = useState(initCompteCaisseState())
  const [errors, setErrors] = useState(initCompteCaisseErrorState())
  const [onEditCompte, { isLoading: isEditLoading }] = useEditCompteCaisseMutation()
  
  useSetCompteData(data, setState)
  
  return (
    <form onSubmit={e => onCompteCaisseSubmit(
      e,
      state,
      setErrors,
      onEditCompte,
      onRefresh
    )}>
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='nom'><code>*</code> 1ère devise</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextField
            required
            disabled
            name='first'
            onChange={(e): void => handleChange(e, state, setState)}
            value={deviseLabel[state.first]}
            maxLength={255}
            error={errors.nom}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='nom'><code>*</code> 2ème devise</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextField
            required
            disabled
            name='first'
            onChange={(e): void => handleChange(e, state, setState)}
            value={deviseLabel[state.last]}
            maxLength={255}
            error={errors.nom}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='nom'><code>*</code> Taux</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextField
            required
            disabled={isEditLoading}
            name='taux'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.taux}
            error={errors.taux}
          />
        </Col>
        
        <Col md={8} className='offset-md-4 mt-4'>
          <Button type='submit' disabled={isEditLoading}>
            {isEditLoading && (<Spinner className='me-1' animation='border' size='sm' />) as ReactNode}
            {isEditLoading ? 'Veuillez patienter' : 'Sauvegarder'}
          </Button>
        </Col>
      </Row>
    </form>
  )
  
}
