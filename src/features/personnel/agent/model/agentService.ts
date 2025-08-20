import type {Departement} from "../../departement/model/departementService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {MediaObjectInt} from "../../../../interfaces/MediaObjectInt.ts";
import type {Service} from "../../service/model/serviceService.ts";
import type {Fonction} from "../../fonction/model/fonctionService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {ImageListType} from "react-images-uploading";
import {getServiceFakeData} from "../../service/model/serviceService.ts";
import {getFonctionFakeData} from "../../fonction/model/fonctionService.ts";
import {getDepartementFakeData} from "../../departement/model/departementService.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
  
// INTERFACES OR TYPES
export interface Agent {
  '@id'?: string
  id: number
  nom: string
  postNom?: string
  prenom?: string
  sexe: string
  tel: string
  email?: string
  fkDepartement?: Departement
  fkService?: Service
  fkFonction?: Fonction
  fkUser?: User
  profil?: MediaObjectInt
  fullName?: string
  slug?: string
  createdAt?: string
  updatedAt?: string
}

export interface SaveAgent {
  id: number
  nom: string
  postNom: string
  prenom: string
  sexe: string
  tel: string
  email: string
  fkDepartement: SingleValue<SelectOptionType> | null
  fkService: SingleValue<SelectOptionType> | null
  fkFonction: SingleValue<SelectOptionType> | null
  file: ImageListType
}

export interface AgentError {
  nom: string | null
  postNom: string | null
  prenom: string | null
  sexe: string | null
  tel: string | null
  emai: string | null
  fkDepartement: string | null
  fkService: string | null
  fkFonction: string | null
  file: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initAgentState = (): SaveAgent => ({
  id: 0,
  email: '',
  file: [],
  nom: '',
  fkDepartement: null,
  tel: '',
  fkFonction: null,
  fkService: null,
  postNom: '',
  prenom: '',
  sexe: 'NONE',
})

export const initAgentErrorState = (): AgentError => ({
  nom: null,
  postNom: null,
  prenom: null,
  sexe: null,
  tel: null,
  emai: null,
  fkDepartement: null,
  fkService: null,
  fkFonction: null,
  file: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getAgentFakeData = (): Agent[] => [
  {
    id: 1,
    nom: 'LIFWA',
    email: 'adi.life91@gmail.com',
    postNom: 'Wan\'etumba',
    fullName: 'Adivin LIFWA WAN\'ETUMBA',
    fkService: getServiceFakeData()[0],
    tel: '+243 04 651 464',
    slug: 'adivin-lifwa-wanetumba',
    sexe: 'H',
    prenom: 'Adivin',
    fkFonction: getFonctionFakeData()[0],
    createdAt: new Date().toISOString(),
    fkDepartement: getDepartementFakeData()[0],
  },
  {
    id: 2,
    nom: 'LIFWA',
    email: 'adi.life91@gmail.com',
    postNom: 'Wan\'etumba',
    fullName: 'Adivin LIFWA WAN\'ETUMBA',
    fkService: getServiceFakeData()[0],
    tel: '+243 04 651 464',
    slug: 'adivin-lifwa-wanetumba',
    sexe: 'H',
    prenom: 'Adivin',
    fkFonction: getFonctionFakeData()[0],
    createdAt: new Date().toISOString(),
    fkDepartement: getDepartementFakeData()[0],
  },
]

const castAgentFormData = (state: SaveAgent): FormData => {
  const formData = new FormData()
  
  const {
    tel,
    nom,
    sexe,
    prenom,
    postNom,
    fkService,
    fkFonction,
    fkDepartement,
    email,
    file,
  } = state
  
  if (tel) formData.append('tel', tel)
  if (nom) formData.append('nom', nom)
  if (sexe) formData.append('sexe', sexe)
  if (prenom) formData.append('prenom', prenom)
  if (postNom) formData.append('postNom', postNom)
  if (fkService && fkService?.data) formData.append('fkService', fkService.data)
  if (fkFonction && fkFonction?.data) formData.append('fkFonction', fkFonction.data)
  if (fkDepartement && fkDepartement?.data) formData.append('fkDepartement', fkDepartement.data)
  if (fkDepartement && fkDepartement?.data) formData.append('fkDepartement', fkDepartement.data)
  if (file && file[0]?.file) formData.append('file', file[0].file)
  
  return formData
}

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param navigate
 * @param onRefresh
 */
export async function onPostAgentSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveAgent,
  setErrors: Dispatch<SetStateAction<AgentError>>,
  onSubmit: (data: FormData) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initAgentErrorState())
  const submitData: FormData = castAgentFormData(state)
  
  try {
    const { data, error }: JsonLdApiResponseInt<Agent> = await onSubmit(submitData)
    if (data) {
      toast.success('Enregistrement bien effectué.')
      if (onRefresh) onRefresh()
      navigate('/app/agents')
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param navigate
 * @param onRefresh
 */
export async function onPatchAgentSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveAgent,
  setErrors: Dispatch<SetStateAction<AgentError>>,
  onSubmit: (data: SaveAgent) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initAgentErrorState())
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<Agent> = await onSubmit(state)
    if (data) {
      toast.success('Modification bien effectuée.')
      if (onRefresh) onRefresh()
      navigate(`/app/agents/${id}/${data?.slug}`)
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteAgent(
  state: Agent,
  onSubmit: (data: Agent) => Promise<void>,
  onRefresh: () => void,
  navigate?: NavigateFunction
): Promise<void> {

  try {
    const { error }: JsonLdApiResponseInt<Agent> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/agents')
    }
  } catch (e) { toast.error('Problème réseau.') }

}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
