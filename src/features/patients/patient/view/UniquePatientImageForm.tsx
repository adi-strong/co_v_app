import type {Patient, PatientImage} from "../model/patientService.ts";
import {ReactNode, useState} from "react";
import {initPatientImageState, onUpdatePatientProfileSubmit} from "../model/patientService.ts";
import useSetPatientImageData from "../model/useSetPatientImageData.ts";
import avatar from '../../../../assets/images/placeholder/placeholder-4by3.svg';
import {Button, Image} from "react-bootstrap";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import {getMediumMediaImage, handleShow} from "../../../../services/services.ts";
import RemovePatientProfileModal from "./RemovePatientProfileModal.tsx";
import useUploadNewPatientProfile from "../hooks/useUploadNewPatientProfile.tsx";

export default function UniquePatientImageForm({ patient, loader, onSubmit, onRefresh, isLoading }: {
  patient: Patient
  loader: boolean
  onRefresh: () => void
  isLoading: boolean
  onSubmit: (data: FormData) => Promise<any>
}) {
  
  const maxNumber: number = 1
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState<PatientImage>(initPatientImageState())
  
  const { profil } = patient
  
  useSetPatientImageData(patient, setState)
  useUploadNewPatientProfile(state, setState, onRefresh)
  
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
                      src={(profil ? APP_ENTRYPOINT+profil.contentUrl : avatar) as string}
                      alt=''
                    />
                    
                    <div className='mt-3 text-center'>
                      <Button
                        disabled={loader}
                        type='button'
                        variant='outline-white'
                        className='me-1'
                        onClick={onImageUpload}
                      ><i className='bi bi-upload'/> Téléverser</Button>
                      
                      <Button
                        disabled={loader}
                        type='button'
                        variant='outline-white'
                        onClick={(): void | {} => profil ? handleShow(setShow) : { }}
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
                        onClick={async (): Promise<void> => {
                          onImageUpdate(index)
                          onUpdatePatientProfileSubmit(
                            state,
                            setState,
                            onSubmit,
                            onRefresh
                          )
                        }}
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
      
      <RemovePatientProfileModal
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
