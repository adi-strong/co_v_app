import {useState} from "react";
import {initExamenErrorState, initExamenState} from "../../examen/model/examenService.ts";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Traitement} from "../model/traitementService.ts";
import {useEditTraitementMutation, usePostTraitementMutation} from "../model/traitement.api.slice.ts";
import {onTraitementSubmit} from "../model/traitementService.ts";
import useSetTraitementData from "../hooks/useSetTraitementData.ts";

export default function TraitementForm({ data, onHide, onRefresh }: {
  data?: Traitement
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [state, setState] = useState(initExamenState())
  const [errors, setErrors] = useState(initExamenErrorState())
  const [onPostTreatment, { isLoading }] = usePostTraitementMutation()
  const [onEditTreatment, { isLoading: isEditLoading }] = useEditTraitementMutation()
  
  useSetTraitementData(data, setState)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onTraitementSubmit(
        e,
        state,
        setState,
        setErrors,
        data ? onEditTreatment : onPostTreatment,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un traitement</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom'
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
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.prixHt}
            text='Ce champ ne peut accepter que les valeurs numériques.'
            label='Prix HT'
            size='sm'
            error={errors.prixHt}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            type='number'
            name='prixTtc'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.prixTtc}
            text='Ce champ ne peut accepter que les valeurs numériques.'
            label='Prix TTC'
            size='sm'
            error={errors.prixTtc}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un traitement'}
        </Button>
      </form>
    </>
  )
  
}
