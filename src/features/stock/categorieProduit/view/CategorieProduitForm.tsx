import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {CategorieProduit} from "../model/categorieProduitService.ts";
import {initCategorieProduitErrorState, initCategorieProduitState} from "../model/categorieProduitService.ts";

export default function CategorieProduitForm({ data }: { data?: CategorieProduit }) {
  
  const [category, setCategory] = useState(initCategorieProduitState())
  const [errors/*, setErrors */] = useState(initCategorieProduitErrorState())
  
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
          une catégorie
        </Button>
      </form>
    </>
  )
  
}
