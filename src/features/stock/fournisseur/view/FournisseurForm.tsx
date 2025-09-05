import type {Fournisseur} from "../model/fournisseurService.ts";
import {FormRequiredFieldsNoticeText, TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {useState} from "react";
import {initFournisseurErrorState, initFournisseurState, onFournisseurSubmit} from "../model/fournisseurService.ts";
import {Button, Spinner} from "react-bootstrap";
import {useEditFournisseurMutation, usePostFournisseurMutation} from "../model/fournisseur.api.slice.ts";
import useSetFournisseurData from "../hooks/useSetFournisseurData.ts";

export default function FournisseurForm({ data, onHide, onRefresh }: { 
  data?: Fournisseur
  onRefresh: () => void
  onHide: () => void
}) {
  
  const [state, setState] = useState(initFournisseurState())
  const [errors, setErrors] = useState(initFournisseurErrorState())
  const [onPostFournisseur, { isLoading }] = usePostFournisseurMutation()
  const [onEditFournisseur, { isLoading: isEditLoading }] = useEditFournisseurMutation()
  
  useSetFournisseurData(data, setState)
  
  return (
    <form onSubmit={e => onFournisseurSubmit(
      e,
      state,
      setErrors,
      data ? onEditFournisseur : onPostFournisseur,
      onRefresh,
      onHide
    )}>
      <FormRequiredFieldsNoticeText/>
      
      <div className='mb-3'>
        <TextField
          autoFocus
          disabled={isLoading || isEditLoading}
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
          disabled={isLoading || isEditLoading}
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
          disabled={isLoading || isEditLoading}
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
          disabled={isLoading || isEditLoading}
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
          disabled={isLoading || isEditLoading}
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
          disabled={isLoading || isEditLoading}
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
          disabled={isLoading || isEditLoading}
          name='adresse'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.adresse}
          label='Adresse'
          placeholder='Adresse physique ou emplacement...'
          size='sm'
          error={errors.adresse}
        />
      </div>
      
      <Button type='submit' disabled={isLoading || isEditLoading} size='sm' className='w-100'>
        {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
        {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Enregistrer '}
        {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un fournisseur'}
      </Button>
    </form>
  )
  
}
