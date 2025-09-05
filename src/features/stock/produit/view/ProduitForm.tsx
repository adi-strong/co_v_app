import {ReactNode, useState} from "react";
import avatar from '../../../../assets/images/placeholder/placeholder-4by3.svg';
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {Button, Col, Image, Row, Spinner} from "react-bootstrap";
import {FormRequiredFieldsNoticeText, SingleSelectField, TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {handleShow} from "../../../../services/services.ts";
import ConfirmProduitModal from "./ConfirmProduitModal.tsx";
import useSetProduitData from "../hooks/useSetProduitData.ts";
import {useEditProduitMutation, usePostProduitMutation} from "../model/produit.api.slice.ts";
import useGetUnitesOptions from "../../uniteConsommation/hooks/useGetUnitesOptions.ts";
import useGetCategorieProdOptions from "../../categorieProduit/hooks/useGetCategorieProdOptions.ts";
import {useGetCategorieProduitsQuery} from "../../categorieProduit/model/categorieProduit.api.slice.ts";
import {useGetUniteConsommationsQuery} from "../../uniteConsommation/model/uniteConsommation.api.slice.ts";
import type {Produit} from "../model/produitService.ts";
import {
  initProduitErrorState,
  initProduitState,
  onPatchProduitSubmit,
  onPostProduitSubmit
} from "../model/produitService.ts";

export default function ProduitForm({ data, onRefresh }: { data?: Produit, onRefresh?: () => void }) {
  
  const maxNumber: number = 1
  
  const [show, setShow] = useState<boolean>(false)
  const [produit, setProduit] = useState(initProduitState())
  const [errors, setErrors] = useState(initProduitErrorState())
  const [onPostProduit, { isLoading }] = usePostProduitMutation()
  const [onEditProduit, { isLoading: isEditLoading }] = useEditProduitMutation()
  
  const { refetch: unityRefresh, isFetching: isUnityFetching } = useGetUniteConsommationsQuery('LIST')
  const { refetch: categoryRefresh, isFetching: isCategoryFetching } = useGetCategorieProduitsQuery('LIST')
  
  useSetProduitData(data, setProduit)
  const unitiesOptions = useGetUnitesOptions()
  const categoriesOptions = useGetCategorieProdOptions()
  
  const onImageChange = (imageList: ImageListType): void => setProduit(p => ({
    ...p,
    file: imageList,
  }))
  
  /* ------------------------------------------------------------------------------- */
  // Handle Submit
  
  const onSubmit = (handleHide: () => void): void => {
    if (data) {
      onPatchProduitSubmit(
        produit,
        setErrors,
        handleHide,
        onEditProduit,
        onRefresh
      )
    }
    else {
      onPostProduitSubmit(
        produit,
        setProduit,
        setErrors,
        onPostProduit,
        handleHide,
        onRefresh
      )
    }
  }
  
  // END Handle Submit
  /* ------------------------------------------------------------------------------- */
  
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
                        disabled={isLoading || isEditLoading}
                        type='button'
                        variant='outline-white'
                        className='me-1'
                        onClick={onImageUpload}
                      ><i className='bi bi-upload'/> Charger une image</Button>
                      
                      <Button
                        disabled={isLoading || isEditLoading}
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
              disabled={isLoading || isEditLoading}
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
              disabled={isLoading || isEditLoading}
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
            <SingleSelectField
              disabled={isLoading || isEditLoading || isCategoryFetching}
              onRefresh={async (): Promise<void> => { await categoryRefresh() }}
              options={categoriesOptions()}
              value={produit?.fkCategorie ?? null}
              onChange={e => setProduit(p => ({...p, fkCategorie: e}))}
              name='fkCategorie'
              label='Catégorie de produit'
              placeholder='-- Aucune catégorie sélectionnée --'
            />
          </div>
          
          <div className='mb-3'>
            <SingleSelectField
              disabled={isLoading || isEditLoading || isUnityFetching}
              onRefresh={async (): Promise<void> => { await unityRefresh() }}
              options={unitiesOptions()}
              value={produit?.fkUnite ?? null}
              onChange={e => setProduit(p => ({...p, fkUnite: e}))}
              name='fkUnite'
              label='Unité de consommation'
              placeholder='-- Aucune unité sélectionnée --'
            />
          </div>
          
          <div className='mb-3'>
            <TextAreaField
              disabled={isLoading || isEditLoading}
              name='description'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.description}
              label='Description du produit'
              placeholder='Détails du produit...'
              error={errors.codeQr}
              rows={5}
            />
          </div>
          
          {/*
          <div className='mb-3'>
            <TextField
              disabled={isLoading || isEditLoading}
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
              disabled={isLoading || isEditLoading}
              name='codeQr'
              onChange={(e): void => handleChange(e, produit, setProduit)}
              value={produit.codeQr}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='QR Code'
              maxLength={255}
              error={errors.codeQr}
            />
          </div>
          */}
          
          <Button disabled={isLoading || isEditLoading} type='submit' onClick={(): void => handleShow(setShow)}>
            {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm' />}
            {!(isLoading || isEditLoading) && data ? 'Modifier ' : !(isLoading || isEditLoading) && 'Enregistrer '}
            {(isLoading || isEditLoading) ? 'Veuillez patienter' : 'ce produit'}
          </Button>
        </Col>
      </Row>
      
      <ConfirmProduitModal
        produit={produit}
        setErrors={setErrors}
        show={show}
        onHide={(): void => handleShow(setShow)}
        onSubmit={(): void => onSubmit((): void => handleShow(setShow))}
      />
    </>
  )
  
}
