import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {CategorieProduit} from "../model/categorieProduitService.ts";
import {
  initCategorieProduitErrorState,
  initCategorieProduitState,
  onCategorieProduitSubmit
} from "../model/categorieProduitService.ts";
import useSetFonctionData from "../../../personnel/fonction/hooks/useSetFonctionData.ts";
import {useEditCategorieProduitMutation, usePostCategorieProduitMutation} from "../model/categorieProduit.api.slice.ts";

export default function CategorieProduitForm({ data, onHide, onRefresh }: {
  data?: CategorieProduit
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [category, setCategory] = useState(initCategorieProduitState())
  const [errors, setErrors] = useState(initCategorieProduitErrorState())
  const [onPostCategory, { isLoading }] = usePostCategorieProduitMutation()
  const [onEditCategory, { isLoading: isEditLoading }] = useEditCategorieProduitMutation()
  
  useSetFonctionData(data, setCategory)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onCategorieProduitSubmit(
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
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'une catégorie'}
        </Button>
      </form>
    </>
  )
  
}
