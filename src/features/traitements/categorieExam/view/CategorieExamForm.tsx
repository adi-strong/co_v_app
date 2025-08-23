import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import type {CategorieExam} from "../model/categorieExamService.ts";
import {initCategorieExamErrorState, initCategorieExamState} from "../model/categorieExamService.ts";

export default function CategorieExamForm({ data }: { data?: CategorieExam }) {
  
  const [category, setCategory] = useState(initCategorieExamState())
  const [errors/*, setErrors */] = useState(initCategorieExamErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une catégorie</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
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
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          une catégorie d'examens
        </Button>
      </form>
    </>
  )
  
}