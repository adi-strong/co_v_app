import type {CategorieLit} from "../model/categorieLitService.ts";
import {useState} from "react";
import {initCategorieLitErrorState, initCategorieLitState, onCategorieLitSubmit} from "../model/categorieLitService.ts";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {Button, Card, Spinner} from "react-bootstrap";
import {useEditCategorieLitMutation, usePostCategorieLitMutation} from "../model/categorieLit.api.slice.ts";
import useSetCategorieLitData from "../hooks/useSetCategorieLitData.ts";

export default function CategorieLitForm({ data, onRefresh, onHide }: {
  data?: CategorieLit
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [category, setCategory] = useState(initCategorieLitState())
  const [errors, setErrors] = useState(initCategorieLitErrorState())
  const [onPostCategory, { isLoading }] = usePostCategorieLitMutation()
  const [onEditCategory, { isLoading: isEditLoading }] = useEditCategorieLitMutation()
  
  useSetCategorieLitData(data, setCategory)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onCategorieLitSubmit(
        e,
        category,
        setCategory,
        setErrors,
        data ? onEditCategory : onPostCategory,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une catégorie</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, category, setCategory)}
            value={category.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom de la catégorie'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'une catégorie de lits'}
        </Button>
      </form>
    </>
  )
  
}
