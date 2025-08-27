import {ReactNode, useState} from "react";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {
  CheckField,
  FormRequiredFieldsNoticeText,
  SingleSelectField,
  TextAreaField,
  TextField
} from "../../../../components";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import avatar from "../../../../assets/images/default-avatar.png";
import {handleChange} from "../../../../services/form.hander.service.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {martialStatusOptions, sexOptions} from "../../../../services/services.ts";
import type {Patient} from "../model/patientService.ts";
import {initPatientErrorState, initPatientState} from "../model/patientService.ts";

export default function PatientForm({ data }: { data?: Patient }) {
  
  const maxNumber: number = 1
  
  const [patient, setPatient] = useState(initPatientState())
  const [errors/*, setErrors */] = useState(initPatientErrorState())
  
  const onImageChange = (imageList: ImageListType): void => setPatient(a => ({
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                  disabled={false}
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
                  disabled={false}
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
                disabled={false}
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
                  disabled={false}
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
                  disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
                name='estCeConventionne'
                value={patient.estCeConventionne}
                checked={patient.estCeConventionne}
                error={errors.estCeConventionne}
                label={<>Est-ce un(e) patient(e) conventionné(e) <i className='bi bi-question-circle' /></>}
                onChange={e => handleChange(e, patient, setPatient)}
              />
            </div>
            
            {patient.estCeConventionne && (
              <div className='mb-3'>
                <SingleSelectField
                  required
                  disabled={false}
                  options={[]}
                  value={patient?.fkStructure ?? null}
                  onChange={(): void => {
                  }}
                  name='fkStructure'
                  error={errors.fkStructure}
                  label='Structure'
                  placeholder='-- Sélectionner une convention --'
                />
              </div>
            ) as ReactNode}
            
            <Button type='submit' disabled={false} className='w-100'>
              {!data ? 'Enregistrer ' : 'Modifier '}
              un(e) patient(e)
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
}
