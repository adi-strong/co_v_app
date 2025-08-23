import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import {initUniteConsommationErrorState, initUniteConsommationState} from "../model/uniteConsommationService.ts";

export default function UniteConsommationForm({ data }: { data?: UniteConsommation }) {
  
  const [unite, setUnite] = useState(initUniteConsommationState())
  const [errors/*, setErrors */] = useState(initUniteConsommationErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une unité de consommations</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
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
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          une unité de consommations
        </Button>
      </form>
    </>
  )
  
}
