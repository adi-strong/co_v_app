import {ReactNode, useState} from "react";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {Button, Image} from "react-bootstrap";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import avatar from "../../../../assets/images/placeholder/placeholder-4by3.svg";
import {handleShow} from "../../../../services/services.ts";
import type {Produit, ProduitImage} from "../model/produitService.ts";
import {initProduitImage} from "../model/produitService.ts";
import useSetProduitImageData from "../hooks/useSetProduitImageData.ts";
import useUploadNewProduitImage from "../hooks/useUploadNewProduitProfile.ts";
import RemoveProduitImageModal from "./RemoveProduitImageModal.tsx";

export default function UniqueProduitImageForm({ produit, loader, onSubmit, onRefresh, isLoading }: {
  produit: Produit
  loader: boolean
  onRefresh: () => void
  isLoading: boolean
  onSubmit: (data: FormData) => Promise<any>
}) {
  
  const maxNumber: number = 1
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState<ProduitImage>(initProduitImage())
  
  const { image } = produit
  
  useSetProduitImageData(produit, setState)
  useUploadNewProduitImage(state, setState, onRefresh)
  
  const onImageChange = (imageList: ImageListType): void => setState(a => ({
    ...a,
    file: imageList,
  }))
  
  return (
    <div>
      {!loader && (
        <>
          <ImageUploading
            multiple
            value={state?.file ?? []}
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
                      src={(image ? APP_ENTRYPOINT+image.contentUrl : avatar) as string}
                      alt=''
                    />
                    
                    <div className='mt-3 text-center'>
                      <Button
                        disabled={loader  || isLoading}
                        type='button'
                        variant='outline-white'
                        className='me-1'
                        onClick={onImageUpload}
                      ><i className='bi bi-upload'/> Téléverser</Button>
                      
                      <Button
                        disabled={loader  || isLoading}
                        type='button'
                        variant='outline-white'
                        onClick={(): void | {} => image ? handleShow(setShow) : { }}
                      ><i className='bi bi-trash'/> Supprimer</Button>
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
                    
                    <div className='mt-3 text-center'>
                      <Button
                        type='button'
                        variant='outline-white'
                        className='me-1'
                        onClick={(): void => onImageUpdate(index)}
                      ><i className='bi bi-upload'/> Téléverser</Button>
                      
                      <Button
                        type='button'
                        variant='outline-white'
                        onClick={onImageRemoveAll}
                      ><i className='bi bi-trash'/> Supprimer</Button>
                    </div>
                  </div>
                ))}
              </>
            ) as ReactNode}
          </ImageUploading>
        </>
      )}
      
      <RemoveProduitImageModal
        show={show}
        onHide={(): void => handleShow(setShow)}
        state={state}
        setState={setState}
        onSubmit={onSubmit}
        onRefresh={onRefresh}
      />
    </div>
  )
  
}
