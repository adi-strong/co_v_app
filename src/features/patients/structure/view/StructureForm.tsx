import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import type {Structure} from "../model/structureService.ts";
import {initStructureErrorState, initStructureState} from "../model/structureService.ts";

export default function StructureForm({ data }: { data?: Structure }) {
  
  const [structure, setStructure] = useState(initStructureState())
  const [errors/*, setErrors */] = useState(initStructureErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une structure</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='nom'
            onChange={(e): void => handleChange(e, structure, setStructure)}
            value={structure.nom}
            text='(Convention, Organisation, Entreprise, etc.). Ce champ ne peut dépasser 255 caractères.'
            label='Dénomination de la structure'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            disabled={false}
            name='focal'
            onChange={(e): void => handleChange(e, structure, setStructure)}
            value={structure.focal}
            text='Nom / Fonction / Grade : de la personne à appeler. Ce champ ne peut dépasser 255 caractères.'
            label='Point focal'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.focal}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='tel'
            onChange={(e): void => handleChange(e, structure, setStructure)}
            value={structure.tel}
            text='Numéro de téléphone de la personne à appeler.'
            label='Numéro de téléphone'
            size='sm'
            error={errors.tel}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            disabled={false}
            type='email'
            name='email'
            onChange={(e): void => handleChange(e, structure, setStructure)}
            value={structure.email}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='E-mail'
            size='sm'
            error={errors.email}
          />
        </div>
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          une structure
        </Button>
      </form>
    </>
  )
  
}
