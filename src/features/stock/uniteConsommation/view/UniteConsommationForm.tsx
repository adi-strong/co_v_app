import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import {
  initUniteConsommationErrorState,
  initUniteConsommationState,
  onUniteConsommationSubmit
} from "../model/uniteConsommationService.ts";
import useSetUniteData from "../hooks/useSetUniteData.ts";
import {
  useEditUniteConsommationMutation,
  usePostUniteConsommationMutation
} from "../model/uniteConsommation.api.slice.ts";

export default function UniteConsommationForm({ data, onHide, onRefresh }: { 
  data?: UniteConsommation
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [unite, setUnite] = useState(initUniteConsommationState())
  const [errors, setErrors] = useState(initUniteConsommationErrorState())
  const [onPostUnite, { isLoading }] = usePostUniteConsommationMutation()
  const [onEditUnite, { isLoading: isEditLoading }] = useEditUniteConsommationMutation()
  
  useSetUniteData(data, setUnite)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onUniteConsommationSubmit(
        e,
        unite,
        setUnite,
        setErrors,
        data ? onEditUnite : onPostUnite,
        onRefresh,
        onHide,
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une unité de consommations</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, unite, setUnite)}
            value={unite.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label="Nom de l'unité"
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'une unité de consommations'}
        </Button>
      </form>
    </>
  )
  
}
