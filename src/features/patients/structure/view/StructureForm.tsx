import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Structure} from "../model/structureService.ts";
import {initStructureErrorState, initStructureState, onStructureSubmit} from "../model/structureService.ts";
import useSetStructureData from "../hooks/useSetStructureData.ts";
import {useEditStructureMutation, usePostStructureMutation} from "../model/structure.api.slice.ts";

export default function StructureForm({ data, onRefresh, onHide }: {
  data?: Structure
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [structure, setStructure] = useState(initStructureState())
  const [errors, setErrors] = useState(initStructureErrorState())
  const [onPostStructure, { isLoading }] = usePostStructureMutation()
  const [onEditStructure, { isLoading: isEditLoading }] = useEditStructureMutation()
  
  useSetStructureData(data, setStructure)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onStructureSubmit(
        e,structure,
        setStructure,
        setErrors,
        data ? onEditStructure : onPostStructure,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter une structure</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading}
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
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'une structure'}
        </Button>
      </form>
    </>
  )
  
}
