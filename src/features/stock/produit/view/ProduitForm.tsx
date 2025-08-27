import {ReactNode, useState} from "react";
import {initProduitErrorState, initProduitState} from "../model/produitService.ts";
import avatar from '../../../../assets/images/placeholder/placeholder-4by3.svg';
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FormRequiredFieldsNoticeText, SingleSelectField, TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {handleShow} from "../../../../services/services.ts";
import ConfirmProduitModal from "./ConfirmProduitModal.tsx";

export default function ProduitForm() {
  
  const maxNumber: number = 1
  
  const [show, setShow] = useState<boolean>(false)
  const [produit, setProduit] = useState(initProduitState())
  const [errors, setErrors] = useState(initProduitErrorState())
  
  const onImageChange = (imageList: ImageListType): void => setProduit(p => ({
    ...p,
    file: imageList,
  }))
  
  return (
    <>
      <FormRequiredFieldsNoticeText/>
      <Row>
        <Col md={5} className='mb-3'>
          <ImageUploading
            multiple
            value={produit?.file ?? []}
            onChange={onImageChange}
            maxNumber={maxNumber}
            dataURLKey='dataURL'
          >
            {({ onImageUpload, imageList, onImageRemoveAll, onImageUpdate }) => (
              <>
                {imageList.length < 1 && (
                  <>
                    <Image
                      fluid
                      thumbnail
                      src={avatar}
                      alt=''
                    />
                    
                    <div className='mt-3'>
                      <Button
                        type='button'
                        variant='outline-white'
                        className='me-1'
                        onClick={onImageUpload}
                      ><i className='bi bi-upload'/> Charger une image</Button>
                      
                      <Button
                        type='button'
                        variant='outline-white'
                      ><i className='bi bi-trash'/> Supprimer l'image</Button>
                    </div>
                  </>
                )}
                
                {imageList.length > 0 && imageList.map((file: ImageType, index: number) => (
                  <div key={index}>
                    <Image
                      fluid
                      thumbnail
                      src={file.dataURL}
                      alt=''
                    />
                    
                    <div className='mt-3'>
                      <Button
                        type='button'
                        variant='outline-white'
                        className='me-1'
                        onClick={(): void => onImageUpdate(index)}
                      ><i className='bi bi-upload'/> Mettre l'image à jour</Button>
                      
                      <Button
                        type='button'
                        variant='outline-white'
                        onClick={onImageRemoveAll}
                      ><i className='bi bi-trash'/> Supprimer l'image</Button>
                    </div>
                  </div>
                ))}
              </>
            ) as ReactNode}
          </ImageUploading>
        </Col>
        
        <Col md={7}>
          <div className='mb-3'>
            <TextField
              required
              autoFocus
              disabled={false}
              name='nom'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.nom}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='Nom du produit'
              minLength={2}
              maxLength={255}
              error={errors.nom}
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              required
              disabled={false}
              name='code'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.code}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='Code du produit'
              minLength={2}
              maxLength={255}
              error={errors.code}
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              disabled={false}
              name='codeBar'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.codeBar}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='Code barre'
              maxLength={255}
              error={errors.codeBar}
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              disabled={false}
              name='codeQr'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.codeQr}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='QR Code'
              maxLength={255}
              error={errors.codeQr}
            />
          </div>
          
          <div className='mb-3'>
            <SingleSelectField
              disabled={false}
              onRefresh={(): void => {
              }}
              options={[]}
              value={produit?.fkCategorie ?? null}
              onChange={e => setProduit(p => ({...p, fkCategorie: e}))}
              name='fkCategorie'
              label='Catégorie de produit'
              placeholder='-- Aucune catégorie sélectionnée --'
            />
          </div>
          
          <div className='mb-3'>
            <SingleSelectField
              disabled={false}
              onRefresh={(): void => {
              }}
              options={[]}
              value={produit?.fkUnite ?? null}
              onChange={e => setProduit(p => ({...p, fkUnite: e}))}
              name='fkUnite'
              label='Unité de consommation'
              placeholder='-- Aucune unité sélectionnée --'
            />
          </div>
          
          <div className='mb-3'>
            <TextAreaField
              disabled={false}
              name='description'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.description}
              label='Description du produit'
              placeholder='Détails du produit...'
              error={errors.codeQr}
              rows={5}
            />
          </div>
          
          <Button disabled={false} type='submit' onClick={(): void => handleShow(setShow)}>
            Enregistrer ce produit
          </Button>
        </Col>
      </Row>
      
      <ConfirmProduitModal
        produit={produit}
        setErrors={setErrors}
        show={show}
        onHide={(): void => handleShow(setShow)}
      />
    </>
  )
  
}
