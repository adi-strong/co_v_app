import type {MediaObjectInt} from "../../../../interfaces/MediaObjectInt.ts";
import type {ImageListType} from "react-images-uploading";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import {setInfosGen} from "./infosGen.slice.ts";

// INTERFACES OR TYPES
export interface InfosGen {
  '@id'?: string
  id: number
  nom: string
  slogan?: string
  logo?: MediaObjectInt
  about?: string
  address?: string
  tel: string
  email?: string
  tel2?: string
  email2?: string
  selected: boolean
}

export interface SaveInfosGen {
  id: number
  nom: string
  slogan: string
  file: ImageListType
  about: string
  address: string
  tel: string
  email: string
  tel2: string
  email2: string
  infosId: number
}

export interface InfosGenError {
  nom: string | null
  slogan: string | null
  logo: string | null
  about: string | null
  address: string | null
  tel: string | null
  email: string | null
  tel2: string | null
  email2: string | null
}

export interface InfosGenResponse extends JsonLdApiResponseInt<InfosGen>{}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initInfosGenState = (): SaveInfosGen => ({
  about: '',
  address: '',
  email: '',
  email2: '',
  file: [],
  nom: '',
  id: 0,
  tel2: '',
  slogan: '',
  tel: '',
  infosId: 0,
})

export const initInfosGenErrorState = (): InfosGenError => ({
  nom:  null,
  slogan:  null,
  logo:  null,
  about:  null,
  address:  null,
  tel:  null,
  email:  null,
  tel2:  null,
  email2:  null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getInfosGenFakeData = (): InfosGen[] => [
  {
    id: 1,
    tel2: '+243 904 651 464',
    about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n' +
      'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n' +
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
      'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n' +
      'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n' +
      'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    address: '24 Bis Bobozo \nQ/ Industriel \nC/ LIMETE \nKinshasa — RD Congo',
    email2: 'adi.life91@gmail.com',
    email: 'backoffice.pro@gmail.com',
    nom: 'BOP',
    tel: '+243 891 759 667',
    slogan: 'Boostez Votre Activité',
    '@id': '/api/infos_gens/1',
    selected: false,
  },
]

const postInfosGenDataForSubmitting = (state: SaveInfosGen): FormData => {
  const formData = new FormData()
  
  const {
    tel,
    nom,
    slogan,
    tel2,
    file,
    email2,
    address,
    about,
    email,
    infosId,
  } = state
  
  if (tel) formData.append('tel', tel)
  if (nom) formData.append('nom', nom)
  if (slogan) formData.append('slogan', slogan)
  if (tel2) formData.append('tel2', tel2)
  if (email2) formData.append('email2', email2)
  if (address) formData.append('address', address)
  if (about) formData.append('about', about)
  if (email) formData.append('email', email)
  if (infosId) formData.append('infosId', infosId.toString())
  if (file && file.length > 0 && file[0]?.file instanceof File) formData.append('file', file[0].file)
  
  return formData
}

export async function onInfosGenSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveInfosGen,
  setErrors: Dispatch<SetStateAction<InfosGenError>>,
  onSubmit: (data: FormData) => Promise<any>,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initInfosGenErrorState())
  
  const { id } = state
  const submitData: FormData = postInfosGenDataForSubmitting(state)
  try {
    const { data, error }: InfosGenResponse = await onSubmit(submitData)
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations && violations.length > 0) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(id > 0 ? 'Mise à jour bien effectuée.' : 'Enregistrement bien effectué.')
      
      if (onRefresh) onRefresh()
    }
  } catch (e) { toast.error('Problème réseau.') }

}

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param onRefresh
 */
export async function onPatchInfosGenSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveInfosGen,
  setErrors: Dispatch<SetStateAction<InfosGenError>>,
  onSubmit: (data: SaveInfosGen) => Promise<any>,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initInfosGenErrorState())
  
  try {
    const { data, error }: InfosGenResponse = await onSubmit(state)
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations && violations.length > 0) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Infos générales mises à jour.')
      if (onRefresh) onRefresh()
    }
  } catch (e) { toast.error('Problème réseau.') }

}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
