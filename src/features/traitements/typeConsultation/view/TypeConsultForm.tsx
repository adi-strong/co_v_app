import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import {
  initTypeConsultationErrorState,
  initTypeConsultationState,
  onConsultPrixHTChange, onConsultTaxChange
} from "../model/typeConsultationService.ts";
import {formatDecimalNumberWithSpaces} from "../../../../services/services.ts";

export default function TypeConsultForm({ data }: { data?: TypeConsultation }) {
  
  const [typeConsult, setTypeConsult] = useState(initTypeConsultationState())
  const [errors/*, setErrors */] = useState(initTypeConsultationErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un type</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='nom'
            onChange={(e): void => handleChange(e, typeConsult, setTypeConsult)}
            value={typeConsult.nom}
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
            disabled={false}
            type='number'
            name='taxe'
            onChange={(e): void => onConsultTaxChange(e, setTypeConsult)}
            value={typeConsult.taxe}
            text='Ce champ ne peut accepter que des valeurs numériques.'
            label='Taxe(s) / TVA'
            size='sm'
            error={errors.prixHt}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            type='number'
            name='prixHt'
            onChange={(e): void => onConsultPrixHTChange(e, setTypeConsult)}
            value={typeConsult.prixHt}
            text='Ce champ ne peut accepter que des valeurs numériques.'
            label='Prix HT'
            size='sm'
            error={errors.prixHt}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled
            type='number'
            name='prixTtc'
            onChange={(e): void => handleChange(e, typeConsult, setTypeConsult)}
            value={formatDecimalNumberWithSpaces(typeConsult.prixTtc)}
            text='Ce champ ne peut accepter que des valeurs numériques.'
            label='Prix TTC'
            size='sm'
            error={errors.prixTtc}
          />
        </div>
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          un type de fiches
        </Button>
      </form>
    </>
  )
  
}
