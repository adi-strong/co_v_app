import {ReactNode, useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import {
  initTypeConsultationErrorState,
  initTypeConsultationState,
  onConsultPrixHTChange, onConsultTaxChange, onTypeConsultationSubmit
} from "../model/typeConsultationService.ts";
import {useEditTypeConsultationMutation, usePostTypeConsultationMutation} from "../model/typeConsultation.api.slice.ts";
import useSetTypeConsultationsData from "../hooks/useSetTypeConsultationsData.ts";

export default function TypeConsultForm({ data, onHide, onRefresh }: {
  data?: TypeConsultation
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [state, setState] = useState(initTypeConsultationState())
  const [errors, setErrors] = useState(initTypeConsultationErrorState())
  const [onPostTypeConsult, { isLoading }] = usePostTypeConsultationMutation()
  const [onEditTypeConsult, { isLoading: isEditLoading }] = useEditTypeConsultationMutation()
  
  useSetTypeConsultationsData(data, setState)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onTypeConsultationSubmit(
        e,
        state,
        setState,
        setErrors,
        data ? onEditTypeConsult : onPostTypeConsult,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un type</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom du type'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            type='number'
            name='prixHt'
            onChange={(e): void => onConsultPrixHTChange(e, setState)}
            value={state.prixHt}
            text='Ce champ ne peut accepter que des valeurs numériques.'
            label='Prix HT'
            size='sm'
            error={errors.prixHt}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            disabled={isLoading || isEditLoading}
            type='number'
            name='taxe'
            onChange={(e): void => onConsultTaxChange(e, setState)}
            value={state.taxe}
            text='Ce champ ne peut accepter que des valeurs numériques.'
            label='Taxe(s) / TVA'
            size='sm'
            error={errors.taxe}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={(state.taxe > 0) || isLoading || isEditLoading}
            type='number'
            name='prixTtc'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.taxe > 0 && !isNaN(state.prixTtc)
              ? state.prixTtc.toFixed(2)
              : state.prixTtc}
            text='Ce champ ne peut accepter que des valeurs numériques.'
            label='Prix TTC'
            size='sm'
            error={errors.prixTtc}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && (<Spinner className='me-1' animation='border' size='sm'/>) as ReactNode}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un type de fiches'}
        </Button>
      </form>
    </>
  )
  
}
