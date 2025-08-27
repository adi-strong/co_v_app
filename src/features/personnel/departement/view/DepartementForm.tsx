import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Departement} from "../model/departementService.ts";
import {initDepartementErrorState, initDepartementState} from "../model/departementService.ts";

export default function DepartementForm({ data }: { data?: Departement }) {
  
  const [departement, setDepartement] = useState(initDepartementState())
  const [errors/*, setErrors */] = useState(initDepartementErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un département</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='nom'
            onChange={(e): void => handleChange(e, departement, setDepartement)}
            value={departement.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom du département'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          un département
        </Button>
      </form>
    </>
  )
  
}
