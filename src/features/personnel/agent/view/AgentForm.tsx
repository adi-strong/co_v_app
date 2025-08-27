import type {Agent} from "../model/agentService.ts";
import {ReactNode, useState} from "react";
import {initAgentErrorState, initAgentState} from "../model/agentService.ts";
import {FormRequiredFieldsNoticeText, SingleSelectField, TextField} from "../../../../components";
import {Button, Col, Image, Row} from "react-bootstrap";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import avatar from '../../../../assets/images/default-avatar.png';
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {sexOptions} from "../../../../services/services.ts";

export default function AgentForm({ data }: { data?: Agent }) {
  
  const maxNumber: number = 1
  
  const [agent, setAgent] = useState(initAgentState())
  const [errors/*, setErrors */] = useState(initAgentErrorState())
  
  const onImageChange = (imageList: ImageListType): void => setAgent(a => ({
    ...a,
    file: imageList,
  }))
  
  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
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
                            disabled={false}
                            type='button'
                            onClick={onImageUpload}
                            size='sm'
                            title='Charger une image'
                            className='me-1'
                          >
                            <i className='bi bi-upload'/>
                          </Button>
                          
                          <Button
                            disabled={false}
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
                            disabled={false}
                            type='button'
                            onClick={() => onImageUpdate(index)}
                            size='sm'
                            title='Charger une image'
                            className='me-1'
                          >
                            <i className='bi bi-upload'/>
                          </Button>
                          
                          <Button
                            disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
                name='prenom'
                onChange={(e): void => handleChange(e, agent, setAgent)}
                value={agent.prenom}
                label='Postnom'
                maxLength={255}
                error={errors.prenom}
              />
            </div>
            
            <div className='mb-3'>
              <SelectField
                required
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
                options={[]}
                value={agent?.fkDepartement ?? null}
                onChange={(): void => {}}
                name='fkDepartement'
                error={errors.fkDepartement}
                label='Département'
                placeholder='-- Sélectionner un département --'
              />
            </div>
            
            <div className='mb-3'>
              <SingleSelectField
                disabled={false}
                options={[]}
                value={agent?.fkService ?? null}
                onChange={(): void => {}}
                name='fkService'
                error={errors.fkService}
                label='Service'
                placeholder='-- Sélectionner un service --'
              />
            </div>
            
            <div className='mb-3'>
              <SingleSelectField
                disabled={false}
                options={[]}
                value={agent?.fkService ?? null}
                onChange={(): void => {}}
                name='fkFonction'
                error={errors.fkFonction}
                label='Fonction'
                placeholder='-- Sélectionner une fonction --'
              />
            </div>
            
            <Button type='submit' disabled={false} className='w-100'>
              {!data ? 'Enregistrer ' : 'Modifier '}
              un agent
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
}
