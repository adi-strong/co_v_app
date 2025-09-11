import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {SingleSelectField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Lit} from "../model/litService.ts";
import {getLitModeOptions, initLitErrorState, initLitState, onLitSubmit} from "../model/litService.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {useEditLitMutation, usePostLitMutation} from "../model/lit.api.slice.ts";
import useSetLitData from "../hooks/useSetLitData.ts";
import {useGetCategoriesLitsQuery} from "../../categorieLit/model/categorieLit.api.slice.ts";
import useGetCatLitsOptions from "../../categorieLit/hooks/useGetCatLitsOptions.ts";

export default function LitForm({ data, onHide, onRefresh }: { 
  data?: Lit
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [lit, setLit] = useState(initLitState())
  const [errors, setErrors] = useState(initLitErrorState())
  const [onPostLit, { isLoading }] = usePostLitMutation()
  const [onEditLit, { isLoading: isEditLoading }] = useEditLitMutation()
  
  const { refetch: categoriesLitsRefresh, categoriesLitsLoader } = useGetCategoriesLitsQuery('LIST')
  
  useSetLitData(data, setLit)
  const categoriesLitsOptions = useGetCatLitsOptions()
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onLitSubmit(
        e,
        lit,
        setLit,
        setErrors,
        data ? onEditLit : onPostLit,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un lit</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <SingleSelectField
            required
            disabled={isLoading || isEditLoading || categoriesLitsLoader}
            onRefresh={async (): Promise<void> => {
              await categoriesLitsRefresh()
            }}
            options={categoriesLitsOptions()}
            value={lit?.fkCategorie ?? null}
            onChange={fkCategorie => setLit(e => ({...e, fkCategorie}))}
            name='fkCategorie'
            label='Catégorie'
            error={errors.fkCategorie}
            placeholder='-- Aucune catégorie sélectionnée --'
            size='sm'
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='numero'
            onChange={(e): void => handleChange(e, lit, setLit)}
            value={lit.numero}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='N° du Lit / Désignation'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.numero}
          />
        </div>
        
        <div className='mb-3'>
          <SelectField
            required
            disabled={isLoading || isEditLoading}
            name='mode'
            label='Mode de paiement'
            value={lit.mode}
            onChange={e => handleChange(e, lit, setLit)}
            error={errors.mode}
            options={getLitModeOptions()}
            size='sm'
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            type='number'
            name='prix'
            onChange={(e): void => handleChange(e, lit, setLit)}
            value={lit.prix}
            text='Ce champ ne peut accepter que les valeurs numériques.'
            label={<>Prix {lit.mode !== 'NONE' && `: ${lit.mode === 'PAR_JOUR' ? 'par jour' : 'heure'}`}</>}
            size='sm'
            error={errors.numero}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm'/>}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un lit'}
        </Button>
      </form>
    </>
  )
  
}
