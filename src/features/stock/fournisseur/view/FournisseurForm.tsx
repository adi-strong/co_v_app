import type {Fournisseur} from "../model/fournisseurService.ts";
import {FormRequiredFieldsNoticeText, TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {useState} from "react";
import {initFournisseurErrorState, initFournisseurState} from "../model/fournisseurService.ts";
import {Button} from "react-bootstrap";

export default function FournisseurForm({ data }: { data?: Fournisseur }) {
  
  const [state, setState] = useState(initFournisseurState())
  const [errors/*, setErrors*/] = useState(initFournisseurErrorState())
  
  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormRequiredFieldsNoticeText/>
      
      <div className='mb-3'>
        <TextField
          autoFocus
          disabled={false}
          name='nom'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.nom}
          text='Ce champ ne peut dépasser 255 caractères.'
          label='Nom complet du fournisseur'
          size='sm'
          maxLength={255}
          error={errors.nom}
        />
      </div>
      
      <div className='mb-3'>
        <TextField
          required
          disabled={false}
          name='nomCommercial'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.nomCommercial}
          text='Ce champ ne peut dépasser 255 caractères.'
          label='Nom commercial'
          size='sm'
          minLength={2}
          maxLength={255}
          error={errors.nomCommercial}
        />
      </div>
      
      <div className='mb-3'>
        <TextField
          disabled={false}
          name='abreviation'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.abreviation}
          text='Ce champ ne peut dépasser 20 caractères.'
          label='Abréviation / Acronyme'
          placeholder='Exemple : B.O.P'
          size='sm'
          maxLength={20}
          error={errors.abreviation}
        />
      </div>
      
      <div className='mb-3'>
        <TextField
          disabled={false}
          name='focal'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.focal}
          text="Personne / Grade / Fonction : à qui s'adresser en cas d'appel . Ce champ ne peut dépasser 255 caractères."
          label='Point focal'
          size='sm'
          maxLength={255}
          error={errors.focal}
        />
      </div>
      
      <div className='mb-3'>
        <TextField
          required
          disabled={false}
          name='tel'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.tel}
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
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.email}
          label='E-mail'
          size='sm'
          error={errors.email}
        />
      </div>
      
      <div className='mb-3'>
        <TextAreaField
          disabled={false}
          name='adresse'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.adresse}
          label='Adresse'
          placeholder='Adresse physique ou emplacement...'
          size='sm'
          error={errors.adresse}
        />
      </div>
      
      <Button type='submit' disabled={false} size='sm' className='w-100'>
        {data ? 'Modifier ' : 'Enregistrer '}
        un fournisseur
      </Button>
    </form>
  )
  
}
