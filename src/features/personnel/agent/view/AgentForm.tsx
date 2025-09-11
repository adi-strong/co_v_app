import type {Agent} from "../model/agentService.ts";
import {ReactNode, useState} from "react";
import {
  initAgentErrorState,
  initAgentState,
  onAgentDepartmentChange,
  onPatchAgentSubmit,
  onPostAgentSubmit
} from "../model/agentService.ts";
import {FormRequiredFieldsNoticeText, SingleSelectField, TextField} from "../../../../components";
import {Button, Col, Image, Row, Spinner} from "react-bootstrap";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import avatar from '../../../../assets/images/default-avatar.png';
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {useEditAgentMutation, useGetAgentsQuery, usePostAgentMutation} from "../model/agent.api.slice.ts";
import useSetAgentData from "../hooks/useSetAgentData.ts";
import {useNavigate} from "react-router-dom";
import {useGetDepartementsQuery} from "../../departement/model/departement.api.slice.ts";
import {useGetFonctionsQuery} from "../../fonction/model/fonction.api.slice.ts";
import useGetDepartmentsOptions from "../../departement/hooks/useGetDepartmentsOptions.ts";
import useGetFonctionsOptions from "../../fonction/hooks/useGetFonctionsOptions.ts";
import type {SelectOptionType} from "../../../../services/services.ts";
import {sexOptions} from "../../../../services/services.ts";

