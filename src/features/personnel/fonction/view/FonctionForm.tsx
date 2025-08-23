import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import type {Fonction} from "../model/fonctionService.ts";
import {initFonctionErrorState, initFonctionState} from "../model/fonctionService.ts";

export default function FonctionForm({ data }: { data?: Fonction }) {
  
  const [fonction, setFonction] = useState(initFonctionState())
  const [errors/*, setErrors */] = useState(initFonctionErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une fonction</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
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
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          une fonction
        </Button>
      </form>
    </>
  )
  
}
