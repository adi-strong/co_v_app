import {ReactNode, useState} from "react";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {
  CheckField,
  FormRequiredFieldsNoticeText,
  SingleSelectField,
  TextAreaField,
  TextField
} from "../../../../components";
import {Button, Col, Form, Image, Row, Spinner} from "react-bootstrap";
import avatar from "../../../../assets/images/default-avatar.png";
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {martialStatusOptions, sexOptions} from "../../../../services/services.ts";
import type {Patient} from "../model/patientService.ts";
import {
  initPatientErrorState,
  initPatientState, onIsStructureChange,
  onPatchPatientSubmit, onPostPatientSubmit,
} from "../model/patientService.ts";
import useSetPatientData from "../hooks/useSetPatientData.ts";
import {useEditPatientMutation, usePostPatientMutation} from "../model/patient.api.slice.ts";
import {useNavigate} from "react-router-dom";
import {useGetStructuresQuery} from "../../structure/model/structure.api.slice.ts";
import useGetStructuresOptions from "../../structure/hooks/useGetStructuresOptions.ts";

export default function PatientForm({ data, onRefresh, loader = false }: {
  data?: Patient,
  loader?: boolean,
  onRefresh: () => void
}) {
  
  const maxNumber: number = 1
  const navigate = useNavigate()
  
  const { isFetching: isStructuresFetching, refetch: structuresRefresh } = useGetStructuresQuery('LIST')
  
  const [patient, setPatient] = useState(initPatientState())
  const [errors, setErrors] = useState(initPatientErrorState())
  const [onPostPatient, { isLoading }] = usePostPatientMutation()
  const [onEditPatient, { isLoading: isEditLoading }] = useEditPatientMutation()
  
  useSetPatientData(data, setPatient)
  const structuresOptions = useGetStructuresOptions()
  
  const onImageChange = (imageList: ImageListType): void => setPatient(a => ({
    ...a,
    file: imageList,
  }))
  
  return (
    <>
      <form onSubmit={e => data
        ? onPatchPatientSubmit(e, patient, setErrors, onEditPatient, navigate, onRefresh)
        : onPostPatientSubmit(e, patient, setErrors, onPostPatient, navigate, onRefresh)}>
        <FormRequiredFieldsNoticeText/>
        <Row>
          {!data && (
            <Col md={3} className='mb-3 text-center'>
              <ImageUploading
                multiple
                value={patient?.file ?? []}
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
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.nom}
                text='Ce champ ne peut dépasser 255 caractères.'
                label='Nom du(de la) patient(e)'
                minLength={2}
                maxLength={255}
                error={errors.nom}
              />
            </div>
            
            <div className='mb-3'>
              <TextField
                disabled={isLoading || isEditLoading || loader}
                name='postNom'
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.postNom}
                label='Postnom'
                maxLength={255}
                error={errors.postNom}
              />
            </div>
            
            <div className='mb-3'>
              <TextField
                disabled={isLoading || isEditLoading || loader}
                name='prenom'
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.prenom}
                label='Postnom'
                maxLength={255}
                error={errors.prenom}
              />
            </div>
            
            <div className='mb-3'>
              <SelectField
                required
                disabled={isLoading || isEditLoading || loader}
                name='sexe'
                value={patient.sexe}
                onChange={e => handleChange(e, patient, setPatient)}
                error={errors.sexe}
                label='Sexe'
                options={sexOptions()}
              />
            </div>
            
            <div className='mb-3'>
              <SelectField
                required
                disabled={isLoading || isEditLoading || loader}
                name='etatCivil'
                value={patient.etatCivil}
                onChange={e => handleChange(e, patient, setPatient)}
                error={errors.etatCivil}
                label='État-civil'
                options={martialStatusOptions()}
              />
            </div>
            
            <Row>
              <Form.Label htmlFor='lieuDeNaissance'>Lieu & date de naissance</Form.Label>
              <Col className='mb-3'>
                <TextField
                  disabled={isLoading || isEditLoading || loader}
                  name='lieuDeNaissance'
                  onChange={(e): void => handleChange(e, patient, setPatient)}
                  value={patient.lieuDeNaissance}
                  placeholder='Lieu...'
                  maxLength={255}
                  error={errors.lieuDeNaissance}
                />
              </Col>
              
              <Col className='mb-3'>
                <TextField
                  disabled={isLoading || isEditLoading || loader}
                  type='date'
                  name='dateDeNaissance'
                  onChange={(e): void => handleChange(e, patient, setPatient)}
                  value={patient.dateDeNaissance}
                  placeholder='Lieu...'
                  maxLength={255}
                  error={errors.dateDeNaissance}
                />
              </Col>
            </Row>
            
            <div className='mb-3'>
              <TextField
                disabled={isLoading || isEditLoading || loader}
                name='nationalite'
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.nationalite}
                label='Nationalité'
                maxLength={255}
                error={errors.nationalite}
              />
            </div>
          </Col>
          
          <Col md={data ? 6 : 5}>
            <Row>
              <Form.Label htmlFor='pere'>Parent(s)</Form.Label>
              <Col className='mb-3'>
                <TextField
                  disabled={isLoading || isEditLoading || loader}
                  name='pere'
                  onChange={(e): void => handleChange(e, patient, setPatient)}
                  value={patient.pere}
                  placeholder='Père'
                  text='Nom du père du(de la) patient(e)'
                  maxLength={255}
                  error={errors.pere}
                />
              </Col>
              
              <Col className='mb-3'>
                <TextField
                  disabled={isLoading || isEditLoading || loader}
                  name='mere'
                  onChange={(e): void => handleChange(e, patient, setPatient)}
                  value={patient.mere}
                  placeholder='Mère'
                  text='Nom de la mère du(de la) patient(e)'
                  maxLength={255}
                  error={errors.mere}
                />
              </Col>
            </Row>
            
            <div className='mb-3'>
              <TextField
                required
                disabled={isLoading || isEditLoading || loader}
                name='tel'
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.tel}
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
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.email}
                label='E-mail'
                maxLength={255}
                error={errors.email}
              />
            </div>
            
            <div className='mb-3'>
              <TextAreaField
                disabled={isLoading || isEditLoading || loader}
                name='adresse'
                onChange={(e): void => handleChange(e, patient, setPatient)}
                value={patient.adresse}
                label='Adresse du(de la) patient(e)'
                error={errors.adresse}
                rows={4}
              />
            </div>
            
            <div className='mb-3'>
              <CheckField
                inline
                disabled={isLoading || isEditLoading || loader}
                name='estCeConventionne'
                value={patient.estCeConventionne}
                checked={patient.estCeConventionne}
                error={errors.estCeConventionne}
                label={<>Est-ce un(e) patient(e) conventionné(e) <i className='bi bi-question-circle' /></>}
                onChange={(): void => onIsStructureChange(setPatient)}
              />
            </div>
            
            {patient.estCeConventionne && (
              <div className='mb-3'>
                <SingleSelectField
                  required
                  disabled={isLoading || isEditLoading || isStructuresFetching || loader}
                  options={structuresOptions()}
                  value={patient?.fkStructure ?? null}
                  onChange={e => setPatient(p => ({ ...p, fkStructure: e }))}
                  name='fkStructure'
                  error={errors.fkStructure}
                  label='Structure'
                  placeholder='-- Sélectionner une convention --'
                />
              </div>
            ) as ReactNode}
            
            <Button type='submit' disabled={isLoading || isEditLoading || loader} className='w-100'>
              {(isLoading || isEditLoading || loader) && <Spinner className='me-1' animation='border' size='sm' />}
              {!(isLoading || isEditLoading || loader) && data ? 'Modifier ' : !(isLoading || isEditLoading || loader)
                && 'Enregistrer '}
              {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'un(e) patient(e)'}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
}
