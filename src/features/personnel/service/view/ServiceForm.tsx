import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import type {Service} from "../model/serviceService.ts";
import {initServiceErrorState, initServiceState} from "../model/serviceService.ts";

export default function ServiceForm({ data }: { data?: Service }) {
  
  const [service, setService] = useState(initServiceState())
  const [errors/*, setErrors */] = useState(initServiceErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un service</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='nom'
            onChange={(e): void => handleChange(e, service, setService)}
            value={service.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom du service'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          un service
        </Button>
      </form>
    </>
  )
  
}
