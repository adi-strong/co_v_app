import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {SingleSelectField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Examen} from "../model/examenService.ts";
import {initExamenErrorState, initExamenState} from "../model/examenService.ts";
import useGetExamOptions from "../hooks/useGetExamOptions.ts";

export default function ExamForm({ data }: { data?: Examen }) {
  
  const examOptions = useGetExamOptions()
  
  const [exam, setExam] = useState(initExamenState())
  const [errors/*, setErrors */] = useState(initExamenErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un examen</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <SingleSelectField
            required
            disabled={false}
            onRefresh={(): void => { }}
            options={examOptions()}
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
            disabled={false}
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
            disabled={false}
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
            disabled={false}
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
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          un examen
        </Button>
      </form>
    </>
  )
  
}
