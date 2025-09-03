import {useState} from "react";
import {Button, Card, Spinner} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Departement} from "../model/departementService.ts";
import {initDepartementErrorState, initDepartementState, onDepartementSubmit} from "../model/departementService.ts";
import useSetDepartmentData from "../hooks/useSetDepartmentData.ts";
import {useEditDepartementMutation, usePostDepartementMutation} from "../model/departement.api.slice.ts";

export default function DepartementForm({ data, onHide, onRefresh }: {
  data?: Departement
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [departement, setDepartement] = useState(initDepartementState())
  const [errors, setErrors] = useState(initDepartementErrorState())
  const [onPosDepartment, { isLoading }] = usePostDepartementMutation()
  const [onEditDepartment, { isLoading: isEditLoading }] = useEditDepartementMutation()
  
  useSetDepartmentData(data, setDepartement)
  
  return (
    <>
      <form className={!data ? 'pt-13' : ''} onSubmit={e => onDepartementSubmit(
        e,
        departement,
        setDepartement,
        setErrors,
        data ? onEditDepartment : onPosDepartment,
        onRefresh,
        onHide
      )}>
        {!data && <Card.Title as='h5' className='mb-6 text-dark'>Ajouter un département</Card.Title>}
        
        <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
        
        <div className='mb-3'>
          <TextField
            required
            disabled={isLoading || isEditLoading}
            name='nom'
            onChange={(e): void => handleChange(e, departement, setDepartement)}
            value={departement.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            label='Nom du département'
            size='sm'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </div>
        
        <Button disabled={isLoading || isEditLoading} type='submit' size='sm' className={data ? 'w-100' : ''}>
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
          {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Ajouter '}
          {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un département'}
        </Button>
      </form>
    </>
  )
  
}
