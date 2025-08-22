import type {CategorieLit} from "../model/categorieLitService.ts";
import {useState} from "react";
import {initCategorieLitErrorState, initCategorieLitState} from "../model/categorieLitService.ts";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import {Button, Card} from "react-bootstrap";

export default function CategorieLitForm({ data }: { data?: CategorieLit }) {
  
  const [category, setCategory] = useState(initCategorieLitState())
  const [errors, setErrors] = useState(initCategorieLitErrorState())
  
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
          />
        </div>
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          une catégorie
        </Button>
      </form>
    </>
  )
  
}
