import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {SingleSelectField, TextField} from "../../../components";
import {handleChange} from "../../../services/form.hander.service.ts";
import type {RendezVous} from "../model/rendezVousService.ts";
import {initRendezVousErrorState, initRendezVousState, onRendezVousSubmit} from "../model/rendezVousService.ts";
import useGetAgentsOptions from "../../personnel/agent/hooks/useGetAgentsOptions.ts";
import {useEditRendezVousMutation, usePostRendezVousMutation} from "../model/rendezVous.api.slice.ts";
import useSetRdvData from "../hooks/useSetRdvData.ts";
import {useGetAllAgentsQuery} from "../../personnel/agent/model/agent.api.slice.ts";

export default function RdvForm({ data, onRefresh, onHide }: {
  data?: RendezVous
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [rdv, setRdv] = useState(initRendezVousState())
  const [errors, setErrors] = useState(initRendezVousErrorState())
  const [onPostRdv, { isLoading }] = usePostRendezVousMutation()
  const [onEditRdv, { isLoading: isEditLoading }] = useEditRendezVousMutation()
  
  const { refetch: agentsRefresh, isFetching: isAgentsFetching } = useGetAllAgentsQuery('LIST')
  
  useSetRdvData(data, setRdv)
  const agentsOptions = useGetAgentsOptions()
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onRendezVousSubmit(
        e,
        rdv,
        setRdv,
        setErrors,
        data ? onEditRdv : onPostRdv,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un rendez-vous</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading}
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
            disabled={isLoading || isEditLoading || isAgentsFetching}
            onRefresh={async (): Promise<void> => { await agentsRefresh() }}
            options={agentsOptions()}
            value={rdv?.fkAgent ?? null}
            onChange={e => setRdv(r => ({ ...r, fkAgent: e}))}
            name='fkAgent'
            label='Rendez-vous avec ... ?'
            error={errors.fkAgent}
            placeholder='-- --'
            size='sm'
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            disabled={isLoading || isEditLoading}
            type='datetime-local'
            name='date'
            onChange={(e): void => handleChange(e, rdv, setRdv)}
            value={rdv.date}
            label='Date du rendez-vous'
            size='sm'
            maxLength={255}
            error={errors.date}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un rendez-vous'}
        </Button>
      </form>
    </>
  )
  
}
