import type {Service} from "../../../personnel/service/model/serviceService.ts";
import {useState} from "react";
import {initServiceErrorState, initServiceState} from "../../../personnel/service/model/serviceService.ts";
import {Button, Card} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import type {Lit} from "../model/litService.ts";
import {getLitModeOptions, initLitErrorState, initLitState} from "../model/litService.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";

export default function LitForm({ data }: { data?: Lit }) {
  
  const [lit, setLit] = useState(initLitState())
  const [errors/*, setErrors */] = useState(initLitErrorState())
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un lit</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
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
            disabled={false}
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
            disabled={false}
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
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          un lit
        </Button>
      </form>
    </>
  )
  
}
