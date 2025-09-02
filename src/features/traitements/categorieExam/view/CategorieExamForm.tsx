import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {CategorieExam} from "../model/categorieExamService.ts";
import {
  initCategorieExamErrorState,
  initCategorieExamState,
  onCategorieExamSubmit
} from "../model/categorieExamService.ts";
import {useEditCategorieExamMutation, usePostCategorieExamMutation} from "../model/categorieExam.api.slice.ts";
import useSetCategorieExamensData from "../hooks/useSetCategorieExamensData.ts";

export default function CategorieExamForm({ data, onRefresh, onHide }: {
  data?: CategorieExam
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [category, setCategory] = useState(initCategorieExamState())
  const [errors, setErrors] = useState(initCategorieExamErrorState())
  const [onPostCategory, { isLoading }] = usePostCategorieExamMutation()
  const [onEditCategory, { isLoading: isEditLoading }] = useEditCategorieExamMutation()
  
  useSetCategorieExamensData(data, setCategory)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onCategorieExamSubmit(
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
