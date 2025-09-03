import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Fonction} from "../model/fonctionService.ts";
import {initFonctionErrorState, initFonctionState, onFonctionSubmit} from "../model/fonctionService.ts";
import {useEditFonctionMutation, usePostFonctionMutation} from "../model/fonction.api.slice.ts";
import useSetFonctionData from "../hooks/useSetFonctionData.ts";

export default function FonctionForm({ data, onRefresh, onHide }: {
  data?: Fonction
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [fonction, setFonction] = useState(initFonctionState())
  const [errors, setErrors] = useState(initFonctionErrorState())
  const [onPostFonction, { isLoading }] = usePostFonctionMutation()
  const [onEditFonction, { isLoading: isEditLoading }] = useEditFonctionMutation()
  
  useSetFonctionData(data, setFonction)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onFonctionSubmit(
        e,
        fonction,
        setFonction,
        setErrors,
        data ? onEditFonction : onPostFonction,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une fonction</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, fonction, setFonction)}
            value={fonction.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom de la fonction'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'une fonction'}
        </Button>
      </form>
    </>
  )
  
}
