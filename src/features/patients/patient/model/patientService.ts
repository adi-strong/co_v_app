import type {User} from "../../../user/model/userService.ts";
import type {MediaObjectInt} from "../../../../interfaces/MediaObjectInt.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {ImageListType} from "react-images-uploading";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {Structure} from "../../structure/model/structureService.ts";

// INTERFACES OR TYPES
export interface Patient {
  '@id'?: string
  id: number
  nom: string
  postNom?: string
  prenom?: string
  fullName: string
  tel: string
  email?: string
  sexe?: string
  lieuDeNaissance?: string
  dateDeNaissance?: string
  etatCivil: string
  adresse?: string
  nationalite?: string
  pere?: string
  mere?: string
  fkStructure?: Structure
  fkUser?: User
  profil?: MediaObjectInt
  estCeConventionne: boolean
  slug?: string
  createdAt?: string
  updatedAt?: string
}

export interface SavePatient {
  id: number
  nom: string
  postNom: string
  prenom: string
  sexe: string
  lieuDeNaissance: string
  dateDeNaissance: string
  etatCivil: string
  adresse: string
  nationalite: string
  pere: string
  mere: string
  fkStructure: SingleValue<SelectOptionType> | null
  file: ImageListType
  estCeConventionne: boolean
  tel: string
  email: string
}

export interface PatientError {
  nom: string | null
  postNom: string | null
  prenom: string | null
  sexe: string | null
  lieuDeNaissance: string | null
  dateDeNaissance: string | null
  etatCivil: string | null
  adresse: string | null
  nationalite: string | null
  pere: string | null
  mere: string | null
  fkStructure: string | null
  file: string | null
  estCeConventionne: string | null
  tel: string | null
  email: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initPatientState = (): SavePatient => ({
  id: 0,
  nom: '',
  postNom: '',
  prenom: '',
  sexe: '',
  lieuDeNaissance: '',
  dateDeNaissance: '',
  etatCivil: '',
  adresse: '',
  nationalite: '',
  pere: '',
  mere: '',
  fkStructure: null,
  file: [],
  estCeConventionne: false,
  tel: '',
  email: '',
})

export const initPatientErrorState = (): PatientError => ({
  nom: null,
  postNom: null,
  prenom: null,
  sexe: null,
  lieuDeNaissance: null,
  dateDeNaissance: null,
  etatCivil: null,
  adresse: null,
  nationalite: null,
  pere: null,
  mere: null,
  fkStructure: null,
  file: null,
  estCeConventionne: null,
  tel: null,
  email: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getPatientFakeData = (): Patient[] => [
  {
    id: 1,
    nom: 'AKONDJAKA',
    adresse: 'Lorem',
    postNom: 'NDJOKU',
    fkStructure: {},
    prenom: 'Romeo',
    estCeConventionne: false,
    sexe: 'H',
    createdAt: new Date().toISOString(),
    etatCivil: 'CELIBATAIRE',
    dateDeNaissance: new Date().toISOString(),
    fullName: 'akondjaka ndjoku roméo',
    nationalite: 'Congolaise',
    tel: '0904651464',
    email: 'romeoakondjaka@gmail.com',
  },
]

const castPatientFormData = (state: SavePatient): FormData => {
  const formData = new FormData()
  
  const {
    nom,
    postNom,
    adresse,
    estCeConventionne,
    mere,
    prenom,
    sexe,
    pere,
    fkStructure,
    nationalite,
    etatCivil,
    dateDeNaissance,
    file,
    lieuDeNaissance,
    tel,
    email,
  } = state
  
  if (tel) formData.append('tel', tel)
  if (nom) formData.append('nom', nom)
  if (sexe) formData.append('sexe', sexe)
  if (prenom) formData.append('prenom', prenom)
  if (postNom) formData.append('postNom', postNom)
  if (adresse) formData.append('adresse', adresse)
  if (estCeConventionne) formData.append('estCeConv', 'true')
  if (pere) formData.append('pere', pere)
  if (mere) formData.append('mere', mere)
  if (nationalite) formData.append('nationalite', nationalite)
  if (etatCivil) formData.append('etatCivil', etatCivil)
  if (dateDeNaissance) formData.append('dateDeNaissance', dateDeNaissance)
  if (lieuDeNaissance) formData.append('lieuDeNaissance', lieuDeNaissance)
  if (email) formData.append('email', email)
  if (fkStructure && fkStructure?.data) formData.append('fkStructure', fkStructure.data)
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
export async function onPostPatientSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SavePatient,
  setErrors: Dispatch<SetStateAction<PatientError>>,
  onSubmit: (data: FormData) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initPatientErrorState())
  const submitData: FormData = castPatientFormData(state)
  
  try {
    const { data, error }: JsonLdApiResponseInt<Patient> = await onSubmit(submitData)
    if (data) {
      toast.success('Enregistrement bien effectué.')
      if (onRefresh) onRefresh()
      navigate('/app/patients')
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
export async function onPatchPatientSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SavePatient,
  setErrors: Dispatch<SetStateAction<PatientError>>,
  onSubmit: (data: SavePatient) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initPatientErrorState())
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<Patient> = await onSubmit(state)
    if (data) {
      toast.success('Modification bien effectuée.')
      if (onRefresh) onRefresh()
      navigate(`/app/patients/${id}/${data?.slug}`)
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeletePatient(
  state: Patient,
  onSubmit: (data: Patient) => Promise<void>,
  onRefresh: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  try {
    const { error }: JsonLdApiResponseInt<Patient> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/patients')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