export default function AgentForm({ data, uRefresh, loader = false }: {
  data?: Agent, 
  loader?: boolean, 
  uRefresh?: () => void 
}) {
  
  const maxNumber: number = 1
  const navigate = useNavigate()
  
  const { refetch } = useGetAgentsQuery('LIST')
  const { refetch: functionsRefresh, isFetching: isFunctionFetching } = useGetFonctionsQuery('LIST')
  const { refetch: departmentsRefresh, isFetching: isDepartmentFetching } = useGetDepartementsQuery('LIST')
  
  const [servicesOptions, setServicesOptions] = useState<SelectOptionType[]>([])
  const [agent, setAgent] = useState(initAgentState())
  const [errors, setErrors] = useState(initAgentErrorState())
  const [onPostAgent, { isLoading }] = usePostAgentMutation()
  const [onEditAgent, { isLoading: isEditLoading }] = useEditAgentMutation()
  
  const functionsOptions = useGetFonctionsOptions()
  const departmentsOptions = useGetDepartmentsOptions(setServicesOptions)
  
  useSetAgentData(data, setAgent, setServicesOptions)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  const onImageChange = (imageList: ImageListType): void => setAgent(a => ({
    ...a,
    file: imageList,
  }))
  
  return (
    <>
      <form onSubmit={e => data 
        ? onPatchAgentSubmit(e, agent, setErrors, onEditAgent, navigate, uRefresh)
        : onPostAgentSubmit(e, agent, setErrors, onPostAgent, navigate, onRefresh)}>
        <FormRequiredFieldsNoticeText/>
        <Row>
          {!data && (
            <Col md={3} className='mb-3 text-center'>
              <ImageUploading
                multiple
                value={agent?.file ?? []}
                onChange={onImageChange}
                maxNumber={maxNumber}
                dataURLKey='data_url'
              >
                {({ onImageUpload, imageList, onImageRemoveAll, onImageUpdate }) => (
                  <>
                    {imageList.length < 1 && (
                      <>
                        <Image
                          roundedCircle
                          src={avatar}
                          style={{ width: '9rem', height: '9rem' }}
                          alt='avatar'
                        />
                        
                        <div className='text-center mt-3'>
                          <Button
                            disabled={isLoading || isEditLoading || loader}
                            type='button'
                            onClick={onImageUpload}
                            size='sm'
                            title='Charger une image'
                            className='me-1'
                          >
                            <i className='bi bi-upload'/>
                          </Button>
                          
                          <Button
                            disabled={isLoading || isEditLoading || loader}
                            type='button'
                            size='sm'
                            title='Supprimer une image'
                            variant='danger'
                          >
                            <i className='bi bi-trash'/>
                          </Button>
                        </div>
                      </>
                    )}
                    
                    {imageList.length > 0 && imageList.map((file: ImageType, index: number) => (
                      <div key={index}>
                        <Image
                          roundedCircle
                          thumbnail
                          src={file.data_url}
                          style={{ width: '9rem', height: '9rem' }}
                          alt='avatar'
                        />
                        
                        <div className='text-center mt-3'>
                          <Button
                            disabled={isLoading || isEditLoading || loader}
                            type='button'
                            onClick={() => onImageUpdate(index)}
                            size='sm'
                            title='Charger une image'
                            className='me-1'
                          >
                            <i className='bi bi-upload'/>
                          </Button>
                          
                          <Button
                            disabled={isLoading || isEditLoading || loader}
                            type='button'
                            size='sm'
                            title='Supprimer une image'
                            variant='danger'
                            onClick={onImageRemoveAll}
                          >
                            <i className='bi bi-trash'/>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                ) as ReactNode}
              </ImageUploading>
            </Col>
          ) as ReactNode}
          
          <Col md={data ? 6 : 4}>
            <div className='mb-3'>
              <TextField
                required
                autoFocus
                disabled={isLoading || isEditLoading || loader}
                name='nom'
                onChange={(e): void => handleChange(e, agent, setAgent)}
                value={agent.nom}
                text='Ce champ ne peut dépasser 255 caractères.'
                label="Nom de l'agent"
                minLength={2}
                maxLength={255}
                error={errors.nom}
              />
            </div>
            
            <div className='mb-3'>
              <TextField
                disabled={isLoading || isEditLoading || loader}
                name='postNom'
                onChange={(e): void => handleChange(e, agent, setAgent)}
                value={agent.postNom}
                label='Postnom'
                maxLength={255}
                error={errors.postNom}
              />
            </div>
            
            <div className='mb-3'>
              <TextField
                disabled={isLoading || isEditLoading || loader}
                name='prenom'
                onChange={(e): void => handleChange(e, agent, setAgent)}
                value={agent.prenom}
                label='Prénom'
                maxLength={255}
                error={errors.prenom}
              />
            </div>
            
            <div className='mb-3'>
              <SelectField
                required
                disabled={isLoading || isEditLoading || loader}
                name='sexe'
                value={agent.sexe}
                onChange={e => handleChange(e, agent, setAgent)}
                error={errors.sexe}
                label='Sexe'
                options={sexOptions()}
              />
            </div>
          </Col>
          
          <Col md={data ? 6 : 5}>
            <div className='mb-3'>
              <TextField
                required
                disabled={isLoading || isEditLoading || loader}
                name='tel'
                onChange={(e): void => handleChange(e, agent, setAgent)}
                value={agent.tel}
                label='Numéro de téléphone'
                maxLength={255}
                error={errors.tel}
              />
            </div>
            
            <div className='mb-3'>
              <TextField
                disabled={isLoading || isEditLoading || loader}
                type='email'
                name='email'
                onChange={(e): void => handleChange(e, agent, setAgent)}
                value={agent.email}
                label='E-mail'
                maxLength={255}
                error={errors.email}
              />
            </div>
            
            <div className='mb-3'>
              <SingleSelectField
                disabled={isLoading || isEditLoading || isDepartmentFetching || loader}
                onRefresh={async (): Promise<void> => { await departmentsRefresh() }}
                options={departmentsOptions}
                value={agent?.fkDepartement ?? null}
                onChange={e => onAgentDepartmentChange(e, setAgent, setServicesOptions)}
                name='fkDepartement'
                error={errors.fkDepartement}
                label='Département'
                placeholder='-- Sélectionner un département --'
              />
            </div>
            
            <div className='mb-3'>
              <SingleSelectField
                disabled={isLoading || loader || isEditLoading || isDepartmentFetching || (!agent?.fkDepartement)}
                options={servicesOptions}
                value={agent?.fkService ?? null}
                onChange={e => setAgent(a => ({ ...a, fkService: e }))}
                name='fkService'
                error={errors.fkService}
                label='Service'
                placeholder='-- Sélectionner un service --'
              />
            </div>
            
            <div className='mb-3'>
              <SingleSelectField
                disabled={isLoading || isEditLoading || isFunctionFetching || loader}
                onRefresh={async (): Promise<void> => { await functionsRefresh() }}
                options={functionsOptions()}
                value={agent?.fkFonction ?? null}
                onChange={e => setAgent(a => ({ ...a, fkFonction: e }))}
                name='fkFonction'
                error={errors.fkFonction}
                label='Fonction'
                placeholder='-- Sélectionner une fonction --'
              />
            </div>
            
            <Button type='submit' disabled={isLoading || isEditLoading || loader} className='w-100'>
              {(isLoading || isEditLoading || loader) && <Spinner className='me-1' animation='border' size='sm' />}
              {!(isLoading || isEditLoading || loader) && data ? 'Modifier ' : !(isLoading || isEditLoading || loader)
                && 'Enregistrer '}
              {(isLoading || isEditLoading || loader) ? 'Veuillez patienter' : 'un agent'}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
}
