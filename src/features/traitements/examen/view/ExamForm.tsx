import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {SingleSelectField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Examen} from "../model/examenService.ts";
import {initExamenErrorState, initExamenState, onExamenSubmit} from "../model/examenService.ts";
import {useGetCategoriesExamsQuery} from "../../categorieExam/model/categorieExam.api.slice.ts";
import useGetCategorieProdOptions from "../../../stock/categorieProduit/hooks/useGetCategorieProdOptions.ts";
import {useEditExamenMutation, usePostExamenMutation} from "../model/examen.api.slice.ts";
import useSetExamData from "../hooks/useSetExamData.ts";

export default function ExamForm({ data, onHide, onRefresh }: {
  data?: Examen
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [exam, setExam] = useState(initExamenState())
  const [errors, setErrors] = useState(initExamenErrorState())
  const [onPostExam, { isLoading }] = usePostExamenMutation()
  const [onEditExam, { isLoading: isEditLoading }] = useEditExamenMutation()
  
  const { refetch: categoriessRefresh, isFetching: categoriesLoader } = useGetCategoriesExamsQuery('LIST')
  
  useSetExamData(data, setExam)
  const examsCategoriesOptions = useGetCategorieProdOptions()
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onExamenSubmit(
        e,
        exam,
        setExam,
        setErrors,
        data ? onEditExam : onPostExam,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un examen</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <SingleSelectField
            required
            disabled={isLoading || isEditLoading || categoriesLoader}
            onRefresh={async (): Promise<void> => { await categoriessRefresh() }}
            options={examsCategoriesOptions()}
            value={exam?.fkCategorie ?? null}
            onChange={fkCategorie => setExam(e => ({ ...e, fkCategorie }))}
            name='fkCategorie'
            label='Catégorie'
            error={errors.fkCategorie}
            placeholder='-- Aucune catégorie sélectionnée --'
            size='sm'
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, exam, setExam)}
            value={exam.nom}
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
            onChange={(e): void => handleChange(e, exam, setExam)}
            value={exam.prixHt}
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
            onChange={(e): void => handleChange(e, exam, setExam)}
            value={exam.prixTtc}
            text='Ce champ ne peut accepter que les valeurs numériques.'
            label='Prix TTC'
            size='sm'
            error={errors.prixTtc}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un examen'}
        </Button>
      </form>
    </>
  )
  
}
