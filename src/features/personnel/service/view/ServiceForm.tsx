import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {SingleSelectField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Service} from "../model/serviceService.ts";
import {initServiceErrorState, initServiceState, onServiceSubmit} from "../model/serviceService.ts";
import useSetServiceData from "../hooks/useSetServiceData.ts";
import {useEditServiceMutation, usePostServiceMutation} from "../model/service.api.slice.ts";
import useGetDepartmentsOptions from "../../departement/hooks/useGetDepartmentsOptions.ts";
import {useGetDepartementsQuery} from "../../departement/model/departement.api.slice.ts";

export default function ServiceForm({ data, onRefresh, onHide }: {
  data?: Service
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [service, setService] = useState(initServiceState())
  const [errors, setErrors] = useState(initServiceErrorState())
  const [onPostService, { isLoading }] = usePostServiceMutation()
  const [onEditService, { isLoading: isEditLoading }] = useEditServiceMutation()
  
  const { refetch: departmentsRefresh, isFetching: isDepartmentFetching } = useGetDepartementsQuery('LIST')
  
  useSetServiceData(data, setService)
  const departmentsOptions = useGetDepartmentsOptions()
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onServiceSubmit(
        e,
        service,
        setService,
        setErrors,
        data ? onEditService : onPostService,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un service</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <SingleSelectField
            required
            disabled={isLoading || isEditLoading || isDepartmentFetching}
            options={departmentsOptions}
            value={service?.fkDepartement ?? null}
            onChange={e => setService(s => ({ ...s, fkDepartement: e }))}
            name='fkDepartement'
            label='Département'
            placeholder='-- --'
            onRefresh={async (): Promise<void> => { await departmentsRefresh() }}
          />
        </div>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, service, setService)}
            value={service.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom du service'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un service'}
        </Button>
      </form>
    </>
  )
  
}
