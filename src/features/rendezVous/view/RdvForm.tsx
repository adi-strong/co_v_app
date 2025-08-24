import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {SingleSelectField, TextField} from "../../../components";
import {handleChange} from "../../../config/form.hander.service.ts";
import type {RendezVous} from "../model/rendezVousService.ts";
import {initRendezVousErrorState, initRendezVousState} from "../model/rendezVousService.ts";
import useGetAgentsOptions from "../../personnel/agent/hooks/useGetAgentsOptions.ts";

export default function RdvForm({ data }: { data?: RendezVous }) {
  
  const [rdv, setRdv] = useState(initRendezVousState())
  const [errors/*, setErrors */] = useState(initRendezVousErrorState())
  
  const agentsOptions = useGetAgentsOptions()
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => e.preventDefault()}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un rendez-vous</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='nom'
            onChange={(e): void => handleChange(e, rdv, setRdv)}
            value={rdv.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom complet'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='objet'
            onChange={(e): void => handleChange(e, rdv, setRdv)}
            value={rdv.objet}
            label='Objet'
            text='Ce champ ne peut dépasser 255 caractères.'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.objet}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={false}
            name='tel'
            onChange={(e): void => handleChange(e, rdv, setRdv)}
            value={rdv.tel}
            label='Numéro de téléphone'
            size='sm'
            maxLength={255}
            error={errors.tel}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            disabled={false}
            type='email'
            name='email'
            onChange={(e): void => handleChange(e, rdv, setRdv)}
            value={rdv.email}
            label='E-mail'
            size='sm'
            maxLength={255}
            error={errors.email}
          />
        </div>
        
        <div className='mb-3'>
          <SingleSelectField
            required
            disabled={false}
            onRefresh={(): void => { }}
            options={agentsOptions()}
            value={rdv?.fkAgent ?? null}
            onChange={e => setRdv(r => ({ ...r, fkAgent: e}))}
            name='fkAgent'
            label='Agent (rendez-vous avec ... ?)'
            error={errors.fkAgent}
            placeholder='-- Aucun agent sélectionné --'
            size='sm'
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            disabled={false}
            type='date'
            name='date'
            onChange={(e): void => handleChange(e, rdv, setRdv)}
            value={rdv.date}
            label='Date du rendez-vous'
            size='sm'
            maxLength={255}
            error={errors.date}
          />
        </div>
        
        <Button disabled={false} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {data ? 'Modifier ' : 'Ajouter '}
          un rendez-vous
        </Button>
      </form>
    </>
  )
  
}
