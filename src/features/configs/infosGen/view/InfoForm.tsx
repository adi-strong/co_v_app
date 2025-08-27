import type {InfosGen} from "../model/infosGenService.ts";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {initInfosGenErrorState, initInfosGenState} from "../model/infosGenService.ts";
import avatar from '../../../../assets/images/avatar/avatar.jpg';
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";

export default function InfoForm({ data }: { data?: InfosGen }) {
  
  const maxNumber: number = 1
  const [info, setInfo] = useState(initInfosGenState())
  const [errors /*, setErrors */] = useState(initInfosGenErrorState())
  
  const onImageChange = (imageList: ImageListType): void => setInfo(prev => ({
    ...prev,
    file: imageList
  }))
  
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Row className='align-items-center mb-8'>
        <Col md={3} className='mb-3 mb-md-0'>
          <h5 className='mb-0 px-4'>Logo</h5>
        </Col>
        
        <Col md={9}>
          <div className='d-flex align-items-center'>
            <ImageUploading
              multiple
              value={info?.file ?? []}
              onChange={onImageChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({imageList, onImageUpload, onImageUpdate, onImageRemoveAll}) => (
                <>
                  {imageList.length < 1 && (
                    <>
                      <div className='me-3'>
                        <Image
                          roundedCircle
                          src={avatar}
                          className='avatar avatar-lg'
                          alt='logo'
                        />
                      </div>
                      
                      <div>
                        <Button type='button' variant='outline-white' className='me-1'
                                onClick={onImageUpload}>Changer</Button>
                        <Button type='button' variant='outline-white' onClick={onImageRemoveAll}>Supprimer</Button>
                      </div>
                    </>
                  )}
                  
                  {imageList.length > 0 && imageList.map((f: ImageType, index: number) => (
                    <div key={index} className='d-flex align-items-center'>
                      <div className='me-3'>
                        <Image
                          roundedCircle
                          src={f.data_url}
                          className='avatar avatar-lg'
                          alt='logo'
                        />
                      </div>
                      
                      <div>
                        <Button
                          type='button'
                          variant='outline-white'
                          className='me-1'
                          onClick={(): void => onImageUpdate(index)}>Changer</Button>
                        <Button type='button' variant='outline-white' onClick={onImageRemoveAll}>Supprimer</Button>
                      </div>
                    </div>
                  ))}
                </>
              ) as ReactNode}
            </ImageUploading>
          </div>
        </Col>
      </Row>
      
      <div className='mb-6 px-4 pe-4'>
        <h4 className='mb-1'>Information générales</h4>
      </div>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='nom'><code>*</code> Dénomination du centre</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextField
            required
            disabled={false}
            name='nom'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.nom}
            text='Ce champ ne peut dépasser 255 caractères.'
            minLength={2}
            maxLength={255}
            error={errors.nom}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='slogan'>Slogan</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextField
            disabled={false}
            name='slogan'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.slogan}
            text='Champ facultatif. Ce champ ne peut dépasser 255 caractères.'
            maxLength={255}
            error={errors.slogan}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='about'>À propos</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextAreaField
            disabled={false}
            name='about'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.about}
            text='Description de ce que vous êtes et de ce que fait le centre'
            error={errors.about}
            rows={5}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='tel'>Numéros de téléphone</Form.Label>
        <Col md={4} className='mb-3 mb-lg-0'>
          <TextField
            required
            disabled={false}
            name='tel'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.tel}
            text='Champ obligatoire.'
            placeholder='* N° de téléphone principal'
            maxLength={255}
            error={errors.tel}
          />
        </Col>
        
        <Col sm={4} className='mb-3 mb-lg-0'>
          <TextField
            disabled={false}
            name='tel2'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.tel2}
            placeholder='N° de téléphone secondaire'
            text='Champ facultatif.'
            maxLength={255}
            error={errors.tel2}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='email'>Adresses e-mails</Form.Label>
        <Col md={4} className='mb-3 mb-lg-0'>
          <TextField
            required
            disabled={false}
            type='email'
            name='email'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.email}
            text='Champ obligatoire.'
            placeholder='* E-mail principal'
            maxLength={255}
            error={errors.email}
          />
        </Col>
        
        <Col md={4} className='mb-3 mb-lg-0'>
          <TextField
            disabled={false}
            type='email'
            name='email2'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.email2}
            text='Champ obligatoire.'
            placeholder='E-mail secondaire'
            maxLength={255}
            error={errors.email2}
          />
        </Col>
      </Row>
      
      <Row className='mb-3 px-4 pe-4'>
        <Form.Label className='col-sm-4' htmlFor='address'><code>*</code> Adresse</Form.Label>
        <Col md={8} className='mb-3 mb-lg-0'>
          <TextAreaField
            required
            disabled={false}
            name='address'
            onChange={(e): void => handleChange(e, info, setInfo)}
            value={info.address}
            error={errors.address}
            rows={5}
          />
        </Col>
        
        <Col md={8} className='offset-md-4 mt-4'>
          <Button type='submit' disabled={false}>
            Sauvegarder
          </Button>
        </Col>
      </Row>
    </form>
  )
  
}
